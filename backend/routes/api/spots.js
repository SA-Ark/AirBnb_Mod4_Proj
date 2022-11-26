const express = require('express');

const {Spot, SpotImage, Review} = require('../../db/models');

const {requireAuth} = require ('../../utils/auth.js')

const router = express.Router();

// get a spot
router.get('/', async (req,res)=> {
    const allSpots = await Spot.findAll();
    return res.json(allSpots)
})


router.get('/current', requireAuth, async (req, res) => {
    const spotsOfCurrUser = await Spot.findAll({where:
        {
            ownerId: req.user.id
        }
    })

    return res.json(spotsOfCurrUser)
})

router.get('/:spotId', async (req,res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if(spot){

        return res.json(spot)
    }else{
        res.status(404)
        throw new Error('CREATE ERROR HANDLER')
    }
})




router.post('/', requireAuth, async(req,res)=>{

    const { address, city, state, country, lat, lng, name, description, price} = req.body
    const randomSpot = await Spot.findOne()

    const keys = Object.keys(randomSpot.dataValues)
    const newKeys= keys.filter(key => key !== 'id' && key !== 'createdAt' || key !== 'updatedAt');
    const args = ['ownerId,']

    for( let key of newKeys){
        if(!req.body[key]){
            throw new Error('CREATE ERROR HANDLER')
        }
    }
    const ownerId = req.user.id

    console.log({...args})
    const newSpot = await Spot.create({
        address, city, state, country, lat, lng, name, description, price, ownerId
})


    return res.status(201).json(newSpot);
})

router.post('/:spotId/images', requireAuth, async (req, res)=> {


    const spotId = req.params.spotId;
    console.log(spotId)
    const {url, preview} = req.body;
    const spotImage = await SpotImage.create({
        spotId, url, preview
    })
 return res.json(spotImage)
})

router.post('/:spotId/reviews', requireAuth, async (req, res)=>{
    const userId = req.user.id
    const {review, stars} = req.body
    const {spotId} = req.params;
    const spot = await Spot.findByPk(spotId)
    const prevReview = await Review.findOne( { where:
        {
            spotId: req.params.spotId
        }
            });
    if(prevReview){
        throw new Error('CREATE ERROR HANDLERS')
    }
    else if(!spot){
        throw new Error('CREATE ERROR HANDLERS')
    }else if(!review || !stars){
        throw new Error('CREATE ERROR HANDLERS')
    }
    else{

        const reviewObj = await Review.create({
            review, stars, spotId, userId
        });
        return res.json(reviewObj)
    }

})

router.put('/:spotId', requireAuth, async (req, res)=>{
    const {address, city, state, country, lat, lng, name, description, price} = req.body
    const keys = [];
    for (let key of Object.keys(req.body)){
        if (req.body[key]){

            keys.push(key + ",")
        }
    }
    console.log(...keys)
    console.log(address, city, state, country, lat, lng, name, description, price)
    // console.log(keys)
    const origSpot = await Spot.findByPk(req.params.spotId);
    if(!origSpot){
        throw new Error('CREATE ERROR HANDLER')
    }else{

        const updatedSpot = await origSpot.update({
            // address, city, state, country, lat, lng, name, description, price
            ...keys
        })
        return res.json(updatedSpot)
    }
})

module.exports = router;
