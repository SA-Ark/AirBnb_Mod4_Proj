const express = require('express');

const { Spot, SpotImage, Review, Booking, User } = require('../../db/models');

const { requireAuth } = require('../../utils/auth.js')
// const {handleValidationErrors} = require('../../utils/validation')

const router = express.Router();
const Sequelize = require('sequelize')
const Op = Sequelize.Op


// get all spots
router.get('/', async (req, res, next) => {
    let { page, size } = req.query;
    console.log(typeof page, typeof size)
    page = parseInt(page);
    size = parseInt(size);
    if (Number.isNaN(page)) {
        page = 1
    }
    if (Number.isNaN(size)) {
        size = 1
    }

    const Spots = await Spot.findAll({
        limit: size,
        offset: size * (page - 1)
    });


    const allSpotsPOJO = { Spots }
    allSpotsPOJO.page = page;
    allSpotsPOJO.size = size
    return res.json(allSpotsPOJO)
})

//get all spots of curr user
router.get('/current', requireAuth, async (req, res, next) => {
    const allSpots = await Spot.findAll({
        where:
        {
            ownerId: req.user.id
        },
    })

    const Spots = [];


    for(let spot of allSpots){
        let spotEdited = spot.toJSON();
        let starSum = 0;

        let reviews = await Review.findAll({where:{
            spotId: spot.id
        }})
        let spotImage = await SpotImage.findOne({where:{
            spotId: spot.id,
            preview: true
        }})


        if(!reviews.length){
            spotEdited.avgRating= 'No ratings on this spot yet';

        }else{
            for (let review of reviews){
                starSum += review.stars
                }
                spotEdited.avgRating = starSum/reviews.length;
            }
        if(!spotImage){
            spotEdited.previewImage= 'No preview images for this spot yet';
        }else{

                spotEdited.previewImage = spotImage.url;
            }

            Spots.push(spotEdited)
            }
            return res.json({Spots})
}
)

//get all bookings for a spot by spotId
router.get('/:spotId/bookings', async (req, res, next) => {
    const thisSpot = await Spot.findByPk(req.params.spotId);

    if (!thisSpot) {
        throw new Error('CREATE ERROR HANDLERS')
    } else {

        const spotBookings = await Booking.findAll({
            where: {
                spotId: req.params.spotId
            }
        })
        return res.json(spotBookings)
    }
})


//get all reviews of spot by spotId
router.get('/:spotId/reviews', async (req, res, next) => {
    const spotReviews = await Spot.findByPk(req.params.spotId, {
        include:
            [Review]
    })
    if (!spotReviews) {
        throw new Error('CREATE ERROR HANDLERS')
    } else {

        return res.json(spotReviews.dataValues.Reviews)
    }
})

//get the spot by spotId
router.get('/:spotId', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId, {include: {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
    }});
    if (spot) {

        let spotEdited = spot.toJSON();
        let starSum = 0;
        const previewImages = []
        const reviews = await Review.findAll({where:{
            spotId: spot.id
        }})
        const spotImages = await SpotImage.findAll({where:{
            spotId: spot.id
        },
        attributes: ['id', 'url', 'preview']
    })

        if(!reviews.length){
            spotEdited.avgRating= 'No ratings on this spot yet';
        }else{
            for (let review of reviews){
                starSum += review.stars
            }
        }
        if(!spotImages.length){
            spotEdited.previewImage= 'No images for this spot yet';
        }else{
            for(let spotImage of spotImages){
                    previewImages.push(spotImage)
                }
            }

            spotEdited.avgRating = starSum/reviews.length;
            spotEdited.numReviews = reviews.length
            spotEdited.SpotImages = previewImages;
            spotEdited.Owner = spotEdited.User;
            delete spotEdited.User;
            return res.json(spotEdited)
        }else {
            const err = new Error();
            err.errors = "Spot couldn't be found"
            err.status = 404;
            err.title = 'No Spot Found';
            err.message = "Spot couldn't be found";

            return next(err)

    }
})



//create a spot
router.post('/', requireAuth,  async (req, res, next) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body
    // const randomSpot = await Spot.findOne()

    // const keys = Object.keys(randomSpot.dataValues)

    // const newKeys = keys.filter(key => key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'ownerId');


    // const err = new Error();
    // for (let key of newKeys) {

    //     if (!req.body[key]) {
    //         err.errors[key] = `${key} is required`
    //         err.status = 400;
    //         err.title = 'Spot Was Not Created';
    //         err.message = "Validation Error";
    //     }
    // }
    // if(err.errors){
    //     return next(err);
    // }
    const sameAddress = await Spot.findOne({where: {
        address: address
    }})
    if(sameAddress){
        const err = new Error();
        err.message = "Validation Error";
        err.status = 400;
        err.errors = {
            "address": "Street address is required",
            "city": "City is required",
            "state": "State is required",
            "country": "Country is required",
            "lat": "Latitude is not valid",
            "lng": "Longitude is not valid",
            "name": "Name must be less than 50 characters",
            "description": "Description is required",
            "price": "Price per day is required"
          }
        return next(err)
    }
    const ownerId = req.user.id

    const newSpot = await Spot.create({
        address, city, state, country, lat, lng, name, description, price, ownerId
    })


    return res.status(201).json(newSpot);
})

