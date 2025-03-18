import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PresenterProfile } from "@/types/profile";

const profilesDirectory = path.join(process.cwd(), "src", "data", "profiles");

export function getAllProfileIds() {
  try {
    const fileNames = fs.readdirSync(profilesDirectory);

    return fileNames.map((fileName) => {
      const id = fileName.replace(/\.md$/, "");

      return {
        profile: id,
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function getProfileData(id: string): PresenterProfile | null {
  const fullPath = path.join(profilesDirectory, `${id}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    const frontmatter = {
      id,
      name: matterResult.data.name || "",
      showHosted: matterResult.data["show-hosted"] || "",
      imageLink: matterResult.data["image-link"] || "",
      isPopular: matterResult.data.isPopular || false,
      socialLinks: {
        x: matterResult.data["social-links"]?.x || "",
        fb: matterResult.data["social-links"]?.fb || "",
        insta: matterResult.data["social-links"]?.insta || "",
      },
      gallery: Array.isArray(matterResult.data.gallery)
        ? matterResult.data.gallery
        : null,
      code: matterResult.data.code || "",
      mixtapeCode: matterResult.data["mixtape-code"] || "",
      keywords: matterResult.data.keywords || "",
    };

    return {
      ...frontmatter,
      description: matterResult.content,
    };
  } catch (error) {
    console.error(`Error reading profile data for ${id}:`, error);
    return null;
  }
}

export function getAllProfiles(): PresenterProfile[] {
  try {
    const fileNames = fs.readdirSync(profilesDirectory);

    const allProfilesData = fileNames
      .map((fileName) => {
        const id = fileName.replace(/\.md$/, "");
        return getProfileData(id);
      })
      .filter((profile): profile is PresenterProfile => profile !== null);

    return allProfilesData;
  } catch (error) {
    console.error("Error getting all profiles:", error);
    return [];
  }
}

export function getPopularProfiles(): PresenterProfile[] {
  try {
    const allProfiles = getAllProfiles();
    return allProfiles.filter((profile) => profile.isPopular);
  } catch (error) {
    console.error("Error getting popular profiles:", error);
    return [];
  }
}
