// color-utils.ts
export function ColorCircle(id: string): string {
  return (
    "#" +
    id
      .slice(-6)
      .match(/.{2}/g)!
      .map((hex) =>
        Math.min(parseInt(hex, 16), 140).toString(16).padStart(2, "0")
      )
      .join("")
  );
}
