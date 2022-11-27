const express = require('express');
const {requireAuth} = require('../../utils/auth');
const {User, Booking} = require('../../db/models')
const router = express.Router();

//get all bookings of current user
router.get('/current', requireAuth, async(req,res)=>{
    const bookingsOfUser = await Booking.findAll({where: {
        userId: req.user.id
    }})

   return res.json(bookingsOfUser)
})

//edit a booking

router.put('/:bookingId', requireAuth, async (req,res)=>{

    const bookingToEdit = await Booking.findByPk(req.params.bookingId);
    const {startDate, endDate} = req.body;

    if(!bookingToEdit){
        throw new Error('CREATE ERROR HANDLERS')
    }
    console.log(bookingToEdit.dataValues.id)


    const possibleDupeBookings = await Booking.findAll({
        where: {
            spotId: bookingToEdit.dataValues.spotId
        }
    })
    if (possibleDupeBookings) {
        const newStartDate = new Date(startDate)


        const newEndDate = new Date(endDate)


        for (let booking of possibleDupeBookings) {

            if (newStartDate.getTime() <= booking.endDate.getTime()) {
                if(newStartDate.getTime() >= booking.startDate.getTime() || newEndDate.getTime() >= booking.startDate.getTime())
                throw new Error('CREATE ERROR HANDLERS 2');

            }
        }
    }

    await bookingToEdit.update({
        startDate, endDate,
        })
    res.json(bookingToEdit)
})


//delete a booking

router.delete('/:bookingId', requireAuth, async(req, res)=>{

    const deleteBooking = await Booking.findByPk(req.params.bookingId);
    if(!deleteBooking){
        throw new Error('CREATE ERROR HANDLERS')
    }else{
        await deleteBooking.destroy()
        res.json({"message": "Successfully deleted",
        "statusCode": 200})
    }

})










module.exports = router
