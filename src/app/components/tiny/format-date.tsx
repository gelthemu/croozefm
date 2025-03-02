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
    return `${minutesDifference}m ago`;
  } else if (hoursDifference < 24) {
    return `${hoursDifference}h ago`;
  } else if (daysDifference < 10) {
    return `${daysDifference}d ago`;
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
}) => {
  let dateObj: Date;

  if (epoch !== undefined) {
    dateObj = new Date(epoch * 1000);
  } else if (date) {
    dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return;
  } else {
    return;
  }

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();

  return `${day}.${month}.${year}`;
};

export { FormatDate, FormatSimpleDate };
