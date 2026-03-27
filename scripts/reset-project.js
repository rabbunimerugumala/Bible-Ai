#!/usr/bin/env node

/**
 * This script is used to reset the project to a blank state.
 * It deletes or moves the /app, /components, /hooks, /scripts, and /constants directories to /app-example
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

    // Create new app directory
    const newAppDirPath = path.join(root, newAppDir);
    if (!fs.existsSync(newAppDirPath)) {
      fs.mkdirSync(newAppDirPath);
      console.log(`Created new ${newAppDir} directory`);
    }

    rl.close();
  }
);

