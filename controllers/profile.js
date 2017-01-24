const express = require('express');
const router = express.Router();
const reviews = require('../models/reviews.js');

// form to create new review to specific location
router.get('/:id', function (req, res) {
	reviews.find({ posterID: req.params.id }, 'review location', function (err, data) {
		if (err) {
			throw err;
		} else {
			console.log('data', data);
			res.render('profile/index.ejs', {data: data});
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
