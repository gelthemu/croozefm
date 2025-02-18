import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import BackBtn from "@/app/components/tiny/backbtn";
import ViewAllBtn from "@/app/components/tiny/viewallbtn";
import { getAllProfileIds, getProfileData } from "@/lib/profiles";
import SocialLinks from "../team/components/socials";
import { Metadata } from "next";
import "@/app/styles/md/profile.css";

interface ProfilePageProps {
  params: {
    profile: string;
  };
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const profile = await getProfileData(params.profile);

  if (!profile) {
    return {
      title: "Profile Not Found",
      description: "The profile you are looking for does not exist.",
    };
  }

  return {
    title: `${profile.name} - 91.2 Crooze FM`,
    description: `${profile.description.replace(
      /\s+/g,
      " "
    )} We are Western Uganda's Biggest Radio Station!!!`,
    openGraph: {
      title: `${profile.name} - 91.2 Crooze FM`,
      description: `${profile.description.replace(
        /\s+/g,
        " "
      )} We are Western Uganda's Biggest Radio Station!!!`,
      type: "website",
      url: `https://croozefm.geltaverse.com/i/${profile.id}`,
      images: [profile.imageLink],
    },
    twitter: {
      title: `${profile.name} - 91.2 Crooze FM`,
      description: `${profile.description.replace(
        /\s+/g,
        " "
      )} We are Western Uganda's Biggest Radio Station!!!`,
      card: "summary_large_image",
      site: "@geltaverse",
      creator: "@geltaverse",
      images: [profile.imageLink],
    },
    alternates: {
      canonical: `https://croozefm.geltaverse.com/i/${profile.id}`,
      languages: {
        "en-US": "/c/en-US",
      },
    },
  };
}

export async function generateStaticParams() {
  const profiles = await getAllProfileIds();
  return profiles.map((profile) => ({
    params: { profile },
  }));
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const profile = await getProfileData(params.profile);

  if (!profile) {
    return notFound();
  }

  return (
    <div className="w-full max-w-screen-lg mx-auto min-h-screen px-4 py-10 overflow-hidden">
      <div className="mb-8">
        <BackBtn />
      </div>

      <div className="w-full overflow-hidden relative">
        <div className="w-full sm:w-[90%] mx-auto lg:flex">
          <div className="relative h-full w-[90%] sm:w-[75%] md:w-[70%] mx-auto lg:mx-0 -mb-20 lg:-mb-0 lg:-mr-20 lg:mt-20 z-10 lg:w-[50%]">
            <Image
              src={profile.imageLink}
              alt={profile.name}
              width={2280}
              height={2784}
              priority={true}
              className="w-full h-full object-cover aspect-[570/696] rounded-sm _img_"
            />
          </div>

          <div className="lg:w-full p-6 pt-24 lg:p-10 lg:pl-24 bg-gray/20 dark:bg-gray/50 rounded-sm shadow-xl z-0">
            <div className="pb-6 flex flex-col lg:flex-row lg:justify-between border-b border-gray/40 dark:border-light/20">
              <div>
                <h1 className="text-3xl pb-2.5 text-red _912cfm">
                  {profile.name}
                </h1>
                <p className="text-sm font-light">{profile.showHosted}</p>
              </div>
              <SocialLinks
                links={profile.socialLinks}
                className="mt-5 lg:mt-2.5"
              />
            </div>

            <div className="prose prose-lg max-w-none mt-5">
              <Markdown>{profile.description}</Markdown>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center lg:justify-end mx-auto mt-10 lg:mr-10 px-6 py-2">
        <ViewAllBtn href="/i/team" text="View The Entire Team" />
      </div>
    </div>
  );
}
