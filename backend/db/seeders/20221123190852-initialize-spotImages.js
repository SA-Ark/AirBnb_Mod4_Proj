'use strict';
const {Spot} = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'SpotImages';

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
    await queryInterface.bulkInsert(options, allSpotImages, {})

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(options, {}, {});
  }
};
