const fs = require('fs');
const Path = require('path');
const _ = require('lodash');
// eslint-disable-next-line no-unused-vars
const pkginfo = require('pkginfo')(module);
const faker = require('faker');

const { transports } = require('winston');

const logger = require('./lib/logger');
const myutil = require('./lib/util');
const configuration = require('./config');

const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Process the report submit, polling and save the results
 *
 * @param {*} options
 * @returns
 */
const main = async configOptions => {
  const loggingOptions = {
    label: 'main'
  };

  const options = configOptions || null;

  if (_.isNull(options)) {
    logger.error('Invalid configuration', loggingOptions);
    return false;
  }

  // Set logging to silly level for dev
  if (NODE_ENV.toUpperCase() === 'DEVELOPMENT') {
    logger.level = 'silly';
  } else {
    logger.level = options.debug.loggingLevel;
  }

  // Create logging folder if one does not exist
  if (!_.isNull(options.debug.logpath)) {
    if (!fs.existsSync(options.debug.logpath)) {
      myutil.makeFolder(options.debug.logpath);
    }
  }

  // Add logging to a file
  logger.add(
    new transports.File({
      filename: Path.join(options.debug.logpath, options.debug.logFile),
      options: {
        flags: 'w'
      }
    })
  );

  logger.info(`Start ${module.exports.name}`, loggingOptions);

  logger.debug(`Options: ${JSON.stringify(options)}`, loggingOptions);

  // Create output folder if one does not exist
  if (!_.isNull(options.output.path)) {
    if (!fs.existsSync(options.output.path)) {
      myutil.makeFolder(options.output.path);
      logger.info(`Created output directory ${options.output.path}`, loggingOptions);
    }
  }

  const data = JSON.parse(
    fs.readFileSync(Path.join(options.input.path, options.input.fileName), 'utf8')
  );

  // eslint-disable-next-line no-unused-vars
  const processed = _.map(data, (value, _key, _collection) => {
    const newObj = value;
    newObj.firstName = faker.name.firstName();
    newObj.lastName = faker.name.lastName();
    newObj.userId = `${newObj.firstName.toLowerCase()}.${newObj.lastName.toLowerCase()}`;
    newObj.emailAddress = `${newObj.userId.toLowerCase()}@customerexample.com`;
    return newObj;
  });

  fs.writeFileSync(
    Path.join(options.output.path, options.output.fileName),
    JSON.stringify(processed),
    'utf8'
  );

  return true;
};

main(configuration);
