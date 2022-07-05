const express = require('express');
const router = express.Router();

const { Property, Review, User } = require('../../db/models');

router.get('/', async (req, res) => {
  const allProperties = await Property.findAll()
  res.json({ allProperties })
});

router.get('/:propertyId', async (req, res) => {
  const prop = await Property.findByPk(req.params.id, {
    include: {model: User, attributes: ['id', 'firstName', 'lastName']},
  })

  if (!prop) {
    const err = new Error("Property couldn't be found")
    err.status = 404
    res.json({
      message: err.message,
      code: err.status
    })
  } else {
    const numReviews = await Review.count({
      where: { propertyId: property.id }
    })
    const data = {}
    data.prop = {
      id: prop.id,
      address: prop.address,
      city: prop.city,
      state: prop.state,
      country: prop.country,
      lat: prop.lat,
      lng: prop.lng,
      name: prop.name,
      description: prop.description,
      price: prop.price,
      createdAt: prop.createdAt,
      updatedAt: prop.updatedAt
    }

    data.numReviews = numReviews

    res.json(data)
  }
})

router.use()
