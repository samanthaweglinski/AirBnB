const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Op, EmptyResultError } = require("sequelize");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const {
  Property,
  Review,
  Booking,
  Image,
  User,
  sequelize,
} = require("../../db/models");
const router = express.Router();

// Get all Bookings for a Property based on the Property's id
router.get("/:propertyId", requireAuth, async (req, res) => {
  const prop = await Property.findByPk(req.params.propertyId, {
    where: { ownerId: req.user.id },
    attributes: ["ownerId"],
  });

  if (!prop) {
    return res.status(404).json({
      message: "Property couldn't be found",
      statusCode: 404,
    });
  }

  const allBookings = await Booking.findAll({
    where: { propertyId: req.params.propertyId },
    attributes: ["propertyId", "startDate", "endDate"],
  });

  const ownerBookings = await Booking.findAll({
    where: { propertyId: req.params.propertyId },
    include: {
      model: User,
      attributes: ["id", "firstName", "lastName"],
    },
  });

  if (prop.ownerId === req.user.id) {
    return res.json({ Bookings: ownerBookings });
  } else {
    return res.json({ Bookings: allBookings });
  }
});

module.exports = router;
