const express = require('express');
const router = express.Router();
const locations = require('../models/locations.js');

// list all locations
router.get('/', function (req, res) {
	locations.find({})
		.populate('reviewsArray', 'review poster')
		.populate('tagsArray', 'tag')
		.exec(function (err, data) {
			if (err) {
				throw err;
			} else {
				res.render('locations/index.ejs', {data: data, pageHeader: 'All Locations'});
			}
		});
});

// form to post new locations
router.get('/new', function (req, res) {
	res.render('locations/new_location.ejs');
});

// list a specific location
router.get('/:id', function (req, res) {
	locations.find({ _id: req.params.id })
		.populate('reviewsArray', 'review poster posterID')
		.populate('tagsArray', 'tag')
		.exec(function (err, data) {
			if (err) {
				throw err;
			} else {
				res.render('locations/locationDetails.ejs', {data: data});
			}
		});
});

// create a new location
router.post('/', function (req, res) {
	locations.create({
		name: req.body.name,
		address: req.body.address,
		posterID: res.locals.currentUserID,
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
