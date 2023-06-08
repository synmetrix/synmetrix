import moment from 'moment';

export default (timestamp) => {
  return moment(timestamp).format('YYYY-MM-DD HH:mm:ss.SSS');
};