const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth.js')
const { ReviewImage, Review } = require('../../db/models')


// get all reviews that the logged in user has made
router.get('/current', requireAuth, async (req, res) => {
    const currUserReviews = await Review.findAll({
        where: {

            userId: req.user.id
        }
    })
    return res.json(currUserReviews);
})

//create a reviewImage on a review based on the reviewId
router.post('/:reviewId/images', requireAuth, async (req, res) => {

    const thisReview = await Review.findByPk(req.params.reviewId);
    if (!thisReview || !req.body.url) {
        throw new Error('CREATE ERROR HANDLERS')
    } else {
        const { url } = req.body
        const reviewId = req.params.reviewId
        console.log(reviewId)
        const newReviewImg = await ReviewImage.create({
            url, reviewId
        })
        return res.json(newReviewImg)
    }

})

// edit a review based on reviewId
router.put('/:reviewId', requireAuth, async (req, res) => {
    const thisReview = await Review.findByPk(req.params.reviewId);
    if (!thisReview) {
        throw new Error('CREATE ERROR HANDLERS')
    } else {

        const { review, stars } = req.body
        const args = []
        if (review) {
            args.push(review + ',')
        }
        if (stars) {
            args.push(stars + ',')
        }
        await thisReview.update({
            ...args
        })
        return res.json(thisReview)
    }
})

//delete reviews

router.delete('/:reviewId', requireAuth, async(req, res)=>{

    const deleteReview = await Review.findByPk(req.params.reviewId);
    if(!deleteReview){
        throw new Error('CREATE ERROR HANDLERS')
    }else{
        await deleteReview.destroy()
        res.json({"message": "Successfully deleted",
        "statusCode": 200})
    }

})



module.exports = router
