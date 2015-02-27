var passport = require('passport');
var DribbbleStrategy = require('passport-dribbble').Strategy;

exports.setup = function (User, config) {
  passport.use(new DribbbleStrategy({
      clientID: config.dribbble.clientID,
      clientSecret: config.dribbble.clientSecret,
      callbackURL: config.dribbble.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({
        'dribbble.id': profile.id
      }, function(err, user) {
        if (!user) {
          user = new User({
            name: profile.displayName,
            role: 'user',
            provider: 'dribbble',
            github: profile._json
          });
          user.save(function(err) {
            if (err) done(err);
            return done(err, user);
          });
        } else {
          return done(err, user);
        }
      });
    }
  ));
};
