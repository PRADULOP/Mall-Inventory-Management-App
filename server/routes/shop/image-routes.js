const express = require("express");
const multer = require("multer");
const { imageSearch } = require("../../controllers/shop/imageSearchController");

const router = express.Router();
const upload = multer(); // Use memory storage for file upload

router.post("/image-search", upload.single("image"), imageSearch);

module.exports = router;
