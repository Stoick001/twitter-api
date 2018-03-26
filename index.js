const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const Twitter = require('twitter');
const cors = require('cors');

require('./models/user');

mongoose.connect('mongodb://randuser:pass123@ds053176.mlab.com:53176/twitteroauth');

const app = express();

let clientObj = {};

app.use(cors());

app.use(bodyParser.json());
app.use(session({
  secret: 'daeqeqdq',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport, clientObj);

require('./routes/auth-routes')(app, passport);
require('./routes/twitter-routes')(app, clientObj);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
