const moment = require('moment');

const config = {};

// Indicates a name for the configuration
config.customer = 'none';
config.startTimestamp = moment()
  .utc()
  .format('YYYYMMDD_HHmmss');

// DEBUG Options - Enables the check for Fiddler, if running the traffic is routed thru Fiddler
config.debug = {};
// Debug logging
// One of the supported default logging levels for winston - see https://github.com/winstonjs/winston#logging-levels
config.debug.loggingLevel = 'info';
config.debug.logpath = 'output';
config.debug.logFile = `app_${config.customer}.log`;

// Output
config.input = {};
// Path to open data
config.input.path = 'input';
// File name for the data
config.input.fileName = 'input.json';

// Output
config.output = {};
// Path to save data
config.output.path = 'output';
// File name for the data
config.output.fileName = 'output.json';

module.exports = config;
