const express = require('express');
const router = express.Router();
const locations = require('../models/locations.js');

router.get('/', function (req, res) {
	locations.find({}, function (err, data) {
		if (err) {
			throw err;
		} else {
			res.render('locations/index.ejs', {data: data});
		}
	});
});

router.get('/new', function (req, res) {
	res.render('locations/new_location.ejs');
});

router.get('/:id', function (req, res) {
	locations.find({ _id: req.params.id }, function (err, data) {
		if (err) {
			throw err;
		} else {
			res.render('locations/locationDetails.ejs', {data: data});
		}
	});
});

router.get('/URLpath', function (req, res) {
	// 2nd argument in find() determines specific fields to be returned, is optional
	model.find({ searchField: 'search field data' }, 'field1 field2', function (err, data) {
		if (err) {
			throw err;
		} else {
			res.render('folder/file', {data: data});
		}
	});
});

router.post('/', function (req, res) {
	locations.create({
		name: req.body.name,
		address: req.body.address,
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
