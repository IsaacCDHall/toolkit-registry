import path from "path";
import fs from "fs";
import { getItemRegistryDependencies } from "./utils";

interface RegistryFile {
  path: string;
  type: string;
  target?: string;
}

interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
}

interface Registry {
  name: string;
  homepage: string;
  items: RegistryItem[];
}

const cwd = process.cwd();
const registryPath = path.join(cwd, "registry.json");
const publicPath = path.join(cwd, "public");
const registryPublicPath = path.join(publicPath, "r");

async function build() {
  try {
    // Read registry.json
    if (!fs.existsSync(registryPath)) {
      throw new Error("registry.json not found");
    }

    // Create public/r directory
    if (!fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath, { recursive: true });
    }

    if (!fs.existsSync(registryPublicPath)) {
      fs.mkdirSync(registryPublicPath, { recursive: true });
    }

    // Read the registry.json
    const registry = JSON.parse(
      fs.readFileSync(registryPath, "utf8")
    ) as Registry;

    // Process each item in the registry
    const itemsPromises = registry.items.map(async (item: RegistryItem) => {
      const itemPath = path.join(registryPublicPath, item.name);

      // Create directory for the item
      if (!fs.existsSync(itemPath)) {
        fs.mkdirSync(itemPath, { recursive: true });
      }

      // Create styles directory
      if (!fs.existsSync(path.join(itemPath, "styles"))) {
        fs.mkdirSync(path.join(itemPath, "styles"), { recursive: true });
      }

      // Create registry-item.json
      const registryItem = {
        name: item.name,
        type: item.type,
        title: item.title,
        description: item.description,
        dependencies: item.dependencies || [],
        registryDependencies: item.registryDependencies || [],
        files: item.files.map((file: RegistryFile) => ({
          name: path.basename(file.path),
          path: file.path,
          content: loadFileContent(file.path),
          type: file.type,
          target: file.target,
        })),
      };

      // Write registry-item.json
      fs.writeFileSync(
        path.join(itemPath, "registry-item.json"),
        JSON.stringify(registryItem, null, 2)
      );

      // Write style.css placeholder
      fs.writeFileSync(
        path.join(itemPath, "styles", "style.css"),
        "/* Styles for component */"
      );

      // Write index.json
      const index = {
        name: item.name,
        type: item.type,
        title: item.title,
        description: item.description,
        dependencies: item.dependencies || [],
        registryDependencies: await getItemRegistryDependencies(
          itemPath,
          "registry-item.json"
        ),
      };

      fs.writeFileSync(
        path.join(itemPath, "index.json"),
        JSON.stringify(index, null, 2)
      );

      return {
        name: item.name,
        type: item.type,
        title: item.title,
        description: item.description,
      };
    });

    // Wait for all items to be processed
    const items = await Promise.all(itemsPromises);

    // Write index.json in registry public path
    fs.writeFileSync(
      path.join(registryPublicPath, "index.json"),
      JSON.stringify(
        {
          name: registry.name,
          count: items.length,
          registry: `${registry.homepage}/r`,
          items,
        },
        null,
        2
      )
    );

    console.log(`✓ Registry built with ${items.length} items`);
  } catch (error) {
    console.error("Error building registry:", error);
    process.exit(1);
  }
}

// Load file content
function loadFileContent(filePath: string): string {
  if (!fs.existsSync(filePath)) {
    console.warn(`Warning: ${filePath} does not exist`);
    return "";
  }

  return fs.readFileSync(filePath, "utf8");
}

// Run build
build();
