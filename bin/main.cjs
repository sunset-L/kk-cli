#! /usr/bin/env node
const program = require("commander");
const chalk = require("chalk");
const ora = require("ora");

program
  .name('kk-cli')
  .version(require('../package').version)
  .usage('<command> [options]')

program
  .command("create <project-name>") // 增加创建指令
  .description("create a new project") // 添加描述信息
  .option("-f, --force", "overwrite target directory if it exists") // 强制覆盖
  .action((projectName, cmd) => {
    // 处理用户输入create 指令附加的参数
    require('../lib/create')(projectName, cmd)
  });


program.parse(process.argv);
