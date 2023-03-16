## 介绍
[![GitHub Repo stars](https://img.shields.io/github/stars/XYGR/openapi?style=social)](https://github.com/XYGR/openapi)
[![npm (scoped)](https://img.shields.io/npm/v/@yxgr/openapi)](https://www.npmjs.com/package/@yxgr/openapi)
![GitHub tag (latest SemVer pre-release)](https://img.shields.io/github/v/tag/XYGR/openapi?include_prereleases)

根据 [OpenApi3](https://swagger.io/blog/news/whats-new-in-openapi-3-0/) 文档生成 request 请求代码。

## 使用
```node
npm i --save-dev @yxgr/openapi
```
在项目根目录新建 ```openapi.config.ts```
```ts
const { generateService } = require('@yxgr/openapi')

generateService({
  schemaPath: 'http://petstore.swagger.io/v2/swagger.json',
  serversPath: './servers',
})

```
在 ```package.json``` 的 ```script``` 中添加 api: ```"openapi": "ts-node openapi.config.ts",```

生成api
```node
npm run openapi
```
## 参数
|  属性   | 必填  | 备注 | 类型 | 默认值 |
|  ----  | ----  |  ----  |  ----  | - |
| requestLibPath  | 否 | 自定义请求方法路径 | string | - |
| requestImportStatement  | 否 | 自定义请求方法表达式 | string | - |
| apiPrefix  | 否 | api 的前缀 | string | - |
| serversPath  | 否 | 生成的文件夹的路径 | string | - |
| schemaPath  | 否 | Swagger 2.0 或 OpenAPI 3.0 的地址 | string | - |
| projectName  | 否 | 项目名称 | string | - |
| namespace  | 否 | 命名空间名称 | string | API |
| mockFolder  | 否 | mock目录 | string | - |
| enumStyle  | 否 | 枚举样式 | string-literal \| enum | string-literal |
| nullable | 否 | 使用null代替可选 | boolean | false |
| dataFields | 否 | response中数据字段 | string[] | - |
