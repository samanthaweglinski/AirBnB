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

// Create a Booking from a Property based on the Property's id
router.post("/:propertyId", requireAuth, async (req, res) => {
  const prop = await Property.findByPk(req.params.propertyId);
  const { startDate, endDate } = req.body;

  if (!prop) {
    return res.status(404).json({
      message: "Property couldn't be found",
      statusCode: 404,
    });
  }

  const err = {
    message: "Validation error",
    statusCode: 400,
    errors: {},
  };

  if (!startDate) err.errors.startDate = "Start date is required (YYYY-MM-DD)";
  if (!endDate) err.errors.endDate = "End date is required (YYYY-MM-DD)";
  if (startDate > endDate)
    err.errors.endDate = "endDate cannot come before startDate";

  if (!startDate || !endDate || startDate > endDate) {
    return res.status(400).json(err);
  }

  const allBookings = await Booking.findAll({
    attributes: ["startDate", "endDate"],
    where: {
      propertyId: req.params.propertyId,
    },
    raw: true,
  });

  err.message = "Sorry, this spot is already booked for the specified dates";
  err.statusCode = 403;
  err.errors = {};

  for (let allDates of allBookings) {
    let startOfBooking = allDates.startDate;
    let endOfBooking = allDates.endDate;

    if (startDate >= startOfBooking && startDate <= endOfBooking) {
      err.errors.startDate = "Start date conflicts with an existing booking";
    }
    if (endDate >= startOfBooking && endDate <= endOfBooking) {
      err.errors.endDate = "End date conflicts with an existing booking";
    }
  }

  if ("endDate" in err.errors || "startDate" in err.errors) {
    return res.status(403).json(err);
  }

  const newBooking = await Booking.create({
    propertyId: req.params.propertyId,
    userId: req.user.id,
    startDate,
    endDate,
  });

  res.json(newBooking);
});

// Edit a Booking
router.put("/:bookingId", requireAuth, async (req, res) => {
  const bookingToEdit = await Booking.findByPk(req.params.bookingId);

  if (!bookingToEdit) {
    return res.status(404).json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }

  if (bookingToEdit.userId !== req.user.id) {
    return res.status(401).json({
      message: "You must be the owner of this booking to edit",
      statusCode: 401,
    });
  }

  const { propertyId } = bookingToEdit.toJSON();
  const allBookings = await Booking.findAll({
    attributes: ["startDate", "endDate"],
    where: {
      propertyId,
    },
    raw: true,
  });

  const err = {
    message: "Validation error",
    statusCode: 400,
    errors: {},
  };
  const { startDate, endDate } = req.body;

  if (bookingToEdit.endDate < Date.now()) {
    return res.status(400).json({
      message: "You cannot edit a past booking",
      statusCode: 400,
    });
  }

  if (!startDate) err.errors.startDate = "Start date is required";
  if (!endDate) err.errors.endDate = "End date is required";
  if (startDate > endDate)
    err.errors.endDate = "endDate cannot come before startDate";

  if (!startDate || !endDate || endDate < startDate) {
    return res.status(400).json(err);
  }

  err.message =
    "Sorry, this property is already booked for the specified dates";
  err.statusCode = 403;
  err.errors = {};

  for (let dates of allBookings) {
    let start = dates.startDate;
    let end = dates.endDate;
    if (startDate >= start && startDate <= end) {
      err.errors.startDate = "Start date conflicts with an existing booking";
    }
    if (endDate >= start && endDate <= end) {
      err.errors.endDate = "End date conflicts with an existing booking";
    }
  }

  if ("endDate" in err.errors || "startDate" in err.errors) {
    return res.status(403).json(err);
  }

  bookingToEdit.startDate = startDate;
  bookingToEdit.endDate = endDate;

  await bookingToEdit.save();

  res.json(bookingToEdit);
});

module.exports = router;
