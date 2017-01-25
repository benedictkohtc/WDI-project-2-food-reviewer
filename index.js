// setup environment variables
require('dotenv').config({ silent: true });

// setup express
const express = require('express');
const app = express();

// setup mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/food-reviewer');
mongoose.Promise = global.Promise;

// setup body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// setup methodOverride
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// setup static path
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// setup session and passport
const session = require('express-session');
const passport = require('./config/ppConfig');
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// setup flash
const flash = require('connect-flash');
app.use(flash());

// setup ejs and ejslayouts
app.set('view engine', 'ejs');
const ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);

// before every route, attach the flash messages and current user to res.locals
app.use(function (req, res, next) {
	res.locals.alerts = req.flash();
	res.locals.currentUserID = '';
	res.locals.currentUserName = '';
	if (req.user) {
		res.locals.currentUserID = req.user._id;
		res.locals.currentUserName = req.user.name;
	}
	next();
});

// setup default view
app.get('/', function (req, res) {
	res.render('index');
});

// setup controllers
const auth = require('./controllers/auth.js');
app.use('/auth', auth);

// setup authentication barrier
const isLoggedIn = require('./middleware/isLoggedIn');
app.use(isLoggedIn);

const profile = require('./controllers/profile.js');
app.use('/profile', profile);

const locations = require('./controllers/locations.js');
app.use('/locations', locations);

const reviews = require('./controllers/reviews.js');
app.use('/reviews', reviews);

const tags = require('./controllers/tags.js');
app.use('/tags', tags);

app.listen(3000);

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
//
//
//
//
//
