const express = require('express');
const {requireAuth} = require('../../utils/auth');
const {ReviewImage} = require('../../db/models')
const router = express.Router();


router.delete('/:reviewImageId', requireAuth, async(req, res)=>{

    const reviewImage = await ReviewImage.findByPk(req.params.reviewImageId);
    if(!reviewImage){
        throw new Error('CREATE ERROR HANDLERS')
    }else{
        await reviewImage.destroy()
        res.json({"message": "Successfully deleted",
        "statusCode": 200})
    }

})




module.exports = router
