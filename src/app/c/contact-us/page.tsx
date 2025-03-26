import React from "react";
import { PageHeading } from "@/app/components/providers/divs/page-heading";
import ImgDiv from "@/app/components/providers/divs/image-div";
import ContactForm from "./components/contact-form";
import SocialMedia from "./components/social-media";
import ContactInfo from "./components/contact-info";
import MapSection from "./components/map-section";
import Divider from "@/app/components/providers/divs/divider";
import WeatherWidget from "@/app/components/providers/weather-widget";

export const metadata = {
  title: "Get In Touch",
  description:
    "Any questions about Crooze FM, get in touch today! Studio lines are always open, call in and say Hi. Email replies faster...",
  keywords:
    "91.2 Crooze FM, Great Music Great Friends, Western Uganda, Contacts, Studio lines, Crooze fm email, Crooze fm stream live, Crooze FM",

  openGraph: {
    title: "Get In Touch",
    description:
      "Any questions about Crooze FM, get in touch today! Studio lines are always open, call in and say Hi. Email replies faster...",
    url: "https://croozefm.geltaverse.com/c/contact-us",
    type: "website",
    images: [
      {
        url: "https://croozefm.blob.core.windows.net/images/default.png",
        alt: "Home of Western Uganda's Biggest Radio Station. Great Music, Great Friends.",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    title: "Home",
    description:
      "Any questions about Crooze FM, get in touch today! Studio lines are always open, call in and say Hi. Email replies faster...",
    card: "summary_large_image",
    site: "@geltaverse",
    creator: "@geltaverse",
    images: [
      {
        url: "https://croozefm.blob.core.windows.net/images/default.png",
        alt: "Home of Western Uganda's Biggest Radio Station. Great Music, Great Friends.",
      },
    ],
  },

  alternates: {
    canonical: "https://croozefm.geltaverse.com/c/contact-us",
  },
};

export default function ContactPage() {
  return (
    <div className="w-full max-w-4xl mx-auto p-1">
      <PageHeading
        heading="Get In Touch"
        text="Any questions, we are available!"
      />
      <WeatherWidget className="mt-6 mx-auto" />
      <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-4">
        <ContactForm />
        <MapSection />
      </div>
      <Divider />
      <SocialMedia />
      <Divider />
      <ContactInfo />
      <Divider />
      <ImgDiv
        url="https://croozefm.blob.core.windows.net/images/default.png"
        alt="Get it touch!"
        className="w-full md:w-5/6 mx-auto"
        text="Get In Touch!"
      />
    </div>
  );
}
