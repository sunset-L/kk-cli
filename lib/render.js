const { routeAntdConf, eslintConf, preCommitConf } = require('./packageConf');
const { merge } = require('lodash');
const { copyTemplate } = require('./util');
const fs = require('fs-extra');
const path = require('path');

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
    merge(pkgJson, routeAntdConf)
    copyTemplate(path.resolve(__dirname, '../template/routeAntd'), targetDir)
  }
  if (eslint) {
    merge(pkgJson, eslintConf)
    copyTemplate(path.resolve(__dirname, '../template/eslint'), targetDir)
  }
  if (preCommit) {
    merge(pkgJson, preCommitConf)
    copyTemplate(path.resolve(__dirname, '../template/eslint'), targetDir)
  }
  fs.writeJsonSync(pkgDir, pkgJson, { spaces: 2 })
}

function renderGitIgnore(targetDir) {
  fs.writeFileSync(
    path.resolve(targetDir, '.gitignore'),
    `# Logs\nlogs\n*.log\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\npnpm-debug.log*\nlerna-debug.log*\n\nnode_modules\ndist\ndist-ssr\n*.local\n\n# Editor directories and files\n.vscode/*\n!.vscode/extensions.json\n.idea\n.DS_Store\n*.suo\n*.ntvs*\n*.njsproj\n*.sln\n*.sw?\n`
  )
}

module.exports = {
  modifyPackage,
  renderGitIgnore
};
