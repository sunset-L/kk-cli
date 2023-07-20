const path = require('path');
const fs = require('fs-extra');
const Inquirer = require('inquirer');
const ora = require('ora')
const { exec } = require('child_process');

function getTargetDir(projectName) {
  // 获取当前工作目录
  const cwd = process.cwd();
  // 拼接得到项目目录
  return path.join(cwd, projectName);
}

/**
 * 判断目录是否已存在，不存在则创建，已存在则根据用户选择或命令删除后创建
 * @param projectName
 * @param options
 * @returns {Promise<void>}
 */
async function mkdir(projectName, options) {
  const targetDirectory = getTargetDir(projectName);
  // 判断目录是否存在
  if (fs.existsSync(targetDirectory)) {
    // 判断是否使用 --force 参数
    if (options.force) {
      // 删除重名目录(remove是个异步方法)
      await fs.remove(targetDirectory);
      fs.mkdirSync(targetDirectory)
    } else {
      let { isOverwrite } = await new Inquirer.prompt([
        // 返回值为promise
        {
          name: "isOverwrite", // 与返回值对应
          type: "list", // list 类型
          message: "Target directory exists, Please choose an action",
          choices: [
            { name: "Overwrite", value: true },
            { name: "Cancel", value: false },
          ],
        },
      ]);
      // 选择 Cancel
      if (!isOverwrite) {
        console.log("Cancel");
        return Promise.resolve('cancel')
      } else {
        // 选择 Overwrite ，先删除掉原有重名目录
        const spinner = ora('removing').start()
        await fs.remove(targetDirectory);
        spinner.stop()
        fs.mkdirSync(targetDirectory)
      }
    }
  } else {
    fs.mkdirSync(targetDirectory)
  }
}

/**
 * 将指定目录文件复制到指定目录
 * @param src
 * @param dest
 */
function copyTemplate(src, dest) {
  console.log(src, dest);
  fs.copy(src, dest)
}

async function run(command, cwd) {
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (err) => {
      if (err != null) {
        return reject(err)
      }

      return resolve(null)
    })
  })
}

module.exports = {
  mkdir,
  getTargetDir,
  copyTemplate,
  run
};
