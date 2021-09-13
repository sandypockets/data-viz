var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Data Viz' });
});

router.get('/heat-map', function(req, res, next) {
  res.render('heat-map', { title: 'Heat Map | Data Visualization' });
});

router.get('/cost-of-living', function(req, res, next) {
  res.render('cost-of-living', { title: 'Cost of Living | Data Visualization' });
});

router.get('/movie-ratings', function(req, res, next) {
  res.render('movie-ratings', { title: 'Movie Ratings | Data Visualization' });
});

router.get('/name-rankings', function(req, res, next) {
  res.render('name-rankings', { title: 'Name Ratings | Data Visualization' });
});


module.exports = router;
