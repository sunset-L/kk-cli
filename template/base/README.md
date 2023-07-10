# vite-react-template

## vite+react模板

- 默认开启别名
- 支持css modules
- 默认支持less
- 支持svg做component使用,svgr实现

- 更多请参考[vite.config配置](https://cn.vitejs.dev/config/)

- [x] eslint+prettier
- [x] pre-commit校验
- [x] svg-component
- [x] router
- [x] antd

## 分支说明
- master为基础模板，只有vite+react以及基础vite.config
- +router为基础模板+路由配置+antd

## 使用说明
- 一般用不到基础模板，其他分支只加了单个配置（如路由或者antd）是为及时更新某个配置，如antd未更新但router更新了，此时用单个配置然后手动下载最新router即可
- 若使用基础模板+router+antd则在本地合并三个分支即可
- 最后修改git远程地址为自己项目地址
```
git remote set-url origin xxxx
```
