'use strict';
const {Spot} = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const allSpotImages = [];
    const allSpots = await Spot.findAll();
    for (let spot of allSpots){
      const spotImgObj = {};
      spotImgObj.spotId = spot.id;
      spotImgObj.url = 'www.google.com';
      spotImgObj.preview = false;
      allSpotImages.push(spotImgObj)
    }
    await queryInterface.bulkInsert('SpotImages', allSpotImages, {})

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('SpotImages', {}, {});
  }
};
