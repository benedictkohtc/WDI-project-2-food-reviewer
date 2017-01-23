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
	res.locals.currentUser = req.user;
	next();
});

// setup default view
app.get('/', function (req, res) {
	res.render('index');
});

// setup controllers

// const petController = require('./controllers/pet_controller.js');
// app.use('/animals', petController);

// setup authentication barrier
const isLoggedIn = require('./middleware/isLoggedIn');
app.use(isLoggedIn);

app.listen(3000);

module.exports = app;
