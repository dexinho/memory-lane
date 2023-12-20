const express = require("express");
const router = express.Router();
const uploadPictureController = require("../controller/uploadPictureController");

router.post("/", uploadPictureController);

module.exports = router;
