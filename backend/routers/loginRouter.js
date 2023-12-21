const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController')

router.post('/validateLogin', loginController.validateLoginController)
router.get('/loggedUserData', loginController.loggedUserDataController)

module.exports = router