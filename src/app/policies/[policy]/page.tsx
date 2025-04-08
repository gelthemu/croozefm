import React from "react";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { getAllPolicyIds, getPolicyData } from "@/lib/policy-parser";
import { Metadata } from "next";
import { PolicyContent } from "../components/policy-content";
import ImgDiv from "@/app/components/providers/divs/image-div";
import "@/app/styles/md/policy.css";
import { RESOURCES } from "@/data/endpoints";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ policy: string }>;
}): Promise<Metadata> {
  const policy = await getPolicyData((await params).policy);

  if (!policy) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: `${policy.title}`,
    alternates: {
      canonical: `https://croozefm.geltaverse.com/policies/${policy.id}`,
    },
  };
}

export async function generateStaticParams() {
  const policies = await getAllPolicyIds();
  return policies.map((policy) => ({
    params: { policy },
  }));
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ policy: string }>;
}) {
  const policy = await getPolicyData((await params).policy);

  if (!policy || policy === null) {
    return notFound();
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-1">
      <div className="relative z-0">
        <div className="py-4 mb-10 flex flex-col border-b border-gray/40 dark:border-light/20">
          <div>
            <h1 className="text-3xl pb-4 text-red _912cfm">{policy.title}</h1>
          </div>
          {policy.last_update && (
            <div className="text-sm italic opacity-60 mt-2 lg:mt-0">
              Last updated: {policy.last_update} days ago
            </div>
          )}
        </div>
        <ImgDiv url={`${RESOURCES}/default.png`} />
        <div className="prose prose-lg max-w-none mt-5 select-none">
          <Markdown rehypePlugins={[rehypeRaw]} components={PolicyContent}>
            {policy.content}
          </Markdown>
        </div>
        <div>
          <p className="font-light text-sm italic opacity-60 mt-8">
            By CFM Fans, for CFM Diehards
          </p>
        </div>
      </div>
    </div>
  );
}
