'use strict';
const {User, Spot} = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const allReviews = [];

    const allSpots = await Spot.findAll(
      {
        include: [User]
      })
    for (let spot of allSpots){
      let reviewObj = {};
      const spotUserId = spot.dataValues.Users[0].dataValues.id
      reviewObj.spotId = spot.id ;
      reviewObj.userId = spotUserId;
      reviewObj.review = `Great place to stay and chill #${spot.id}`;
      if(spot.id%5 === 0){
        reviewObj.stars = 5
      }else{
        reviewObj.stars = spot.id%5;
      }
      allReviews.push(reviewObj)
    }

     await queryInterface.bulkInsert('Reviews', allReviews, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Reviews', {}, {});
  }
};
