export default (date) => {
  const moments = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 0 },
  ];
  let secondsTiming = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  secondsTiming = Math.max(0, secondsTiming);
  const intervals = moments.find((interval) => {
    return interval.seconds <= secondsTiming;
  });
  let count = Math.floor(secondsTiming / intervals.seconds);
  // eslint-disable-next-line no-restricted-globals
  count = isFinite(count) ? count : 0;
  let msg = `${count} ${intervals.label}${count !== 1 ? 's' : ''} ago`;
  // eslint-disable-next-line no-unused-expressions
  count === 0 ? msg = 'less than a min ago' : msg;
  return msg;
};
