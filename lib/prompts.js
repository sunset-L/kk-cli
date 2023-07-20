const { prompt } = require('inquirer');
const fs = require('fs-extra');
const { getTargetDir } = require('./util');
const { red } = require('chalk');
module.exports = async function (projectName, cmdObj) {
  const targetDirectory = getTargetDir(projectName);
  if (fs.existsSync(targetDirectory) && !cmdObj.force) {
    const {force} = await prompt([
      {
        name: "force", // 与返回值对应
        type: "list", // list 类型
        message: "目标目录已存在，是否删除并继续？",
        choices: [
          { name: "是", value: true },
          { name: "否", value: false },
        ],
      }
    ])
    if (!force) {
      return { cancel: true }
    }
  }
  const promptList = [
    {
      name: "routeAntd", // 与返回值对应
      type: "list", // list 类型
      message: "是否需要router+antd",
      choices: [
        { name: "是", value: true },
        { name: "否", value: false },
      ],
    },
    {
      name: "eslint", // 与返回值对应
      type: "list", // list 类型
      message: "是否需要eslint+prettier",
      choices: [
        { name: "是", value: true },
        { name: "否", value: false },
      ],
    },
    {
      name: "preCommit", // 与返回值对应
      type: "list", // list 类型
      message: "是否需要pre-commit校验",
      choices: [
        { name: "是", value: true },
        { name: "否", value: false },
      ],
    },
  ]
  const promptValues = await prompt(promptList)

  return {
    ...cmdObj,
    ...promptValues
  }
}
