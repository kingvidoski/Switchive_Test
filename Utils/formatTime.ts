export function formatDateTime(dateTimeString: string) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const suffixes = ['th', 'st', 'nd', 'rd'];

  const date = new Date(dateTimeString);

  // Get time
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const isPM = hours >= 12;
  hours = hours % 12 || 12; // Convert to 12-hour format
  const timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes}${
    isPM ? 'pm' : 'am'
  }`;

  // Get date
  const day = date.getDate();
  const daySuffix =
    day % 10 <= 3 && Math.floor(day / 10) !== 1
      ? suffixes[day % 10]
      : suffixes[0];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${timeString} - ${day}${daySuffix}, ${month} ${year}`;
}

export function formatDate(dateTimeString: string) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const date = new Date(dateTimeString);

  // Get date
  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${day} ${month}`;
}
