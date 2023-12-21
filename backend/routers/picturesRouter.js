const express = require("express");
const router = express.Router();
const picturesController = require("../controllers/picturesController");

router.post("/uploadPicture", picturesController.uploadPictureController);

module.exports = router;