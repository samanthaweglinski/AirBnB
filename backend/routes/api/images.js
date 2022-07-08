const express = require("express");
const { Property, Review, Image } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();

// Delete an Image
router.delete('/:imageId', requireAuth, async (req, res) => {
  
})




module.exports = router;
