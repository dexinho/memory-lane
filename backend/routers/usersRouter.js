const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/profile-pictures", usersController.getProfilePicture);
router.get("/data", usersController.data);

module.exports = router;
