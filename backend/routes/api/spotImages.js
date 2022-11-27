const express = require('express');
const {requireAuth} = require('../../utils/auth');
const {SpotImage} = require('../../db/models')
const router = express.Router();


router.delete('/:spotImageId', requireAuth, async(req, res)=>{
  
    const spotImage = await SpotImage.findByPk(req.params.spotImageId);
    if(!spotImage){
        throw new Error('CREATE ERROR HANDLERS')
    }else{
        await spotImage.destroy()
        res.json({"message": "Successfully deleted",
        "statusCode": 200})
    }

})




module.exports = router
