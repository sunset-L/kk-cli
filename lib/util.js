const path = require('path');
const fs = require('fs-extra');
const { exec } = require('child_process');
const { routeAntdConf } = require('./packageConf');

/**
 * 修改package.json
 * @param targetDir 目标目录
 * @param routeAntd
 * @param eslint
 * @param preCommit
 */
function modifyPackage(targetDir, {routeAntd, eslint, preCommit}) {
  if (!routeAntd && !eslint && !preCommit) return
  const pkgDir = path.join(targetDir, 'package.json')
  const pkgJson = fs.readJsonSync(pkgDir)
  if (routeAntd) {
    pkgJson.dependencies = {
      ...pkgJson.dependencies,
      ...routeAntdConf.dependencies
    }
  }
  fs.writeJsonSync(pkgDir, pkgJson, { spaces: 2 })
}

function getTargetDir(projectName) {
  // 获取当前工作目录
  const cwd = process.cwd();
  // 拼接得到项目目录
  return path.join(cwd, projectName);
}

/**
 * 将指定目录文件复制到指定目录
 * @param src
 * @param dest
 */
function copyTemplate(src, dest) {
  fs.copySync(src, dest)
}

/**
 * 执行命令
 * @param command
 * @param cwd
 * @returns {Promise<unknown>}
 */
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
  getTargetDir,
  copyTemplate,
  run,
  modifyPackage
};
