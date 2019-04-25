const fs = require('fs');
const moment = require('moment');

/**
 * Create the specified folder path
 *
 * @param {*} fullPath
 */
const makeFolder = fullPath => {
  const path = fullPath.replace(/\/$/, '').split('/');
  for (let i = 1; i <= path.length; i += 1) {
    const segment = path.slice(0, i).join('/');
    if (!fs.existsSync(segment)) {
      fs.mkdirSync(segment);
    }
  }
};

/**
 * Return a formatted string
 *
 * @param {*} bytes
 * @returns string
 */
const bytesToSize = bytes => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return `${Math.round(bytes / 1024 ** i, 2)} ${sizes[i]}`;
};

/**
 * Returns the ISO8601 start date for the specified timeFrame
 *
 * @param {*} timeFrame
 * @returns
 */
const getStartDate = (timeFrame, input = null) => {
  const theMoment = input ? moment(input).utc() : moment().utc();

  switch (timeFrame) {
    case 'DAY':
      return theMoment
        .subtract(24, 'hours')
        .utc()
        .format();
    case 'WEEK':
      return theMoment
        .subtract(7, 'days')
        .utc()
        .format();
    case 'THIRTY_DAYS':
      return theMoment
        .subtract(30, 'days')
        .utc()
        .format();
    case 'CALENDAR_MONTH':
      return theMoment
        .subtract(1, 'months')
        .startOf('month')
        .utc()
        .format();
    default:
      return '';
  }
};

/**
 * Returns the ISO8601 end date for the specified timeFrame
 *
 * @param {*} timeFrame
 * @returns
 */
const getEndDate = (timeFrame, input = null) => {
  const theMoment = input ? moment(input).utc() : moment().utc();

  switch (timeFrame) {
    case 'DAY':
    case 'WEEK':
    case 'THIRTY_DAYS':
      return theMoment.utc().format();
    case 'CALENDAR_MONTH':
      return theMoment
        .add(-1, 'months')
        .endOf('month')
        .endOf('day')
        .utc()
        .format();
    default:
      return '';
  }
};

module.exports = {
  makeFolder,
  bytesToSize,
  getStartDate,
  getEndDate
};
