// utils/readingTime.ts

/**
 * Calculates estimated reading time for text content
 * @param content - The text content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200 words per minute)
 * @returns Object with minutes, seconds and formatted reading time
 */
export function calculateReadingTime(content: string, wordsPerMinute = 200) {
    // Remove HTML tags if present
    const text = content.replace(/<\/?[^>]+(>|$)/g, "");

    // Count words by splitting on whitespace
    const words = text.trim().split(/\s+/).length;

    // Calculate reading time in minutes and seconds
    const minutes = Math.floor(words / wordsPerMinute);
    const seconds = Math.floor((words % wordsPerMinute) / (wordsPerMinute / 60));

    // Format the reading time
    let readingTime = "";
    if (minutes > 0) {
      readingTime += `${minutes} min`;
      if (seconds > 0) readingTime += ` ${seconds} sec`;
    } else {
      readingTime = `${seconds} sec`;
    }

    return {
      minutes,
      seconds,
      readingTime
    };
  }