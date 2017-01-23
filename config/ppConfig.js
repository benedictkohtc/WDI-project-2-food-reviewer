var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, data) {
		done(err, data._id);
	});
});

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, function (email, password, done) {
	User.findOne({ email: email }, function (err, user) {
		if (err) return done(err);

		if (!user) return done(null, false);

		if (!user.validPassword(password)) return done(null, false);

		return done(null, user);
	});
}));

module.exports = passport;
