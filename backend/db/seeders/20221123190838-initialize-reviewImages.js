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
      reviewImgObj.url = 'www.google.com';
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
