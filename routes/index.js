var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/heat-map', function(req, res, next) {
  res.render('heat-map', { title: 'Heat Map | Data Visualization' });
});

router.get('/cost-of-living', function(req, res, next) {
  res.render('cost-of-living', { title: 'Express' });
});


module.exports = router;
