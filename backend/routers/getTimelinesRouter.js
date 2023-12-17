const express = require('express')
const router = express.Router()
const getTimelinesController = require('../controller/getTimelinesController.js')

router.get('/', getTimelinesController)

module.exports = router