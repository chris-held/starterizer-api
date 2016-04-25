var passport = require("passport");
var jwt = require('jsonwebtoken');

module.exports = {
  login: function (req, res) {
    passport.authenticate('local', function (err, user) {
      if (!user) {
        res.send({
          success: false,
          message: 'invalidLogin'
        });
        return;
      } else {
        if (err) {
          res.send({
            success: false,
            message: 'unknownError',
            error: err
          });
        } else {

          //set token to expire in 24 hours (could be made configurable)
          var token = jwt.sign(user, sails.config.secret, {expiresIn: 86400});
          // Set persistent cookie
          req.session.cookie.token = token;
          res.send({
            success: true,
            user: user[0],
            token: token
          });
        }
      }
    })(req, res);
  },
  getUserFromToken: function (req, cb) {
    if (req.headers.authorization) {
      jwt.verify(req.headers.authorization.replace('Bearer ', ''), sails.config.secret, function (err, decoded) {
        if (err) {
          return cb(err);
        }
        if (decoded) {
          return cb(null, decoded[0]);
        }
      });
    } else {
      return cb("No auth header found");
    }
  }
};