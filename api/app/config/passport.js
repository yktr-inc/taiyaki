const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
};

module.exports = passport => {
  passport.use(new Strategy(opts, function(payload, done) {
    User.findById(payload.id)
      .then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
    });
  }));
};
