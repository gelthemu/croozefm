import "@/app/styles/globals.css";

export default function ShowsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
