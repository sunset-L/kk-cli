# DynamicIcon

动态引入图标组件

> 当前组件引入的是@/assets/icons 的所有`.svg`文件。因为动态引入 webpack 需要预先知道文件所在路径，所以此路径不可配置
> 此组件依赖于‘@svgr/webpack’和`svgo-loader`包

## Options

| 属性      | 说明             | 类型          | 默认 | 是否必填 |
| --------- | ---------------- | ------------- | ---- | -------- |
| name      | 图标名字(文件名) | string        | -    | 是       |
| className | 图标样式名       | string        | -    | 否       |
| style     | 图标样式名       | CSSProperties | -    | 否       |
| fill      | 图标颜色         | string        | -    | 否       |
| width     | 图标宽度         | string        | 1em  | 否       |
| height    | 图标高度         | string        | 1em  | 否       |
