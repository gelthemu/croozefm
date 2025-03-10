import React from "react";
import { PageHeading } from "@/app/components/providers/divs/page-heading";
import ImgDiv from "@/app/components/providers/divs/image-div";
import ContactForm from "./components/contact-form";
import SocialMedia from "./components/social-media";
import ContactInfo from "./components/contact-info";
import MapSection from "./components/map-section";
import Divider from "@/app/components/providers/divs/divider";

export const metadata = {
  title: "Get In Touch",
  description:
    "Any questions about Crooze FM, get in touch today! Studio lines are always open, call in and say Hi. Email replies faster...",
  keywords:
    "91.2 Crooze FM, Great Music Great Friends, Western Uganda, Contacts, Studio lines, Crooze fm email, Crooze fm stream live, Crooze FM",
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
