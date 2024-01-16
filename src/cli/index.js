#! /usr/bin/env node
const fs = require("node:fs");
const { Command } = require("commander");
const { version } = require("../../package.json");

const program = new Command();

program
  .name("restboard")
  .alias("rb")
  .description("A CLI to scaffold and/or extend a Restboard project")
  .version(version, "-v, --version", "output the current version");

program
  .command("create:resource")
  .alias("c:r")
  .description("Create a new resource")
  .argument("<string>", "name")
  .action((name) => {
    if (!name) {
      console.error("Invalid resource name");
      return;
    }

    const content = `import { createResource } from "rb-core-module";
import { dataProvider } from "../providers";

export default createResource({
  name: "${name}",
  provider: dataProvider
});`;
    const outfile = `src/resources/${name}.js`;
    fs.writeFile(outfile, content, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Resource succesfully created at ${outfile}`);
        console.log("Remember to include it to src/resources/index.js");
      }
    });
  });

program.parse();
