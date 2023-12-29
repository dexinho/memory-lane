const express = require('express')
const router = express.Router()
const authenticationController = require('../controllers/authenticationController')

router.post('/validate', authenticationController.validate)
router.post('/register', authenticationController.register)

module.exports = router