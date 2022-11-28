'use strict';

const { User, Spot, Review } = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Bookings';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    console.log('hi')

    const allBookings = [];


    const allUsers = await User.findAll({
      include: {
        model: Spot
      }    });
   
    for (let user of allUsers) {
      let userSpotId = user.dataValues.Spots[0].dataValues.id
      let bookingObj = {
        startDate: new Date('August 19, 2023 23:15:30'),
        endDate: new Date('August 21, 2023 23:15:30'),
        userId: user.id,
        spotId: userSpotId
      };
      allBookings.push(bookingObj)
    }



    await queryInterface.bulkInsert(options, allBookings, {});
  },

  async down(queryInterface, Sequelize) {

    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
