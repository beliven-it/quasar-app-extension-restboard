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

    const capName = name.charAt(0).toUpperCase() + name.slice(1);

    const content = `import { createResource } from "rb-core-module";
import { dataProvider } from "../providers";

export default createResource({
  name: "${name}",
  provider: dataProvider,
  // displayAttr: "...",
  // schema: {
  //   type: "object",
  //   properties: {
  //   },
  // },
  actions: {
    delete: {
      icon: "delete",
      class: "text-negative",
      isVisible(item) {
        return !!this.getKey(item);
      },
      async run(item) {
        this.deleteOne(this.getKey(item));
      },
    },
  },
  ui: {
    // icon: "...",
    // indexComponent: defineAsyncComponent(() =>
    //   import("pages/${capName}Page.vue")
    // ),
    // formComponent: defineAsyncComponent(() =>
    //   import("components/${capName}Form.vue")
    // ),
    // columns: [
    //   {
    //     name: "id",
    //     sortable: true
    //   }
    // ],
  }
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
