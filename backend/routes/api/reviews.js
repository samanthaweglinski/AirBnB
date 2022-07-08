const express = require("express");
const { Property, Review, Image } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { Op } = require("sequelize");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

// const validateReview = [
//   check("review")
//     .exists({ checkFalsy: true })
//     .withMessage("Review text is required"),
//   check("stars")
//     .exists({ checkFalsy: true })
//     .isLength({ min: 1, max: 5 })
//     .withMessage("Stars must be an integer from 1 to 5"),
//   handleValidationErrors,
// ];

// Get all Reviews by a Property's id
router.get("/:propertyId", async (req, res) => {
  const reviews = await Review.findAll({
    include: [
      {
        model: Image,
        attributes: ["url"],
      },
    ],
    where: {
      propertyId: req.params.propertyId,
    },
  });

  if (!reviews.length) {
    return res.status(404).json({
      message: "Property couldn't be found",
      statusCode: 404,
    });
  }
  res.json(reviews);
});

// Create a Review for a Property based on the Property's id
router.post("/:propertyId", requireAuth, async (req, res) => {
  const { review, stars } = req.body;
  const prop = await Property.findByPk(req.params.propertyId);
  const err = {
    message: "Validation error",
    statusCode: 400,
    errors: {},
  };

  if (!prop) {
    return res.status(404).json({
      message: "Property couldn't be found",
      statusCode: 404,
    });
  }

  const checkIfReviewExists = await Review.findAll({
    where: {
      [Op.and]: [
        { propertyId: req.params.propertyId },
        { userId: req.user.id },
      ],
    },
  });

  if (checkIfReviewExists.length >= 1) {
    return res.status(403).json({
      message: "User already has a review for this property",
      statusCode: 403,
    });
  }

  if (!review) err.errors.review = "Review text is required";
  if (stars < 1 || stars > 5)
    err.errors.star = "Stars must be an integer from 1 to 5";
  if (!review || !stars) {
    return res.status(400).json(err);
  }

  const newReview = await Review.create({
    userId: req.user.id,
    propertyId: req.params.propertyId,
    review,
    stars,
  });

  res.json(newReview);
});

// Edit a Review
router.put("/:reviewId", requireAuth, async (req, res) => {
  const updatedReview = await Review.findByPk(req.params.reviewId);
  const { review, stars } = req.body;
  const err = {
    message: "Validation error",
    statusCode: 400,
    errors: {},
  };

  if (!updatedReview || updatedReview.userId !== req.user.id) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  if (!review) err.errors.review = "Review text is required";
  if (stars < 1 || stars > 5)
    err.errors.stars = "Stars must be an integer from 1 to 5";
  if (!review || !stars) {
    return res.status(400).json(err);
  }

  updatedReview.review = review;
  updatedReview.stars = stars;
  await updatedReview.save();
  res.json(updatedReview);
});

// Delete a Review
router.delete("/:reviewId", requireAuth, async (req, res) => {
  const review = await Review.findByPk(req.params.reviewId);

  if (!review || review.userId !== req.user.id) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  await review.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
