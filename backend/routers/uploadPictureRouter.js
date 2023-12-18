const express = require("express");
const router = express.Router();
const uploadPicture = require("../middleware/uploadPicture");
const uploadPictureController = require("../controller/uploadPictureController");

router.post("/", uploadPicture.single("image"), uploadPictureController);

module.exports = router;
