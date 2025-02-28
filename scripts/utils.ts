import fs from "fs";
import path from "path";

/**
 * Get registry dependencies for an item
 *
 * @param itemPath Path to the item directory
 * @param registryItemFilename Registry item filename
 * @returns Array of registry dependencies
 */
export async function getItemRegistryDependencies(
  itemPath: string,
  registryItemFilename: string
): Promise<string[]> {
  try {
    const registryItemPath = path.join(itemPath, registryItemFilename);

    if (!fs.existsSync(registryItemPath)) {
      return [];
    }

    const registryItem = JSON.parse(fs.readFileSync(registryItemPath, "utf8"));
    return registryItem.registryDependencies || [];
  } catch (error) {
    console.error("Error getting registry dependencies:", error);
    return [];
  }
}
