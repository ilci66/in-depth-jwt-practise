const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser')

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
var app = express();

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
require('./config/database');

// Must first load the models
require('./models/user');

// Pass the global passport object into the configuration function
// require('./config/passport')(passport);

// This will initialize the passport object on every request
// app.use(passport.initialize());

// //turns out body parser middleware is unbundled, so install and use body-parser 
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Allows our Angular application to make HTTP requests to Express application
app.use(cors());

// Where Angular builds to - In the ./angular/angular.json file, you will find this configuration
// at the property: projects.angular.architect.build.options.outputPath
// When you run `ng build`, the output will go to the ./public directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
const routes = require('./routes')
app.use('/', routes);


/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(3000);