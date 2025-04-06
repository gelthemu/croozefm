import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PolicyMetadata } from "@/types/policy";

const policiesDirectory = path.join(process.cwd(), "src", "data", "policies");

export function getAllPolicyIds() {
  try {
    const fileNames = fs.readdirSync(policiesDirectory);

    return fileNames.map((fileName) => {
      const id = fileName.replace(/\.md$/, "");

      return {
        policy: id,
      };
    });
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export function getPolicyData(id: string): PolicyMetadata | null {
  const fullPath = path.join(policiesDirectory, `${id}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    let daysPassed = "";
    if (matterResult.data.last_update) {
      const dateString = matterResult.data.last_update;
      daysPassed = calculateDaysPassed(dateString);
    }

    const frontmatter = {
      id,
      title: matterResult.data.title,
      last_update: daysPassed,
    };

    return {
      ...frontmatter,
      content: matterResult.content,
    };
  } catch (error) {
    console.error(`Error:`, error);
    return null;
  }
}

export function getAllPolicies(): PolicyMetadata[] {
  try {
    const fileNames = fs.readdirSync(policiesDirectory);

    const allPoliciesData = fileNames
      .map((fileName) => {
        const id = fileName.replace(/\.md$/, "");
        return getPolicyData(id);
      })
      .filter((policy): policy is PolicyMetadata => policy !== null);

    return allPoliciesData;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export function calculateDaysPassed(dateString: string): string {
  if (!dateString) return "";

  const givenDate = new Date(dateString);
  const today = new Date();

  givenDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - givenDate.getTime();

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays.toString();
}

export function formatDate(dateString: string): string {
  return calculateDaysPassed(dateString);
}

export const policies = getAllPolicies();
