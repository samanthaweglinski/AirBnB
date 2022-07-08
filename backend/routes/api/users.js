const express = require("express");

const { Property, Review, Image, User } = require("../../db/models");

const { setTokenCookie, requireAuth } = require("../../utils/auth");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  handleValidationErrors,
];

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { email, username, password, firstName, lastName } = req.body;

  const validateEmail = await User.findOne({
    where: { email },
  });

  if (validateEmail) {
    res.status(403);
    res.json({
      message: "User already exists",
    });
  }

  const user = await User.signup({
    email,
    username,
    password,
    firstName,
    lastName,
  });

  if (!firstName) {
    res.status(400).json({
      message: "First Name is required",
    });
  }

  if (!lastName) {
    res.status(400).json({
      message: "Last Name is required",
    });
  }

  const token = await setTokenCookie(res, user);

  return res.json({
    user,
    token,
  });
});

// Get the Current User
router.get("/currentUser", requireAuth, async (req, res) => {
  const user = {
    id: req.user.id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
  };
  return res.json(user);
});

// Get all Properties owned by the Current User
router.get("/currentUser/properties", requireAuth, async (req, res) => {
  const { id } = req.user;

  const props = await Property.findAll({
    where: { ownerId: id },
  });
  res.json(props);
});

// Get all Reviews of the Current User
router.get("/currentUser/reviews", requireAuth, async (req, res) => {
  const { id } = req.user;

  const reviews = await Review.findAll({
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"] },
      {
        model: Property,
        attributes: {
          exclude: ["description", "previewImage", "createdAt", "updatedAt"],
        },
      },
      { model: Image, attributes: ["url"] },
    ],
    where: { userId: id },
  });

  if (!reviews) {
    res.json({ message: "The user has no reviews." });
  }

  res.json(reviews);
});

module.exports = router;
