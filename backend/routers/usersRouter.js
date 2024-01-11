const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/get-profile-picture", usersController.getProfilePicture);
router.get("/get-user-data", usersController.getUserData);
router.get('/search', usersController.search)

module.exports = router;
