import React from "react";
import { PageHeading } from "@/app/components/providers/divs/page-heading";
import ImgDiv from "@/app/components/providers/divs/image-div";
import TestBtn from "./components/test-comonent";

export default function ContactPage() {
  return (
    <div className="w-full max-w-4xl mx-auto p-1">
      <PageHeading heading="TEST" text="Mentions & Hashtags!" />
      <TestBtn />
      <ImgDiv url="https://cfmpulse-fxavapfdeybedqdt.z01.azurefd.net/assets/default.png" />
    </div>
  );
}
