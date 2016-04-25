var auth = require('../services/auth');

module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  auth.getUserFromToken(req, function(err, user){
    if(user && !err) {
      var hasRole = _.find(user.roles, function(r){
        return r == 'superadmin';
      });
      if (hasRole) {
        return next();
      }
    }


    // User is not allowed
    // (default res.forbidden() behavior can be overridden in `config/403.js`)
    return res.forbidden('You are not authorized to perform this action.');
  });

};