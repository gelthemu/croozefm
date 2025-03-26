import "@/app/styles/globals.css";

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
