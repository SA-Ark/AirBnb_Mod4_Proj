'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
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
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'hi',
        lastName: "bye"
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'hi',
        lastName: "bye"
      },
      {
        email: 'user3@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'hi',
        lastName: "bye"
      },
      {
        email: 'user4@user.io',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'hi',
        lastName: "bye"
      },
      {
        email: 'user5@user.io',
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'hi',
        lastName: "bye"
      },
      {
        email: 'user6@user.io',
        username: 'FakeUser6',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'hi',
        lastName: "bye"
      },{
        email: 'user7@user.io',
        username: 'FakeUser7',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'hi',
        lastName: "bye"
      },
      {
        email: 'user8@user.io',
        username: 'FakeUser8',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'hi',
        lastName: "bye"
      },
      {
        email: 'user9@user.io',
        username: 'FakeUser9',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'hi',
        lastName: "bye"
      },
      {
        email: 'user10@user.io',
        username: 'FakeUser10',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'hi',
        lastName: "bye"
      },
      {
        email: 'user11@user.io',
        username: 'FakeUser11',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'hi',
        lastName: "bye"
      },
      {
        email: 'user12@user.io',
        username: 'FakeUser12',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'hi',
        lastName: "bye"
      },
      {
        email: 'user13@user.io',
        username: 'FakeUser13',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'hi',
        lastName: "bye"
      },
      {
        email: 'user14@user.io',
        username: 'FakeUser14',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'hi',
        lastName: "bye"
      },
      {
        email: 'user15@user.io',
        username: 'FakeUser15',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'hi',
        lastName: "bye"
      },
      {
        email: 'user16@user.io',
        username: 'FakeUser16',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'hi',
        lastName: "bye"
      },
      {
        email: 'user17@user.io',
        username: 'FakeUser17',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'hi',
        lastName: "bye"
      },
      {
        email: 'user18@user.io',
        username: 'FakeUser18',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'hi',
        lastName: "bye"
      },
      {
        email: 'user19@user.io',
        username: 'FakeUser19',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'hi',
        lastName: "bye"
      },
      {
        email: 'user20@user.io',
        username: 'FakeUser20',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'hi',
        lastName: "bye"
      },
      {
        email: 'user21@user.io',
        username: 'FakeUser21',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'hi',
        lastName: "bye"
      },


    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
