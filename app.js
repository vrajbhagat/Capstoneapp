// Declare Variables
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const app = express();

// Setup Connection to Database = Mongoose
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', function() {
    console.log('Connected to database '+config.database);
});

// On Connection
mongoose.connection.on('error', function(err) {
    console.log('Database error: '+err);
});

// Creating routes for all users
const users = require('./routes/users');

// Port Number
const port = process.env.PORT || 8080;

// Cors Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport MiddleWare
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Adding routes to variable users
app.use('/users', users);

// Index Route
app.get('/', function(req, res) {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {    
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, function() {
    console.log('Server started on port '+port);
});