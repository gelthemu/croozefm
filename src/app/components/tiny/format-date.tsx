const FormatDate = ({ date }: { date: string }) => {
  const now = new Date();
  const aired = new Date(date);

  const timeDifference = now.getTime() - aired.getTime();
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const day = String(aired.getDate()).padStart(2, "0");
  const month = String(aired.getMonth() + 1).padStart(2, "0");
  const year = aired.getFullYear();

  if (minutesDifference < 60) {
    if (minutesDifference < 1) return "Now";
    return `${minutesDifference}m`;
  } else if (hoursDifference < 24) {
    return `${hoursDifference}h`;
  } else if (daysDifference < 10) {
    return `${daysDifference}d`;
  } else {
    return `${day}.${month}.${year}`;
  }
};

const FormatSimpleDate = ({
  date,
  epoch,
}: {
  date?: string;
  epoch?: number;
}): string => {
  let dateObj: Date;

  if (epoch !== undefined) {
    dateObj = new Date(epoch * 1000);
  } else if (date) {
    dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return "Invalid Date";
  } else {
    return "No Date Provided";
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 1) return "Now";
  if (diffInSeconds < 60) return `${Math.floor(diffInSeconds)}s`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 2) return `${diffInDays}d`;

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();

  return `${day}.${month}.${year}`;
};

export { FormatDate, FormatSimpleDate };
