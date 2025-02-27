const FormatDate = ({ date }: { date: string }) => {
  const now = new Date();
  const aired = new Date(date);

  const timeDifference = now.getTime() - aired.getTime();
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (minutesDifference < 60) {
    if (minutesDifference < 1) return "Now";
    return `${minutesDifference}m ago`;
  } else if (hoursDifference < 24) {
    return `${hoursDifference}h ago`;
  } else if (daysDifference < 8) {
    return `${daysDifference}d ago`;
  } else if (now.getFullYear() === aired.getFullYear()) {
    return `${aired.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    })}`;
  } else {
    return `${aired.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  }
};

const FormatEpochDate = ({epoch}:{epoch: number}) => {
  const date = new Date(epoch * 1000); // Multiply by 1000 to convert seconds to milliseconds
  const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export {FormatDate, FormatEpochDate};
