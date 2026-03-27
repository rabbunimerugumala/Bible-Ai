#!/usr/bin/env node

/**
 * This script is used to reset the project to a blank state.
 * It deletes or moves the /app, /components, /hooks, /scripts, and /constants directories to /app-example based on user input and creates a new /app directory with an index.tsx and _layout.tsx file.
 * You can remove the `reset-project` script from package.json and safely delete this file after running it.
 */
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const root = process.cwd();
const oldDirs = ["app", "components", "hooks", "constants", "scripts"];
const exampleDir = "app-example";
const newAppDir = "app";
const exampleDirPath = path.join(root, exampleDir);

const indexContent = `import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
`;

const layoutContent = `import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  'Do you want to move the old directories to "app-example"? (yes/no) ',
  (answer) => {
    if (answer.toLowerCase() === "yes") {
      if (!fs.existsSync(exampleDirPath)) {
        fs.mkdirSync(exampleDirPath);
      }

      oldDirs.forEach((dir) => {
        const dirPath = path.join(root, dir);
        const examplePath = path.join(exampleDirPath, dir);

        if (fs.existsSync(dirPath) && dir !== "scripts") {
          fs.renameSync(dirPath, examplePath);
          console.log(`Moved ${dir} to ${exampleDir}`);
        }
      });
    }

    // Create new app directory with index.tsx
    const newAppDirPath = path.join(root, newAppDir);
    if (!fs.existsSync(newAppDirPath)) {
      fs.mkdirSync(newAppDirPath);
    }

    const indexPath = path.join(newAppDirPath, "index.tsx");
    const layoutPath = path.join(newAppDirPath, "_layout.tsx");

    fs.writeFileSync(indexPath, indexContent);
    fs.writeFileSync(layoutPath, layoutContent);

    console.log(`Created new ${newAppDir} directory with index.tsx and _layout.tsx`);
    rl.close();
  }
);
