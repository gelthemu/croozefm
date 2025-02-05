export const FormatDate = ({ date }: { date: string }) => {
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
