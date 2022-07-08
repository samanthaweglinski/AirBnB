const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const propertiesRouter = require("./properties.js");
const reviewsRouter = require("./reviews.js");
const bookingsRouter = require("./bookings.js");
const imagesRouter = require("./images");
const {
  restoreUser,
  requireAuth,
  setTokenCookie,
} = require("../../utils/auth.js");
const { Property, Review, Image, User, sequelize } = require("../../db/models");

// GET /api/restore-user (must be connected before any other middleware or route handlers)
router.get("/restore-user", (req, res) => {
  return res.json(req.user);
});

router.get("/set-token-cookie", async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: "Demo-lition",
    },
  });
  setTokenCookie(res, user);
  return res.json({ user });
});

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

router.get("/require-auth", requireAuth, (req, res) => {
  return res.json(req.user);
});

router.use(restoreUser);

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/properties", propertiesRouter);
router.use("/reviews", reviewsRouter);
router.use("/bookings", bookingsRouter);
router.use("/images", imagesRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
