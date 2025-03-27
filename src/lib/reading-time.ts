export function calculateReadingTime(content: string, wordsPerMinute = 200) {
  const text = content.replace(/<\/?[^>]+(>|$)/g, "");
  const words = text.trim().split(/\s+/).length;

  const totalMinutes = Math.ceil(words / wordsPerMinute);

  const readingTime = `${totalMinutes}m`;

  return {
    minutes: totalMinutes,

    seconds: 0,
    readingTime,
  };
}
