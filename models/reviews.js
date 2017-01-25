const mongoose = require('mongoose');

let reviewsSchema = new mongoose.Schema({
	review: {
		type: String,
		required: true
	},
	posterID: String,
	poster: String,
	locationID: String,
	location: String
});

module.exports = mongoose.model('Reviews', reviewsSchema);
