
module.exports = {
	requestLogger: function(req, res, next) {
	  res.on('finish', function(){
			//don't log requests to the request log service
			if (req.originalUrl.indexOf('requestlog') > -1) {
				return next();
			}
			//scrub any sensitive data here - we don't want anyone's password to wind up in the database unencrypted
			if (req.body) {
				req.body.password = "****";
			}

			//remove cookie from header before storing
			if (req.headers) {
				delete req.headers.cookie;
			}
	    RequestLog.create({
	      requestUrl: req.originalUrl,
	      requestMethod: req.method,
	      requestHeaders: req.headers,
	      requestBody: req.body,
				responseTime: new Date() - req._startTime
	    }, function(err, log){
	      sails.log.verbose("Request Logged:", JSON.stringify(log));
	    });
	  });
	  
	  return next();
	}
};
