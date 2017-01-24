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

let reviews = mongoose.model('Reviews', reviewsSchema);

module.exports = reviews;
