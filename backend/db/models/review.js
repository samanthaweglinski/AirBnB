'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(
        models.User,
        { foreignKey: 'userId' }
      )
      Review.belongsTo(
        models.Property,
        { foreignKey: 'propertyId' }
      )
      Review.hasMany(
        models.Image,
        { foreignKey: 'reviewId' }
      )
    }
  }
  Review.init({
    userId: {
      type: DataTypes.INTEGER
    },
    propertyId: {
      type: DataTypes.INTEGER
    },
    review: {
      type: DataTypes.STRING
    },
    stars: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
