const express = require("express");
const { Property, Review, Image, User, sequelize } = require("../../db/models");
const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");
const { Op } = require("sequelize");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const user = require('../../db/models/user');
const router = express.Router();

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

// Get all Reviews by a Property's id
router.get('/:propertyId', async (req, res) => {

  const reviews = await Review.findAll({
    include: [{
      model: Image,
      attributes: ['url']
    }],
    where: {
      propertyId: req.params.propertyId
    }
  })

  if (!reviews.length) {
    return res.status(404).json({
      "message": "Property couldn't be found",
      "statusCode": 404
    })
  }
  res.json(reviews)
})

// Create a Review for a Property based on the Property's id



module.exports = router;
