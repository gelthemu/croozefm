import React from "react";
import { PageHeading } from "@/app/components/providers/divs/page-heading";
import ImgDiv from "@/app/components/providers/divs/image-div";
import { RESOURCES } from "@/data/endpoints";
import { TestBtn } from "./components/test";
import Divider from "@/app/components/providers/divs/divider";
import { SuggestionBtn } from "./components/test";
import { AutoExpandingInput } from "./components/test";

export default function TestPage() {
  return (
    <div className="w-full max-w-4xl mx-auto p-1">
      <PageHeading heading="TEST" text="User SUGGESTION Form!.." />
      <div className="flex flex-row items-center my-10">
        <TestBtn />
        <SuggestionBtn />
      </div>
      <Divider />
      <AutoExpandingInput />
      <Divider />
      <ImgDiv url={`${RESOURCES}/default.png`} />
    </div>
  );
}
