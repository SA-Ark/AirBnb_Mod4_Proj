'use strict';
const {User} = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Spots';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

   const allUsers = await User.findAll();
   const start = allUsers[0].id
   const len = allUsers.length;

    const allSpots = [];
    for (let i = start; i < start+len; i++) {

      let spotObj = {};
      spotObj.ownerId = i;
      spotObj.address = `random street in rando town ${i}`;
      spotObj.city = `LA ${i}` ;
      spotObj.state = `CA ${i}`;
      spotObj.country = `USA ${i}`;
      spotObj.lat = `${33.5 + i}` ;
      spotObj.lng =  `${99.9 + i}`;
      spotObj.name = `Epic Pad ${i}`;
      spotObj.description = `This house is awesome ${i}`
      spotObj.price =  `${100 + i}`
      allSpots.push(spotObj)
    }
    await queryInterface.bulkInsert(options, allSpots);


  // const allSpotsNew = [{
  //   ownerId : 1,
  //   address : `random street in rando town`,
  //   city : `LA ` ,
  //   state : `CA `,
  //   country : `USA `,
  //   lat : 33.5  ,
  //   lng :  99.9,
  //   name : `Epic Pad`,
  //   description : `This house is awesome`,
  //   price :  120
  // }]
  //   await queryInterface.bulkInsert(options, allSpotsNew);
  },

  async down(queryInterface, Sequelize) {

    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};
