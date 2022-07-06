"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert(
      "Images",
      [
        {
          url: "https://images.squarespace-cdn.com/content/v1/57b71e086a49637a9109a3f9/1536592971873-EQ6PZV356RUAX2SV0L4I/Cupboard+under+the+stairs+HP+Dr+Bookworm.JPG",
          reviewId: 1,
          propertyId: 1,
        },
        {
          url: "https://media.sketchfab.com/models/69be107ca5234ca8a9fcff6ba6851e9e/thumbnails/8e0d6effa45a4d9d8ed4fc1c89023f47/1024x576.jpeg",
          reviewId: 2,
          propertyId: 2,
        },
        {
          url: "https://static.wikia.nocookie.net/simpsons/images/6/65/800px-742_Evergreen_Terrace.png/revision/latest?cb=20170101225756",
          reviewId: 3,
          propertyId: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Images",
      {
        propertyId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
