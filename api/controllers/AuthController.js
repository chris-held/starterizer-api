/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var auth = require('../services/auth');

module.exports = {
  login: function (req, res) {
    auth.login(req, res);
  },
  logout: function(req, res){
    req.logout();
    res.send(200);
  },
  me: function(req, res) {
    auth.getUserFromToken(req, function(err, result){
      if (err) {
        return res.serverError(err);
      } else {
        return res.json(result);
      }
    });
  }
};
