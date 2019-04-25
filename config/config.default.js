const config = require('./config.global');

config.customer = 'default';

config.debug.logFile = `app_${config.customer}.log`;
// No overrides - uses all settings in config.global.js

module.exports = config;
