import "@/app/styles/globals.css";

export default function StreamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
