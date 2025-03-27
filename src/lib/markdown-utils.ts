export function splitMarkdownContent(content: string): [string, string] {
  const paragraphs = content.split(/\n\s*\n/).filter((p) => p.trim() !== "");

  if (paragraphs.length <= 1) {
    return [content, ""];
  }

  const midpoint = Math.floor(paragraphs.length / 2);

  const firstHalf = paragraphs.slice(0, midpoint).join("\n\n");
  const secondHalf = paragraphs.slice(midpoint).join("\n\n");

  return [firstHalf, secondHalf];
}
