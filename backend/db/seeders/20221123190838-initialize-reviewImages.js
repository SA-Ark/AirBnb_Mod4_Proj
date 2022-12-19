'use strict';

const {Review} = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'ReviewImages';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const allReviewImages = [];
    const allReviews = await Review.findAll();
    for (let review of allReviews){
      const reviewImgObj = {};
      reviewImgObj.reviewId = review.id;
      reviewImgObj.url = 'https://i.pinimg.com/550x/24/ba/43/24ba43dcfc2c8a1687fbc70c13a657be.jpg';
      allReviewImages.push(reviewImgObj)
    }


    // const allReviewImagesNew = [{
    //   reviewId : 1,
    //   url: 'www.google.com'
    // }]

    await queryInterface.bulkInsert(options, allReviewImages)
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(options, {});
  }
};
