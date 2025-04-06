import React from "react";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {
  getAllPolicyIds,
  getPolicyData,
  policyExists,
} from "@/lib/policy-parser";
import { Metadata } from "next";
import { PolicyContent } from "../components/policy-content";
import ImgDiv from "@/app/components/providers/divs/image-div";
import "@/app/styles/md/policy.css";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const policy = await getPolicyData(params.slug);

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
  const policyIds = getAllPolicyIds();
  return policyIds.map((id) => ({
    slug: id,
  }));
}

export default async function PolicyPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!policyExists(params.slug)) {
    return notFound();
  }

  const policy = await getPolicyData(params.slug);

  if (!policy) {
    return notFound();
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-1">
      <div className="relative p-6 bg-gray/20 dark:bg-gray/50 rounded-sm shadow-xl z-0 border-y-2 border-red">
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
        <ImgDiv url="https://cfmpulse-fxavapfdeybedqdt.z01.azurefd.net/assets/default.png" />
        <div className="prose prose-lg max-w-none mt-5 select-none">
          <Markdown rehypePlugins={[rehypeRaw]} components={PolicyContent}>
            {policy.content}
          </Markdown>
        </div>
      </div>
    </div>
  );
}
