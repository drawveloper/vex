import { cac } from "https://unpkg.com/cac/mod.ts";

const cli = cac("vex");

cli
  .command("clone <platform>", "Clone a platform locally")
  .action((platform: string) => {
    console.log('Cloning...', platform)
  });

cli
  .command("build", "Build the platform on the current directory")
  .action(() => {
    console.log('Building...')
  });

cli
  .command("serve", "Serve the platform on the current directory")
  .alias("admin")
  .action(() => {
    console.log('Serving at localhost:3000')
  });

cli
  .command("deploy", "Commit current configuration changes and deploy to VTEX under a new release")
  .action(() => {
    console.log('Serving at localhost:3000')
  });

cli.help()
cli.parse()
