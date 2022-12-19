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
      spotImgObj.url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxaBwAh2xHrksOJSNhWQSCv9-vG3IDxCb1QKX28sODhqYH0fxSDd1i5kgXebXvM83i8FI&usqp=CAU';
      spotImgObj.preview = true;
      allSpotImages.push(spotImgObj)
    }

    // const allSpotImagesNew = [{
    //   spotId: 1,
    //   url: 'www.google.com',
    //   preview : false
    // }]
    await queryInterface.bulkInsert(options, allSpotImages)

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(options, {});
  }
};
