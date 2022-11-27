const express = require('express');

const { Spot, SpotImage, Review, Booking } = require('../../db/models');

const { requireAuth } = require('../../utils/auth.js')

const router = express.Router();
const Sequelize = require('sequelize')
const Op = Sequelize.Op


// get all spots
router.get('/', async (req, res) => {
    let {page, size} = req.query;
    console.log(typeof page, typeof size)
    page = parseInt(page);
    size= parseInt(size);
    if(Number.isNaN(page)){
        page = 1
    }
    if(Number.isNaN(size)){
        size = 1
    }

    const allSpots = await Spot.findAll({
        limit: size,
        offset : size* (page-1)
    });
    allSpots.page = page;
    allSpots.size = size
    return res.json(allSpots)
})

//get all spots of curr user
router.get('/current', requireAuth, async (req, res) => {
    const spotsOfCurrUser = await Spot.findAll({
        where:
        {
            ownerId: req.user.id
        }
    })

    return res.json(spotsOfCurrUser)
})

//get all bookings for a spot by spotId
router.get('/:spotId/bookings', async (req, res)=> {
    const thisSpot = await Spot.findByPk(req.params.spotId);

    if(!thisSpot){
        throw new Error('CREATE ERROR HANDLERS')
    }else{

        const spotBookings = await Booking.findAll({where: {
            spotId: req.params.spotId
        }})
        return res.json(spotBookings)
    }
})


//get all reviews of spot by spotId
router.get('/:spotId/reviews', async (req, res) => {
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
router.get('/:spotId', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (spot) {

        return res.json(spot)
    } else {
        res.status(404)
        throw new Error('CREATE ERROR HANDLER')
    }
})



//create a spot
router.post('/', requireAuth, async (req, res) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const randomSpot = await Spot.findOne()

    const keys = Object.keys(randomSpot.dataValues)

    const newKeys = keys.filter(key => key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'ownerId');


    for (let key of newKeys) {

        if (!req.body[key]) {
            throw new Error('CREATE ERROR HANDLER')
        }
    }
    const ownerId = req.user.id

    const newSpot = await Spot.create({
        address, city, state, country, lat, lng, name, description, price, ownerId
    })


    return res.status(201).json(newSpot);
})

//create a booking based on spotId

router.post('/:spotId/bookings', requireAuth, async (req, res) => {
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
                    if(newStartDate.getTime() >= booking.startDate.getTime() || newEndDate.getTime() >= booking.startDate.getTime())
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
router.post('/:spotId/images', requireAuth, async (req, res) => {


    const spotId = req.params.spotId;

    const { url, preview } = req.body;
    const spotImage = await SpotImage.create({
        spotId, url, preview
    })
    return res.json(spotImage)
})


//create a review on a spot based on spotId
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
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
        return res.json(reviewObj)
    }

})

//edit a spot by selecting it with spotId
router.put('/:spotId', requireAuth, async (req, res) => {
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
        throw new Error('CREATE ERROR HANDLER')
    } else {

        const updatedSpot = await origSpot.update({
            // address, city, state, country, lat, lng, name, description, price
            ...keys
        })
        return res.json(updatedSpot)
    }
})

//delete a spots

router.delete('/:spotId', requireAuth, async(req, res)=>{

    const thisSpot = await Spot.findByPk(req.params.spotId);
    if(!thisSpot){
        throw new Error('CREATE ERROR HANDLERS')
    }else{
        await thisSpot.destroy()
        res.json({"message": "Successfully deleted",
        "statusCode": 200})
    }

})


module.exports = router;
