import { Metadata } from "next";
import NotFoundPage from "./components/providers/divs/404-error";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <NotFoundPage
      title="Page"
      text="The page you're trying to find is not available. The page may have been deleted or the URL provided might be incorrect."
      link={{
        url: "/home",
        text: "Stream Live Radio here",
      }}
    />
  );
}
