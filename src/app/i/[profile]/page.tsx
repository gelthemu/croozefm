import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import ViewAllBtn from "@/app/components/tiny/viewallbtn";
import { getAllProfileIds, getProfileData } from "@/lib/profiles";
import SocialLinks from "../team/components/socials";
import { Metadata } from "next";
import ProfileGallery from "../team/components/gallery";
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

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ profile: string }>;
}) {
  const profile = await getProfileData((await params).profile);

  if (!profile) {
    return notFound();
  }

  return (
    <div className="w-full max-w-screen-lg mx-auto min-h-screen px-4 py-10 overflow-hidden">
      <div className="w-full overflow-hidden">
        <div className="w-full sm:w-[90%] mx-auto flex flex-col lg:flex-row">
          <div className="h-full w-[90%] profile-image sm:w-[75%] md:w-[70%] mx-auto lg:mx-0 -mb-20 lg:-mb-0 lg:-mr-20 lg:mt-20 z-10 lg:w-[50%] shadow-lg shadow-dark/80 dark:shadow-light/20">
            <Image
              src={profile.imageLink}
              alt={profile.name}
              width={2280}
              height={2784}
              priority={true}
              className="w-full h-full object-cover aspect-[570/696] rounded-sm grayscale-[0.75] _img_"
            />
          </div>

          <div className="lg:w-full p-6 pt-32 lg:p-10 lg:pl-24 bg-gray/20 dark:bg-gray/50 rounded-sm shadow-xl z-0">
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
              <Markdown
                components={{
                  a: ({ href, children }) =>
                    href?.startsWith("/") ? (
                      <Link href={href}>{children}</Link>
                    ) : (
                      <a
                        href={href ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                }}
              >
                {profile.description}
              </Markdown>
            </div>

            <ProfileGallery gallery={profile.gallery} name={profile.name} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center lg:justify-end mx-auto mt-10 lg:mr-10 px-6 py-2">
        <ViewAllBtn href="/i/team" text="Meet The Entire Team" />
      </div>
    </div>
  );
}
