const express = require('express');
const router = express.Router();
const reviews = require('../models/reviews.js');
const locations = require('../models/locations.js');
const user = require('../models/user.js');

// get own profile
router.get('/:id', function (req, res) {
	reviews.find({ posterID: req.params.id }, 'review location', function (err, reviewData) {
		if (err) {
			throw err;
		} else {
			locations.find({ posterID: req.params.id }, 'name address', function (err, locationData) {
				if (err) {
					throw err;
				} else {
					res.render('profile/index.ejs', {reviewData: reviewData, locationData: locationData});
				}
			});
		}
	});
});

// stopped here, to test
// get other user's profile
router.get('/user/:id', function (req, res) {
	user.findOne({ _id: req.params.id }, 'name', function (err, userData) {
		if (err) {
			throw err;
		} else {
			reviews.find({ posterID: req.params.id }, 'review location', function (err, reviewData) {
				if (err) {
					throw err;
				} else {
					locations.find({ posterID: req.params.id }, 'name address', function (err, locationData) {
						if (err) {
							throw err;
						} else {
							res.render('profile/user.ejs', {userData: userData, reviewData: reviewData, locationData: locationData});
						}
					});
				}
			});
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
