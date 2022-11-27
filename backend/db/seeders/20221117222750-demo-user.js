'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Users';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert(options, [

      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'hi',
        lastName: "bye"
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password1'),
        firstName: 'hi1',
        lastName: "bye1"
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'hi2',
        lastName: "bye2"
      },
      {
        email: 'user3@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'hi3',
        lastName: "bye3"
      },
      {
        email: 'user4@user.io',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password4'),
        firstName: 'hi4',
        lastName: "bye4"
      },
      {
        email: 'user5@user.io',
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password5'),
        firstName: 'hi5',
        lastName: "bye5"
      },
      {
        email: 'user6@user.io',
        username: 'FakeUser6',
        hashedPassword: bcrypt.hashSync('password6'),
        firstName: 'hi6',
        lastName: "bye6"
      },{
        email: 'user7@user.io',
        username: 'FakeUser7',
        hashedPassword: bcrypt.hashSync('password7'),
        firstName: 'hi7',
        lastName: "bye7"
      },
      {
        email: 'user8@user.io',
        username: 'FakeUser8',
        hashedPassword: bcrypt.hashSync('password8'),
        firstName: 'hi8',
        lastName: "bye8"
      },
      {
        email: 'user9@user.io',
        username: 'FakeUser9',
        hashedPassword: bcrypt.hashSync('password9'),
        firstName: 'hi9',
        lastName: "bye9"
      },
      {
        email: 'user10@user.io',
        username: 'FakeUser10',
        hashedPassword: bcrypt.hashSync('password10'),
        firstName: 'hi10',
        lastName: "bye10"
      },
      {
        email: 'user11@user.io',
        username: 'FakeUser11',
        hashedPassword: bcrypt.hashSync('password11'),
        firstName: 'hi11',
        lastName: "bye11"
      },
      {
        email: 'user12@user.io',
        username: 'FakeUser12',
        hashedPassword: bcrypt.hashSync('password12'),
        firstName: 'hi12',
        lastName: "bye12"
      },
      {
        email: 'user13@user.io',
        username: 'FakeUser13',
        hashedPassword: bcrypt.hashSync('password13'),
        firstName: 'hi13',
        lastName: "bye13"
      },
      {
        email: 'user14@user.io',
        username: 'FakeUser14',
        hashedPassword: bcrypt.hashSync('password14'),
        firstName: 'hi14',
        lastName: "bye14"
      },
      {
        email: 'user15@user.io',
        username: 'FakeUser15',
        hashedPassword: bcrypt.hashSync('password15'),
        firstName: 'hi15',
        lastName: "bye15"
      },
      {
        email: 'user16@user.io',
        username: 'FakeUser16',
        hashedPassword: bcrypt.hashSync('password16'),
        firstName: 'hi16',
        lastName: "bye16"
      },
      {
        email: 'user17@user.io',
        username: 'FakeUser17',
        hashedPassword: bcrypt.hashSync('password17'),
        firstName: 'hi17',
        lastName: "bye17"
      },
      {
        email: 'user18@user.io',
        username: 'FakeUser18',
        hashedPassword: bcrypt.hashSync('password18'),
        firstName: 'hi18',
        lastName: "bye18"
      },
      {
        email: 'user19@user.io',
        username: 'FakeUser19',
        hashedPassword: bcrypt.hashSync('password19'),
        firstName: 'hi19',
        lastName: "bye19"
      },
      {
        email: 'user20@user.io',
        username: 'FakeUser20',
        hashedPassword: bcrypt.hashSync('password20'),
        firstName: 'hi20',
        lastName: "bye20"
      },
      {
        email: 'user21@user.io',
        username: 'FakeUser21',
        hashedPassword: bcrypt.hashSync('password21'),
        firstName: 'hi21',
        lastName: "bye21"
      }


    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
  
    return queryInterface.bulkDelete(options, {
      // username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    })

  }
};
