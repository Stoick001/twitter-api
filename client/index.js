const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://randuser:pass123@ds053176.mlab.com:53176/twitteroauth');

const app = express();

app.use(bodyParser.json());
app.use(cookieSession({
  mexAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
