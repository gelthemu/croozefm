import "@/app/styles/globals.css";

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
