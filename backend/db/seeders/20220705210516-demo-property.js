'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Properties', [
      {
        address: '6 Privet Drive',
        city: 'Lil Whinging',
        state: 'Surrey',
        country: 'Europe',
        lat: 38.785335,
        lng: -105.270489,
        name: 'Harry Potter House',
        description: 'Stay at the cupboard under the stairs like Harry did',
        price: 200,
        previewImage: 'image url 1',
        ownerId: 2
      },
      {
        address: '221B Baker Street',
        city: 'London',
        state: 'Sherlockville',
        country: 'Europe',
        lat: 39.891398,
        lng: -116.622148,
        name: 'Sherlocks Residence',
        description: 'Solve mysteries here',
        price: 150,
        previewImage: 'image url 2',
        ownerId: 3
      },
      {
        address: '742 Evergreen Terrace',
        city: 'Springfield',
        state: 'Illinois',
        country: 'United States of America',
        lat: 38.529468,
        lng: -78.980367,
        name: 'The Simpsons House',
        description: 'Come here to hang out with the Simpsons',
        price: 100,
        previewImage: 'image url 3',
        ownerId: 1
      }
     ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete('Properties', {
       address: { [Op.in]: ['6 Privet Drive', '221B Baker Street', '742 Evergreen Terrace'] }
     }, {});
  }
};
