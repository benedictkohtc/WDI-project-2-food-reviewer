const express = require('express');
const router = express.Router();
const tags = require('../models/tags.js');
const locations = require('../models/locations.js');

// create new tags
router.post('/:locationID', function (req, res) {
	tags.findOneAndUpdate(
		{ tag: req.body.tag },
		{ $addToSet: { 'locationsArray': req.params.locationID } },
		{upsert: true, new: true, runValidators: true},
		function (err, tagData) {
			if (err) {
				throw err;
			} else {
				locations.findByIdAndUpdate(
					req.params.locationID,
					{ $addToSet: { 'tagsArray': tagData._id } },
					{upsert: true, new: true, runValidators: true},
					function (err, data) {
						if (err) {
							throw err;
						} else {
							res.redirect('back');
						}
					}
				);
			}
		}
	);
});

// list a specific tag
router.get('/:id', function (req, res) {
	tags.findById(req.params.id)
		.populate('locationsArray', 'name')
		.exec(function (err, tagData) {
			if (err) {
				throw err;
			} else {
				const filteredLocationsArray = tagData.locationsArray.map(function (element) {
					return element.name;
				});
				// find all tagged locations
				locations.find({name: {$in: filteredLocationsArray} })
					.populate('reviewsArray', 'review poster')
					.populate('tagsArray', 'tag')
					.exec(function (err, data) {
						if (err) {
							throw err;
						} else {
							res.render('locations/index.ejs', {data: data, pageHeader: 'Locations tagged "' + tagData.tag + '"'});
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
//
//
