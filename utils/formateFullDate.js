export default function formateFullDate(date) {
  date.setHours(date.getHours() + (new Date().getTimezoneOffset() * -1) / 60);

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone,
  };

  const formattedDate = date.toLocaleString(undefined, options);

  return formattedDate;
}
