const mongoose = require('mongoose');

let locationSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	reviewsArray: [String],
	posterID: String,
	poster: String
});

let locations = mongoose.model('Locations', locationSchema);

module.exports = locations;
