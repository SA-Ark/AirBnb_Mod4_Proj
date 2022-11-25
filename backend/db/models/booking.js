'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Booking.belongsTo(models.Spot, {foreignKey: 'spotId'});
      // Booking.belongsTo(models.User, {foreignKey: 'userId'});
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false

    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate:{
      type: DataTypes.DATE,
      allowNull: false,
      validate : {
      minMaxYears(date){
        console.log(date.slice(0,4))
        if(+date.toString().split(' ')[3] > 2123 || +date.toString().split(' ')[3] < 2022)
        {
          throw new Error('Dates have to be within 100 years of curr date and not less than 2022')
        }
    }
      }
      },

    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        minMaxYears(date){

          if(+date.toString().split(' ')[3] > 2123 || +date.toString().split(' ')[3] < 2022)
          {
            throw new Error('Dates have to be within 100 years of curr date and not less than 2022')
          }
      }
    },
  },
},
 {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
