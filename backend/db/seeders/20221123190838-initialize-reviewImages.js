'use strict';

const {Review} = require('../models')

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


    await queryInterface.bulkInsert('ReviewImages', allReviewImages, {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ReviewImages', {}, {});
  }
};
