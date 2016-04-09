//require the logger
var logger = require('./requestLogger');
module.exports.http = {

  middleware: {

    order: [
      'startRequestTimer',
      'cookieParser',
      'session',
      //add a custom logging function
      'requestLogger',
      'bodyParser',
      'handleBodyParserError',
      'compress',
      'methodOverride',
      'poweredBy',
      '$custom',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ],

    //define the custom logging function you referenced in the above order
    requestLogger: logger.requestLogger

  }
};