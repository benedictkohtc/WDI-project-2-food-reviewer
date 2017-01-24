const express = require('express');
const router = express.Router();
const reviews = require('../models/reviews.js');
const locations = require('../models/locations.js');

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
		posterID: res.locals.currentUserID,
		poster: res.locals.currentUserName
	}, function (err, newReview) {
		if (err) {
			throw err;
		} else {
			locations.findByIdAndUpdate(
				req.params.id,
				{ $push: { 'reviewsArray': newReview._id } },
				{upsert: true, new: true, runValidators: true},
				function (err, data) {
					if (err) {
						throw err;
					} else {
						res.redirect('/locations/' + req.params.id);
					}
				}
			);
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
