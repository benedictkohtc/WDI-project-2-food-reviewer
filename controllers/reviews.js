const express = require('express');
const router = express.Router();
const reviews = require('../models/reviews.js');

// router.get('/', function (req, res) {
// 	reviews.find({}, function (err, data) {
// 		if (err) {
// 			throw err;
// 		} else {
// 			res.render('reviews/index.ejs', {data: data});
// 		}
// 	});
// });

router.get('/new/:id', function (req, res) {
	res.render('reviews/new_location.ejs');
});

router.post('/new/:id', function (req, res) {
	reviews.create({
		review: req.body.review,
		poster: res.locals.currentUserName
	}, function (err, data) {
		if (err) {
			throw err;
		} else {
			res.redirect('/locations');
		}
	});
});

module.exports = router;

//
//
//
//
//
//
//
//
//
//
