const { mkdir, copyTemplate, getTargetDir } = require('./util');
const path = require('path');

// 当前函数中可能存在很多异步操作，因此我们将其包装为 async
module.exports = async function (projectName, options) {
  // 目标文件夹
  const targetDirectory = getTargetDir(projectName);
  // 创建文件夹
  await mkdir(projectName, options)

  copyTemplate(path.resolve(__dirname, '../template/base'), targetDirectory)
};
