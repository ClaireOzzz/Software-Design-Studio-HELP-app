
// TIME FUNCTION (HOW LONG AGO)
export const timeFrom = (date) => {

  let sec = Math.floor((new Date() - date) / 1000);
  let interval = sec / 31536000;

  interval = sec / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }

  interval = sec / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }

  interval = sec / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }

  interval = sec / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }

  return Math.floor(sec) + " seconds ago";
}