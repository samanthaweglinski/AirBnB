const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Property, Review, Image, User } = require("../../db/models");

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const router = express.Router();

// Get all Properties
router.get("/", async (req, res) => {
  const allProperties = await Property.findAll();
  res.json(allProperties);
});

// Get details of a Property from an id
router.get("/:propertyId", async (req, res) => {
  const propId = req.params.propertyId;

  const prop = await Property.findByPk(propId, {
    include: [
      { model: Image, as: "images", attributes: ["url"] },
      { model: User, as: "Owner", attributes: ["id", "firstName", "lastName"] },
    ],
  });

  const aggregateReviews = await Property.findByPk(req.params.propertyId, {
    include: {
      model: Review,
      attributes: [],
    },
    attributes: [
      [sequelize.fn("COUNT", sequelize.col("*")), "numReviews"],
      [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
    ],
    raw: true
  });

  const propData = prop.toJSON()
  propData.numReviews = aggregateReviews.numReviews
  propData.avgStarRating = aggregateReviews.avgStarRating

  if (!prop) {
    res.status(404);
    return res.json({ message: "Property couldn't be found" });
  }
  res.json(propData);
});

// Create a Property

// Edit a Property

// Delete a Property

module.exports = router;
