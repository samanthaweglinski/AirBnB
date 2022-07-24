const express = require("express");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    // .notEmpty()
    .withMessage("Email is required."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required."),
  handleValidationErrors,
];

// Restore session user
router.get("/", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      user: user.toSafeObject(),
    });
  } else return res.json({});
});

// Log in
router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  if (!user) {
    res.status(401);
    return res.json({
      message: "Invalid credentials",
      statusCode: 401,
    });
  }

  // if (!req.body) {
  //   res.json({
  //     message: "Validation error",
  //     statusCode: 400,
  //     errors: {
  //       email: "Email is Required",
  //       password: "Password is Required",
  //     },
  //   });
  // }

  const token = await setTokenCookie(res, user);

  const userRes = {
    id: req.user.id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    token: token,
  };

  return res.json(userRes);
});


// Log out
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

module.exports = router;
