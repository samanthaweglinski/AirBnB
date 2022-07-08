const express = require("express");
const { Op } = require("sequelize");
const { requireAuth } = require("../../utils/auth");
const { Property, Review, Image, User, sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

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

// Add an Image to a Property based on the Property's id
router.post("/:propertyId/image", requireAuth, async (req, res) => {
  const { url } = req.body;
  const currentUserId = req.user.id;
  const prop = await Property.findByPk(req.params.propertyId, {
    where: {
      ownerId: req.user.id,
    },
  });

  if (!prop) {
    return res.status(404).json({
      message: "Property couldn't be found",
      statusCode: 404,
    });
  }

  if (prop.ownerId !== currentUserId) {
    res.status(403);
    res.json({
      message: "Only owners of the property can add an image",
      statusCode: 403,
    });
  }

  const allImages = await Image.findAll({
    where: {
      [Op.and]: [
        { propertyId: req.params.propertyId },
        { imageableType: "Property" },
      ],
    },
  });

  let image = await Image.create({
    url,
    imageableId: allImages.length + 1,
    imageableType: "Property",
    propertyId: req.params.propertyId,
  });

  image = image.toJSON();

  res.json(image);
});

// Get all Properties
// router.get("/", async (req, res) => {
//   const allProperties = await Property.findAll();
//   res.json(allProperties);
// });

router.get("/", async (req, res) => {
  const pagination = {
    filter: [],
  };
  let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;
  const error = {
    message: "Validation Error",
    statusCode: 400,
    errors: {},
  };

  page = Number(page);
  size = Number(size);

  if (Number.isNaN(page)) page = 0;
  if (Number.isNaN(size)) size = 20;

  if (page > 10) page = 10;
  if (size > 20) size = 20;

  if (page < 0) error.errors.page = "Page must be greater than or equal to 0";
  if (size < 0) error.errors.size = "Size must be greater than or equal to 0";
  if (Number(maxLat) > 90) {
    error.errors.maxLat = "Maximum latitude is invalid";
    maxLat = false;
  }
  if (Number(minLat) < -90) {
    error.errors.maxLat = "Minimum latitude is invalid";
    minLng = false;
  }
  if (Number(maxLng) > 180) {
    error.errors.maxLng = "Maximum longitude is invalid";
    maxLng = false;
  }
  if (Number(minLng) < -180) {
    error.errors.minLng = "Minimum longitude is invalid";
    minLng = false;
  }
  if (Number(minPrice) < 0) {
    error.errors.minPrice = "Maximum price must be greater than 0";
    minPrice = false;
  }
  if (Number(maxPrice) < 0) {
    error.errors.maxPrice = "Minimum price must be greater than 0";
    maxPrice = false;
  }

  if (
    page < 0 ||
    size < 0 ||
    (!maxLat && maxLat !== undefined) ||
    (!minLat && minLat !== undefined) ||
    (!maxLng && maxLng !== undefined) ||
    (!minLng && minLng !== undefined) ||
    (!minPrice && minPrice !== undefined) ||
    (!maxPrice && maxPrice !== undefined)
  ) {
    res.status(400);
    res.json(error);
  }

  if (maxLat) {
    pagination.filter.push({
      lat: { [Op.lte]: Number(maxLat) },
    });
  }
  if (minLat) {
    pagination.filter.push({
      lat: { [Op.gte]: Number(minLat) },
    });
  }
  if (minLng) {
    pagination.filter.push({
      lng: { [Op.gte]: Number(minLng) },
    });
  }
  if (maxLng) {
    pagination.filter.push({
      lng: { [Op.lte]: Number(maxLng) },
    });
  }
  if (minPrice) {
    pagination.filter.push({
      price: { [Op.gte]: Number(minPrice) },
    });
  }
  if (maxPrice) {
    pagination.filter.push({
      price: { [Op.lte]: Number(maxPrice) },
    });
  }

  pagination.size = size;
  pagination.page = page;

  const allProperties = await Property.findAll({
    where: {
      [Op.and]: pagination.filter,
    },
    limit: pagination.size,
    offset: pagination.size * pagination.page,
  });
  res.json({
    allProperties,
    page: pagination.page,
    size: pagination.size,
  });
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

  // if (!prop) {
  //   res.status(404);
  //   res.json({
  //     message: "Property couldn't be found",
  //     statusCode: 404,
  //   });
  // }

  // if (prop !== req.user) {
  //   res.status(401);
  //   res.json({
  //     message: "You must be the owner to edit this property",
  //     statusCode: 401,
  //   });
  // }

  if (!prop) {
    res.status(404);
    return res.json({
      message: "Property couldn't be found",
      statusCode: 404,
    });
  } else if (prop.ownerId !== req.user.id) {
    return res
      .status(403)
      .json({ message: "You must be the owner to edit this property" });
  }

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

  // if (!prop) {
  //   res.status(404);
  //   res.json({
  //     message: "Property couldn't be found",
  //     statusCode: 404,
  //   });
  // }

  // if (prop !== req.user) {
  //   res.status(401);
  //   res.json({
  //     message: "You must be the owner to delete this property",
  //     statusCode: 401,
  //   });
  // }

  if (!prop) {
    res.status(404);
    return res.json({
      message: "Property couldn't be found",
      statusCode: 404,
    });
  } else if (prop.ownerId !== req.user.id) {
    return res
      .status(403)
      .json({ message: "You must be the owner to edit this property" });
  }

  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });

  prop.destroy();
  prop.save();
});

module.exports = router;
