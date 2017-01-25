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

module.exports = router;
