const moment = require('moment');
require('moment/locale/fr');


const timestampToLocale = (timestamp) => moment(timestamp).format('LL');
const localeToDate = (date) => moment(date,["LL"]).format('YYYY-MM-DD');
const dateToLocale = (date) => moment(date, ["YYYY-MM-DD"]).format('LL');
const timeToLocale = (time) => moment(time, ["LTS"]).format('LT');
const dateNow = () => moment().format('LL');
const timeFormat = time => moment(time,['LT']).format();
const dateFormat = date => moment(date, ['LL']).format();


module.exports={timestampToLocale,localeToDate,timeToLocale, dateToLocale, dateNow,moment, timeFormat, dateFormat};