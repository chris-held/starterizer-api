/**
 * ReportController
 *
 * @description :: Server-side logic for managing reports
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var auth = require('../services/auth');

module.exports = {
  users: function(req, res) {
    User.count().exec(function(err, count){
      if (err) {
        return res.serverError(err);
      }
      return res.json({count: count});
    });
  }
};
