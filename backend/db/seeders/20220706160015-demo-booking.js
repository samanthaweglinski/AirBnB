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
      "Bookings",
      [
        {
          propertyId: 1,
          userId: 3,
          startDate: "2022-11-19",
          endDate: "2022-12-19",
        },
        {
          propertyId: 2,
          userId: 1,
          startDate: "2022-08-26",
          endDate: "2022-08-29",
        },
        {
          propertyId: 3,
          userId: 2,
          startDate: "2022-09-03",
          endDate: "2022-09-09",
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
      "Bookings",
      {
        propertyId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
