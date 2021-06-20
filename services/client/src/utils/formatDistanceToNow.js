import moment from 'moment';

const formatDistanceToNow = date => {
  try {
    const formattedDate = moment(date).fromNow();

    return formattedDate;
  } catch (e) {
    return date;
  }
};

export const formatTime = (created, updated, finished) => {
  const createdAt = formatDistanceToNow(created);
  const updatedAt = formatDistanceToNow(updated);

  let duration = null;
  try {
    duration = moment(finished).from(moment(created), true);

    if (!moment(finished).isValid() || !moment(created).isValid()) {
      duration = null;
    }
  } catch (e) {
    console.error(e);
  }

  return {
    createdAt,
    updatedAt,
    duration,
  };
};

export default formatDistanceToNow;
