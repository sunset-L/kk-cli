const { copyTemplate, getTargetDir, run } = require('./util');
const path = require('path');
const ora = require('ora');
const { logSuccess } = require('./log');
const fs = require('fs-extra');

// 当前函数中可能存在很多异步操作，因此我们将其包装为 async
module.exports = async function (projectName, options) {
  // 目标文件夹
  const targetDirectory = getTargetDir(projectName);
  // 创建文件夹
  await fs.remove(targetDirectory);
  fs.mkdirSync(targetDirectory)

  // 基础模板创建
  copyTemplate(path.resolve(__dirname, '../template/base'), targetDirectory)

  const loading = ora('初始化git仓库').start()
  await run('git init', targetDirectory)

  loading.stop()
  logSuccess('创建成功')
};
