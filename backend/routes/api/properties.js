const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Property, Review, Image, User } = require('../../db/models');
const router = express.Router();



// Get all Properties
router.get('/', async (req, res) => {
  const allProperties = await Property.findAll()
  res.json(allProperties)
});

// Get details of a Property from an id


// Create a Property


// Edit a Property


// Delete a Property


module.exports = router;
