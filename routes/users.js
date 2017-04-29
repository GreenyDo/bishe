var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/ok', function(req, res, next) {
  res.send("ok");
});

module.exports = router;
