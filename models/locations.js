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
	reviewsArray: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }],
	tagsArray: [{ type: mongoose.Schema.Types.ObjectId, ref: 'locationTags' }],
	posterID: String,
	poster: String
});

module.exports = mongoose.model('Locations', locationSchema);
