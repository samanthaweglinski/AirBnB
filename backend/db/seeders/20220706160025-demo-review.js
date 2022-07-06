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
      "Reviews",
      [
        {
          userId: 3,
          propertyId: 1,
          review:
            "Our stay was great! The cupboard under the stairs is very cozy.",
          stars: 5,
        },
        {
          userId: 1,
          propertyId: 2,
          review:
            "Our host was a little bit nosy, I found him snooping around outside. Will NOT be coming back.",
          stars: 1,
        },
        {
          userId: 2,
          propertyId: 3,
          review: "The town is great, I love going to the donut shop.",
          stars: 3,
        },
        {
          userId: 1,
          propertyId: 3,
          review: "House was clean enough, decoration was not to my liking.",
          stars: 2,
        },
        {
          userId: 3,
          propertyId: 2,
          review:
            "The weather was a bit muggy when we visited. Tea is very good though and lots to do around town!",
          stars: 4,
        },
        {
          userId: 2,
          propertyId: 1,
          review: "Hated our stay, too much screaming going on.",
          stars: 1,
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
      "Reviews",
      {
        propertyId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
