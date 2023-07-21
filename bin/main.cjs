#! /usr/bin/env node
const program = require("commander");

program
  .name(require('../package').name)
  .version(require('../package').version)
  .usage('<command> [options]')

program
  .command("create <project-name>") // 增加创建指令
  .description("create a new project") // 添加描述信息
  .option("-f, --force", "overwrite target directory if it exists") // 强制覆盖
  .action(async (projectName, cmd) => {
    const opt = await require('../lib/prompts')(projectName, cmd)
    if (opt.cancel) return
    require('../lib/create')(projectName, opt)
  });


program.parse(process.argv);
