const express = require('express');
const {requireAuth} = require('../../utils/auth');
const {ReviewImage} = require('../../db/models')
const router = express.Router();


router.delete('/:reviewImageId', requireAuth, async(req, res, next)=>{

    const reviewImage = await ReviewImage.findByPk(req.params.reviewImageId);
    if(!reviewImage){
        const err = new Error();
        err.errors = "Review image does not exist"
        err.status = 404;
        err.title = 'No Review images Found';
        err.message = "Review images couldn't be found";

        return next(err)
    }else{
        await reviewImage.destroy()
        res.json({"message": "Successfully deleted",
        "statusCode": 200})
    }

})




module.exports = router
