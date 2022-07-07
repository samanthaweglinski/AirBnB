const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Property, Review, Image, User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Sequelize } = require("sequelize");
// const sequelize = new Sequelize("sqlite::memory:");

const router = express.Router();

const validateProperty = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

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

  if (!prop) {
    res.status(404);
    return res.json({ message: "Property couldn't be found" });
  }

  const aggregateReviews = await Property.findByPk(req.params.propertyId, {
    include: {
      model: Review,
      attributes: [],
    },
    attributes: [
      [sequelize.fn("COUNT", sequelize.col("*")), "numReviews"],
      [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
    ],
    raw: true,
  });

  const propData = prop.toJSON();
  propData.numReviews = aggregateReviews.numReviews;
  propData.avgStarRating = aggregateReviews.avgStarRating;

  res.json(propData);
});

// Create a Property

router.post("/", requireAuth, validateProperty, async (req, res, next) => {
  // const propAddress = req.property.address;

  // const existingProp = await Property.findAll({
  //   where: { propAddress }
  // });

  // if (existingProp) {
  //   const err = new Error("This property already exists");
  //   err.status = 403
  // }

  const {
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  } = req.body;
  const { id } = req.user;

  const newProp = await Property.create({
    ownerId: id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  res.json(201, newProp);
});

// Edit a Property

router.put("/:propertyId", requireAuth, validateProperty, async (req, res) => {
  let { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const prop = await Property.findByPk(req.params.propertyId);

  if (!prop) {
    res.status(404);
    res.json({
      message: "Property couldn't be found",
      statusCode: 404,
    });
  };

  if (prop !== req.user) {
    res.status(401);
    res.json({
      message: "You must be the owner to edit this property",
      statusCode: 401
    });
  };

  prop.address = address;
  prop.city = city;
  prop.state = state;
  prop.country = country;
  prop.lat = lat;
  prop.lng = lng;
  prop.name = name;
  prop.description = description;
  prop.price = price;

  await prop.save();
  return res.json(prop);
});

// Delete a Property

router.delete("/:propertyId", requireAuth, async (req, res) => {
  const prop = await Property.findByPk(req.params.propertyId);

  if (!prop) {
    res.status(404);
    res.json({
      message: "Property couldn't be found",
      statusCode: 404
    });
  };

  if (prop !== req.user) {
    res.status(401);
    res.json({
      message: "You must be the owner to delete this property",
      statusCode: 401
    });
  };

  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });

  prop.destroy();
  prop.save();
});

module.exports = router;
