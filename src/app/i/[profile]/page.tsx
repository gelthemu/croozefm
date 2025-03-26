import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import ViewAllBtn from "@/app/components/tiny/viewallbtn";
import { getAllProfileIds, getProfileData } from "@/lib/profiles-parser";
import SocialLinks from "../team/components/profile/socials";
import { Metadata } from "next";
import { markdownComponents } from "../team/components/profile/markdown-components";
import ProfileGallery from "../team/components/profile/gallery/gallery";
import Divider from "@/app/components/providers/divs/divider";
import ImmediateRelease from "@/app/components/announcement/for-immediate-release";
import LatestMixtapeFeed from "@/app/c/mixtapes/components/latest-mixtape-feed";
import "@/app/styles/md/profile.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ profile: string }>;
}): Promise<Metadata> {
  const profile = await getProfileData((await params).profile);

  if (!profile) {
    return {
      title: "Profile Not Found",
    };
  }

  return {
    title: `${profile.name}`,
    description: `${profile.description
      .replace(/\s+/g, " ")
      .slice(0, 180)}... We are Western Uganda's Biggest Radio Station!!!`,
    keywords: `91.2 Crooze Fm, ${profile.keywords}, Crooze fm team, Western Uganda's Biggest Radio Station, Crooze fm radio, Crooze fm presenters, Crooze fm radio hosts, Crooze fm staff, Crooze fm djs, Crooze fm radio team, Crooze fm on-air talent`,
    openGraph: {
      title: `${profile.name}`,
      description: `${profile.description
        .replace(/\s+/g, " ")
        .slice(0, 180)}... We are Western Uganda's Biggest Radio Station!!!`,
      type: "website",
      url: `https://croozefm.geltaverse.com/i/${profile.id}`,
      images: [
        {
          url: `https://croozefm.blob.core.windows.net/cards/${profile.id}.png`,
          alt: `${profile.name}, radio host at 91.2 Crooze FM, Western Uganda's Biggest Radio Station`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      title: `${profile.name}`,
      description: `${profile.description
        .replace(/\s+/g, " ")
        .slice(0, 180)}... We are Western Uganda's Biggest Radio Station!!!`,
      card: "summary_large_image",
      site: "@geltaverse",
      creator: "@geltaverse",
      images: [
        {
          url: `https://croozefm.blob.core.windows.net/cards/${profile.id}.png`,
          alt: `${profile.name}, radio host at 91.2 Crooze FM, Western Uganda's Biggest Radio Station`,
        },
      ],
    },
    alternates: {
      canonical: `https://croozefm.geltaverse.com/i/${profile.id}`,
    },
  };
}

export async function generateStaticParams() {
  const profiles = await getAllProfileIds();
  return profiles.map((profile) => ({
    params: { profile },
  }));
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ profile: string }>;
}) {
  const profile = await getProfileData((await params).profile);

  if (!profile || profile === null) {
    return notFound();
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-1">
      <div className="relative flex flex-col lg:flex-row">
        <div className="relative h-full w-[90%] profile-image sm:w-[75%] md:w-[70%] mx-auto lg:mx-0 -mb-20 lg:-mb-0 lg:-mr-20 lg:mt-20 z-10 lg:w-[50%] shadow-lg shadow-dark/80 dark:shadow-light/20 rounded-md overflow-hidden">
          <Image
            src={profile.imageLink}
            alt={profile.name}
            width={2280}
            height={2784}
            priority={true}
            className="w-full h-full object-cover aspect-[570/696] grayscale-[0.75] _img_"
          />
          <div className="w-full absolute bottom-0 left-0 z-[0] flex items-center justify-center overflow-hidden">
            <div className="font-light text-light/20 uppercase text-sm md:text-xs">
              {profile.name.replace(/\s+/g, "").repeat(10)}
            </div>
          </div>
        </div>

        <div className="lg:w-full p-6 pt-32 lg:p-10 lg:pl-24 bg-gray/20 dark:bg-gray/50 rounded-md shadow-xl z-0 border-y-4 border-red">
          <div className="pb-6 flex flex-col lg:flex-row lg:justify-between border-b border-gray/40 dark:border-light/20">
            <div>
              <h1 className="text-3xl pb-2.5 text-red _912cfm">
                {profile.name}
              </h1>
              <p className="text-sm font-medium opacity-[0.5]">
                {profile.showHosted}
              </p>
            </div>
            <SocialLinks
              links={profile.socialLinks}
              className="mt-5 lg:mt-2.5"
            />
          </div>

          <div className="prose prose-lg max-w-none mt-5 select-none">
            <Markdown
              rehypePlugins={[rehypeRaw]}
              components={markdownComponents}
            >
              {profile.description}
            </Markdown>
          </div>
          {profile.mixtapeCode && (
            <>
              <Divider />
              <LatestMixtapeFeed code={profile.mixtapeCode} />
            </>
          )}
          {profile.gallery && (
            <>
              <Divider />
              <ProfileGallery
                gallery={profile.gallery}
                name={profile.name}
                code={profile.code}
              />
            </>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center lg:justify-end mx-auto mt-10">
        <ViewAllBtn href="/i/team" text="Meet The Entire Team" />
      </div>
      <Divider />
      <ImmediateRelease viewAll={true} />
    </div>
  );
}
