export function formatTimestamp(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;

  if (diff < day) {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "Africa/Kampala",
    }).format(new Date(timestamp));
  } else if (diff < 2 * day) {
    return `yesterday`;
  } else if (diff < week) {
    const daysAgo = Math.floor(diff / day);
    return `${daysAgo}d ago`;
  } else if (diff < 4 * week) {
    const weeksAgo = Math.floor(diff / week);
    return `${weeksAgo}wk ago`;
  } else {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Africa/Kampala",
    }).format(new Date(timestamp));
  }
}
