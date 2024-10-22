import { readdirSync, writeFileSync } from "fs";
import { join } from "path";

const componentsDir = join(process.cwd(), "components");
const indexFile = join(componentsDir, "index.ts");

const files = readdirSync(componentsDir)
  .filter((file) => file.endsWith(".tsx") && file !== "index.ts")
  .map((file) => {
    const fileName = file.replace(".tsx", "");
    return {
      fileName: fileName,
      component: fileName
        .replace(/^./, (char) => char.toUpperCase())
        .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
        .replace(/-/g, ""),
    };
  });

const content = files
  .map(
    (file) =>
      `export { default as ${file.component} } from './${file.fileName}';`
  )
  .join("\n");

writeFileSync(indexFile, content);

console.log("index.ts generated!");
