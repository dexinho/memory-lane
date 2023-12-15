const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  console.log('router')
  res.send('Hi there')
}).post((req, res) => {
  console.log('post')
});


module.exports = router;
