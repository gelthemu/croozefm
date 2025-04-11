import React from "react";
import Image from "next/image";
import Link from "next/link";
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
import { RESOURCES, PROFILES } from "@/data/endpoints";
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
      .slice(
        0,
        100
      )}... CFM Pulse is the largest Crooze FM Fan Base. By CFM Fans, for Crooze FM Diehards.`,
    keywords: `cfm pulse, ${profile.keywords}, crooze fm team, western uganda's biggest radio station, crooze fm presenters, crooze fm djs, crooze fm radio team, cruz fm, cfm pulse, 91.2 crooze fm, crooze fm online, western uganda, crooze fm stream live, mbarara city, crooze fm mixtapes, african music`,
    openGraph: {
      url: `https://croozefm.geltaverse.com/i/${profile.id}`,
      images: [
        {
          url: `${RESOURCES}/on-air-2.png`,
          alt: "Western Uganda's Biggest Radio Station",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      images: [
        {
          url: `${RESOURCES}/on-air-2.png`,
          alt: "Western Uganda's Biggest Radio Station",
        },
      ],
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

  const getProfileGallery = (id: string, gallery: string[]) => {
    return gallery.map((img) => `${PROFILES}/${id}/${img}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-1">
      <div className="px-6 py-8 md:px-10 md:py-10 bg-gray/20 dark:bg-gray/50 rounded-sm shadow-xl z-0 border-y-2 border-red">
        <div className="pb-6 flex flex-col lg:flex-row lg:justify-between border-b border-gray/40 dark:border-light/20">
          <div>
            <h1 className="text-3xl pb-2.5 text-red _912cfm">{profile.name}</h1>
            <p className="text-sm font-medium opacity-[0.5]">
              {profile.showHosted}
            </p>
          </div>
          <SocialLinks links={profile.socialLinks} className="mt-5 lg:mt-2.5" />
        </div>
        <div className="prose prose-lg max-w-none mt-5 select-none">
          <div className="h-full w-full sm:w-[95%] md:max-w-[320px] lg:max-w-[280px] md:float-left profile-image mx-auto mb-6 md:mb-0 md:mr-6 shadow-md shadow-dark/80 dark:shadow-light/20 rounded-sm overflow-hidden">
            <Image
              src={`${PROFILES}/${profile.id}.webp`}
              alt={profile.name}
              width={2280}
              height={2784}
              priority={true}
              className="w-full h-full object-cover aspect-[570/696] _img_"
            />
          </div>
          <Markdown rehypePlugins={[rehypeRaw]} components={markdownComponents}>
            {profile.description}
          </Markdown>
        </div>
        <div>
          <p className="font-light text-sm italic opacity-60">
            {`"Profile: ${profile.name}," www.croozefm.com, paraphrased. S  ee our `}
            <Link
              href="/policies/legal-notice"
              className="underline hover:text-red"
            >
              Legal Notice
            </Link>
            {`.`}
          </p>
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
              gallery={getProfileGallery(profile.id, profile.gallery)}
              name={profile.name}
              code={profile.code}
            />
            <div>
              <p className="font-light text-sm italic opacity-60 mt-4">
                {`"Photos courtesy of ${profile.name}," via socials. See our `}
                <Link
                  href="/policies/legal-notice"
                  className="underline hover:text-red"
                >
                  Legal Notice
                </Link>
                {`.`}
              </p>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center justify-center lg:justify-end mx-auto mt-10">
        <ViewAllBtn href="/i/team" text="Meet The Entire Team" />
      </div>
      <Divider />
      <ImmediateRelease viewAll={true} />
    </div>
  );
}
