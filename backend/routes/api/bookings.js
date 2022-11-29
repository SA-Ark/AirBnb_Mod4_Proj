const express = require('express');
const {requireAuth} = require('../../utils/auth');
const {User, Booking, Spot} = require('../../db/models')
const router = express.Router();

//get all bookings of current user
router.get('/current', requireAuth, async(req,res)=>{
    const allBookings = await Booking.findAll({where: {
        userId: req.user.id
    },
});
const Bookings = [];
for (let booking of allBookings){

    const spot = await Spot.findByPk(booking.spotId)
    let bookingPOJO = booking.toJSON();
    console.log(bookingPOJO)
    bookingPOJO.Spot = spot;
    Bookings.push(bookingPOJO)
}

   return res.json({Bookings})
})

//edit a booking

router.put('/:bookingId', requireAuth, async (req,res, next)=>{

    const bookingToEdit = await Booking.findByPk(req.params.bookingId);
    const {startDate, endDate} = req.body;

    const startDateDate = new Date(startDate)
     const endDateDate = new Date(endDate)
    if(startDateDate.getTime()>endDateDate.getTime()){
        const err = new Error();
        err.errors =  {
            "endDate": "endDate cannot come before startDate"}
        err.status = 400;
        err.title = "Dates Don't Make Sense";
        err.message = "Validation error";

        return next(err)
    }

    if(!bookingToEdit){
        const err = new Error();
            err.errors = "Booking does not exist"
            err.status = 404;
            err.title = 'No Booking Found';
            err.message = "Booking couldn't be found";

            return next(err)
    }
        const bookingEndDate = new Date(bookingToEdit.endDate)

    if(bookingEndDate.getTime()< startDateDate.getTime()){
        const err = new Error();
        err.errors =  "Cannot edit past bookings"
        err.status = 403;
        err.title = "Booking has expired";
        err.message = "Past bookings can't be modified";

    }


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
                if(newStartDate.getTime() >= booking.startDate.getTime() || newEndDate.getTime() >= booking.startDate.getTime()){
                const err = new Error();
                err.errors =  {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with an existing booking"
                  }
                err.status = 403;
                err.title = 'Spot is already booked for these dates';
                err.message = "Sorry, this spot is already booked for the specified dates";

                return next(err)
            }

            }
        }
        await bookingToEdit.update({
            startDate, endDate,
            })
        return res.json(bookingToEdit)
    }

})


//delete a booking

router.delete('/:bookingId', requireAuth, async(req, res, next)=>{

    const deleteBooking = await Booking.findByPk(req.params.bookingId);
    if(!deleteBooking){
        const err = new Error();
        err.errors = "Booking does not exist"
        err.status = 404;
        err.title = 'No Booking Found';
        err.message = "Booking couldn't be found";

        return next(err)
    }else{
        if(deleteBooking.startDate.getTime()< Date.now()){
            const err = new Error();
            err.errors = "Cannot edit a booking that has started"
            err.status = 403;
            err.title = 'Booking has already started';
            err.message = "Bookings that have been started can't be deleted";

            return next(err)
        }
        await deleteBooking.destroy()
        res.json({"message": "Successfully deleted",
        "statusCode": 200})
    }

})










module.exports = router
