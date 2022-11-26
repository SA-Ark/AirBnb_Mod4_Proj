const express = require('express');
const router = express.Router();
const {requireAuth} = require('../../utils/auth.js')
const {ReviewImage, Review} = require('../../db/models')


router.post('/:reviewId/images', requireAuth, async(req,res)=>{

    const thisReview = await Review.findByPk(req.params.reviewId);
    if(!thisReview || !req.body.url){
        throw new Error('CREATE ERROR HANDLERS')
    }else {
        const {url} = req.body
        const reviewId = req.params.reviewId
        console.log(reviewId)
    const newReviewImg = await ReviewImage.create({
            url, reviewId
        })
        return res.json(newReviewImg)
    }

})

router.get('/current', requireAuth, async (req, res)=>{
    const currUserReviews = await Review.findAll({
        where:{

            userId: req.user.id
        }
        })
        return res.json(currUserReviews);
})

router.put('/:reviewId', requireAuth, async(req,res)=>{
    const thisReview = await Review.findByPk(req.params.reviewId);
    if(!thisReview){
        throw new Error('CREATE ERROR HANDLERS')
    }else{

        const {review, stars} = req.body
        const args = []
        if(review){
            args.push(review + ',')
        }
        if(stars){
            args.push(stars + ',')
        }
        await thisReview.update({
            ...args
        })
        return res.json(thisReview)
    }
})



module.exports = router
