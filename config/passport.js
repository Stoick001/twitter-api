const TwitterStrategy  = require('passport-twitter').Strategy;

var User = require('../models/user');

var configAuth = require('./auth');

module.exports = (passport, client) => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });

  passport.use(new TwitterStrategy({
    consumerKey: configAuth.twitterAuth.consumerKey,
    consumerSecret: configAuth.twitterAuth.consumerSecret,
    callbackURL: configAuth.twitterAuth.callbackURL
  }, async (token, tokenSecret, profile, done) => {
    client.consumer_key = configAuth.twitterAuth.consumerKey;
    client.consumer_secret = configAuth.twitterAuth.consumerSecret;
    client.access_token_key = token;
    client.access_token_secret = tokenSecret;
    const existingUser = await User.findOne({ twitterId: profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }
    const user = await new User({ twitterId: profile.id }).save();
    done(null, user);
  }));
}
