import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PolicyMetadata } from "@/types/policy";

const policiesDirectory = path.join(process.cwd(), "src", "data", "policies");

export function getAllPolicyIds() {
  try {
    const fileNames = fs.readdirSync(policiesDirectory);

    return fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => fileName.replace(/\.md$/, ""));
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function getPolicyData(
  id: string
): Promise<PolicyMetadata | null> {
  if (!id) return null;

  const fullPath = path.join(policiesDirectory, `${id}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    let daysPassed = "";
    if (matterResult.data.last_update || matterResult.data.last_updated) {
      const dateString =
        matterResult.data.last_update || matterResult.data.last_updated;
      daysPassed = calculateDaysPassed(dateString);
    }

    return {
      id,
      title:
        matterResult.data.title ||
        id.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      last_update: daysPassed,
      content: matterResult.content,
    };
  } catch (error) {
    console.error(`Error:`, error);
    return null;
  }
}

export async function getAllPolicies(): Promise<PolicyMetadata[]> {
  try {
    const policyIds = getAllPolicyIds();

    const allPoliciesData = await Promise.all(
      policyIds.map(async (id) => {
        return await getPolicyData(id);
      })
    );

    return allPoliciesData
      .filter((policy): policy is PolicyMetadata => policy !== null)
      .sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export function policyExists(id: string): boolean {
  if (!id) return false;
  const fullPath = path.join(policiesDirectory, `${id}.md`);
  return fs.existsSync(fullPath);
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
