const express = require('express')
const router = express.Router()
const validateLoginController = require('../controller/validateLoginController')

router.post('/', validateLoginController)

module.exports = router