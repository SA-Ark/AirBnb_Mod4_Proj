'use strict';
const {User, Spot} = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Reviews';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    // const allReviews = [];

    // const allSpots = await Spot.findAll(
    //   {
    //     include: [User]
    //   })
    // for (let spot of allSpots){
    //   let reviewObj = {};

    //   const spotUserId = spot.dataValues.ownerId
    //   reviewObj.spotId = spot.id ;
    //   reviewObj.userId = spotUserId;
    //   reviewObj.review = `Great place to stay and chill #${spot.id}`;
    //   if(spot.id%5 === 0){
    //     reviewObj.stars = 5
    //   }else{
    //     reviewObj.stars = spot.id%5;
    //   }
    //   allReviews.push(reviewObj)
    // }
    const allReviewsNew = [{
      spotId : 1,
      userId : 1,
      review : 'Nice place',
      stars : 5
    }]

     await queryInterface.bulkInsert(options, allReviewsNew);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(options, {});
  }
};
