import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PresenterProfile } from "@/types/profile";

const profilesDirectory = path.join(process.cwd(), "src", "data", "profiles");

export function getAllProfileIds() {
  const fileNames = fs.readdirSync(profilesDirectory);

  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    return {
      profile: id,
    };
  });
}

export function getProfileData(id: string): PresenterProfile {
  const fullPath = path.join(profilesDirectory, `${id}.md`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(
      `Profile not found: ${id}. File does not exist at path: ${fullPath}`
    );
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const frontmatter = {
    id,
    name: matterResult.data.name,
    showHosted: matterResult.data["show-hosted"],
    imageLink: matterResult.data["image-link"],
    isPopular: matterResult.data.isPopular || false,
    socialLinks: {
      x: matterResult.data["social-links"]?.x,
      fb: matterResult.data["social-links"]?.fb,
      insta: matterResult.data["social-links"]?.insta,
    },
    gallery: Array.isArray(matterResult.data.gallery)
      ? matterResult.data.gallery
      : [],
  };

  return {
    ...frontmatter,
    description: matterResult.content,
  };
}

export function getAllProfiles(): PresenterProfile[] {
  const fileNames = fs.readdirSync(profilesDirectory);

  const allProfilesData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    return getProfileData(id);
  });

  return allProfilesData;
}

export function getPopularProfiles(): PresenterProfile[] {
  const allProfiles = getAllProfiles();
  return allProfiles.filter((profile) => profile.isPopular);
}