//create a booking based on spotId

router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    const spotBooked = await Spot.findByPk(spotId)
    const userId = req.user.id;
    const { startDate, endDate } = req.body

    if (!spotBooked || !startDate || !endDate) {
        throw new Error('CREATE ERROR HANDLERS')
    } else {
        const possibleDupeBookings = await Booking.findAll({
            where: {
                spotId: { [Op.eq]: spotId },
            }
        })


        const newEndDate = new Date(endDate)
        const newStartDate = new Date(startDate)
        if (possibleDupeBookings) {

            for (let booking of possibleDupeBookings) {

                if (newStartDate.getTime() <= booking.endDate.getTime()) {
                    if (newStartDate.getTime() >= booking.startDate.getTime() || newEndDate.getTime() >= booking.startDate.getTime())
                        throw new Error('CREATE ERROR HANDLERS 2');

                }
            }
        }

        const newBooking = await Booking.create({
            spotId, userId, startDate, endDate
        })
        return res.json(newBooking)
    }
})

//create an image on a spot based on spotId
router.post('/:spotId/images', requireAuth, async (req, res, next) => {


    const spotId = req.params.spotId;
    const thisSpot = await Spot.findByPk(spotId)
    if (!thisSpot) {
        const err = new Error();
        err.errors = "Spot does not exist"
        err.status = 404;
        err.title = 'No Spot';
        err.message = "Spot couldn't be found";

        return next(err)

    } else {

        const { url, preview } = req.body;
        const spotImage = await SpotImage.create({
            spotId, url, preview
        })
        const spotImagePOJO = spotImage.toJSON();
       delete spotImagePOJO.updatedAt;
       delete spotImagePOJO.createdAt;
        return res.json(spotImagePOJO)
    }

})


//create a review on a spot based on spotId
router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    const userId = req.user.id
    const { review, stars } = req.body
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId)
    const prevReview = await Review.findOne({
        where:
        {
            spotId: req.params.spotId
        }
    });
    if (prevReview) {
        throw new Error('CREATE ERROR HANDLERS')
    }
    else if (!spot) {
        throw new Error('CREATE ERROR HANDLERS')
    } else if (!review || !stars) {
        throw new Error('CREATE ERROR HANDLERS')
    }
    else {

        const reviewObj = await Review.create({
            review, stars, spotId, userId
        });
        const reviewPOJO = reviewObj.toJSON();
        delete reviewPOJO.spotId;
        delete reviewPOJO.userId;
        delete reviewPOJO.updatedAt;
        delete reviewPOJO.createdAt;
        delete reviewPOJO.id;
        return res.json(reviewPOJO);
    }

})

//edit a spot by selecting it with spotId
router.put('/:spotId', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const keys = [];
    for (let key of Object.keys(req.body)) {
        if (req.body[key]) {

            keys.push(key + ",")
        }
    }
    console.log(...keys)
    console.log(address, city, state, country, lat, lng, name, description, price)
    // console.log(keys)
    const origSpot = await Spot.findByPk(req.params.spotId);
    if (!origSpot) {
        const err = new Error();
        err.errors = {
            "address": "Street address is required",
            "city": "City is required",
            "state": "State is required",
            "country": "Country is required",
            "lat": "Latitude is not valid",
            "lng": "Longitude is not valid",
            "name": "Name must be less than 50 characters",
            "description": "Description is required",
            "price": "Price per day is required"
          }
        err.status = 400;
        err.title = 'Failed to Edit Spot';
        err.message = "Validation Error";

         return next(err)
    } else {

        const updatedSpot = await origSpot.update({
            address, city, state, country, lat, lng, name, description, price
        })
        return res.json(updatedSpot)
    }
})

//delete a spots

router.delete('/:spotId', requireAuth, async (req, res, next) => {

    const thisSpot = await Spot.findByPk(req.params.spotId);
    if (!thisSpot) {
        throw new Error('CREATE ERROR HANDLERS')
    } else {
        await thisSpot.destroy()
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }

})


module.exports = router;
