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

module.exports = router;
