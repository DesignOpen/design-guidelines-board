var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

exports.setup = function (User, config) {
  passport.use(new GitHubStrategy({
      clientID: config.github.clientID,
      clientSecret: config.github.clientSecret,
      callbackURL: config.github.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({
        'github.id': profile.id
      }, function(err, user) {
        if (!user) {
          user = new User({
            name: profile.displayName,
            role: 'user',
            provider: 'github',
            github: profile._json
          });
          user.save(function(err) {
            if (err) done(err);
            return done(err, user);
          });
        } else {
          user.name = profile.displayName;
          user.github = profile._json;
          user.save(function(err) {
            if (err) done(err);
            return done(err, user);
          });
        }
      });
    }
  ));
};
