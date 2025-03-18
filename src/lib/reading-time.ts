/**
 * Calculates estimated reading time for text content
 * @param content - The text content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200 words per minute)
 * @returns Object with minutes, seconds and formatted reading time
 */

export function calculateReadingTime(content: string, wordsPerMinute = 200) {
  const text = content.replace(/<\/?[^>]+(>|$)/g, "");
  const words = text.trim().split(/\s+/).length;

  const minutes = Math.floor(words / wordsPerMinute);
  const seconds = Math.floor((words % wordsPerMinute) / (wordsPerMinute / 60));

  let readingTime = "";
  if (minutes > 0) {
    readingTime += `${minutes}m`;
    if (seconds > 0) readingTime += ` ${seconds}s`;
  } else {
    readingTime = `${seconds}s`;
  }

  return {
    minutes,
    seconds,
    readingTime,
  };
}
