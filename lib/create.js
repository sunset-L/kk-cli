const { copyTemplate, getTargetDir, run } = require('./util');
const path = require('path');
const ora = require('ora');
const { logSuccess } = require('./log');
const fs = require('fs-extra');
const { modifyPackage, renderGitIgnore } = require('./render');
const { bold } = require('chalk');

// 当前函数中可能存在很多异步操作，因此我们将其包装为 async
module.exports = async function (projectName, options) {
  // 目标文件夹
  const targetDirectory = getTargetDir(projectName);
  // 创建文件夹
  const dirLoading = ora('正在删除目标目录').start()
  await fs.remove(targetDirectory);
  dirLoading.text = '正在创建目录'
  fs.mkdirSync(targetDirectory)
  dirLoading.stop()

  // 基础模板创建
  copyTemplate(path.resolve(__dirname, '../template/base'), targetDirectory)

  // 修改package.json
  modifyPackage(targetDirectory, options)

  const loading = ora('初始化git仓库').start()
  await run('git init', targetDirectory)
  // 创建gitignore文件
  renderGitIgnore(targetDirectory)

  loading.stop()
  logSuccess(
    `\n✨  项目${bold(projectName)}创建成功!!! 🚀🚀🚀

    👉 cd ${projectName}
    👉 npm install
    👉 npm run dev
    `
  )
};
