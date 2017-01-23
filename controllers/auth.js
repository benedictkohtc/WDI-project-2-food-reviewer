const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('../config/ppConfig');

router.get('/login', function (req, res) {
	res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/locations',
	failureRedirect: '/auth/login',
	failureFlash: 'Invalid username and/or password',
	successFlash: 'You have logged in'
}));

router.get('/signup', function (req, res) {
	res.render('auth/signup');
});

router.post('/signup', function (req, res) {
	User.create({
		email: req.body.email,
		name: req.body.name,
		password: req.body.password
	}, function (err, createdUser) {
		if (err) {
			// FLASH -
			req.flash('error', err.toString());
			res.redirect('/auth/signup');
			console.log(err);
		} else {
			// FLASH
			passport.authenticate('local', {
				successRedirect: '/locations',
				successFlash: 'Account created and logged in'
			})(req, res);
		}
	});
});

router.get('/logout', function (req, res) {
	req.logout();
	// FLASH
	req.flash('success', 'You have logged out');
	res.redirect('/');
});

module.exports = router;
