const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  console.log('router')
  res.send('Hi there')
});

module.exports = router;
