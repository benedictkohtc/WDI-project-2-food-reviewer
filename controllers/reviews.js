const express = require('express');
const router = express.Router();
const reviews = require('../models/reviews.js');
const locations = require('../models/locations.js');

// display form to create new review to specific location
router.get('/new/:id', function (req, res) {
	res.render('reviews/new_location.ejs');
});

// create new review to specific location
router.post('/new/:id', function (req, res) {
	reviews.create({
		review: req.body.review,
		posterID: res.locals.currentUserID,
		poster: res.locals.currentUserName,
		locationID: req.params.id,
		location: req.body.location
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

// edit review from profile page
router.put('/profile/:id', function (req, res) {
	reviews.findByIdAndUpdate(
		req.params.id,
		{review: req.body.review},
		{upsert: true, new: true, runValidators: true},
		function (err, data) {
			if (err) {
				throw err;
			} else {
				res.redirect('/profile/' + res.locals.currentUserID);
			}
		}
	);
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
