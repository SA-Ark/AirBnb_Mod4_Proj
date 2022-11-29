const express = require('express');
const {requireAuth} = require('../../utils/auth');
const {SpotImage} = require('../../db/models')
const router = express.Router();


router.delete('/:spotImageId', requireAuth, async(req, res, next)=>{

    const spotImage = await SpotImage.findByPk(req.params.spotImageId);
    if(!spotImage){
        const err = new Error();
            err.errors = "Spot image does not exist"
            err.status = 404;
            err.title = 'No spot image Found';
            err.message = "Spot image couldn't be found";

            return next(err)
    }else{
        await spotImage.destroy()
        res.json({"message": "Successfully deleted",
        "statusCode": 200})
    }

})




module.exports = router
