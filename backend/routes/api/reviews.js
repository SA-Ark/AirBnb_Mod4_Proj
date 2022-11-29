const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth.js')
const { ReviewImage, Review, Spot, User } = require('../../db/models')


// get all reviews that the logged in user has made
router.get('/current', requireAuth, async (req, res) => {
    const ReviewsArr = await Review.findAll({
        where: {

            userId: req.user.id
        },
        include: [User, Spot, ReviewImage]
    })
    const Reviews = [];
    for(let review of ReviewsArr){
        reviewPOJO = review.toJSON();
        delete reviewPOJO.User.username;
        delete reviewPOJO.Spot.createdAt;
        delete reviewPOJO.Spot.updatedAt;

        for (let i = 0; i < reviewPOJO.ReviewImages.length; i++){
            delete reviewPOJO.ReviewImages[i].reviewId
            delete reviewPOJO.ReviewImages[i].createdAt
            delete reviewPOJO.ReviewImages[i].updatedAt
         }
    Reviews.push(reviewPOJO)

    }
    return res.json({Reviews});
})

//create a reviewImage on a review based on the reviewId
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {

    const thisReview = await Review.findByPk(req.params.reviewId, {
        include: [ReviewImage]
    });
    if (!thisReview || !req.body.url) {
        const err = new Error();
        err.errors = "This review does not exist so you cannot create an image for it."
        err.status = 404;
        err.title = 'Review Not Found';
        err.message = "Review couldn't be found";

        return next(err)
    } else if (thisReview.toJSON().ReviewImages.length > 9){

        const err = new Error();
        err.errors = "Cannot post more than 10 pictures for a spot."
        err.status = 403;
        err.title = 'Max Number of Images reached';
        err.message = "Maximum number of images for this resource was reached";

        return next(err)
    }
    else {
        const { url } = req.body
        const reviewId = req.params.reviewId
        console.log(reviewId)
        const newReviewImg = await ReviewImage.create({
            url, reviewId
        })
        const POJO = newReviewImg.toJSON();
        delete POJO.reviewId;
        delete POJO.updatedAt;
        delete POJO.createdAt;

        return res.json(POJO);
    }

})

// edit a review based on reviewId
router.put('/:reviewId', requireAuth, async (req, res, next) => {
    const thisReview = await Review.findByPk(req.params.reviewId);
    if (!thisReview) {
        const err = new Error();
        err.errors = "Review does not exist."
        err.status = 404;
        err.title = 'No Review Found';
        err.message = "Review couldn't be found"

        return next(err)
    } else {

        const { review, stars } = req.body

        if(!review || !stars){
        const err = new Error();
        err.errors = "Validation error."
        err.status = 400;
        err.title = 'Improper Inputs';
        if(!review && !stars){
            err.message = {
                "review": "Review text is required",
                "stars": "Stars must be an integer from 1 to 5"
        }}else{

            if(!review){
                err.message = {
                    "review": "Review text is required"}
            }if(!stars) {
                err.message = {
                    "stars": "Stars must be an integer from 1 to 5"}
            }
        }
        return next(err)
        }

        await thisReview.update({
           review, stars
        })
        return res.json(thisReview)
        }

    }
)

//delete reviews

router.delete('/:reviewId', requireAuth, async(req, res, next)=>{

    const deleteReview = await Review.findByPk(req.params.reviewId);
    if(!deleteReview){
        const err = new Error();
        err.errors = "Review does not exist"
        err.status = 404;
        err.title = 'No Review Found';
        err.message = "Review couldn't be found";

        return next(err)
    }else{
        await deleteReview.destroy()
        res.json({"message": "Successfully deleted",
        "statusCode": 200})
    }

})



module.exports = router
