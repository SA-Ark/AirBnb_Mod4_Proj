'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {foreignKey: 'ownerId'});
      Spot.hasMany(models.Review, {foreignKey: 'spotId',
      onDelete: 'CASCADE',
      hooks: true})
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'SET NULL',
      validate: {
        isNumeric: true
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [2, Infinity]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {

        len: [2, Infinity]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {

        len: [2, Infinity]
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {

        len: [2, Infinity]
      }
    },
    lat: {
      type: DataTypes.REAL,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [2, Infinity],
        min: -90,
        max: 90
      }
    },
    lng: {
      type: DataTypes.REAL,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [2, Infinity],
        min: -180,
        max: 180
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {

        len: [2, Infinity]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        min: 0
      }
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
