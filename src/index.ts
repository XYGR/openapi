import consola from "consola";
import http from "http";
import https from "https";
import fetch from "node-fetch";
import type { OperationObject } from "openapi3-ts";
import converter from "swagger2openapi";
import { ServiceGenerator } from "./serviceGenerator";

export type GenerateServiceProps = {
  requestLibPath?: string;
  requestImportStatement?: string;
  /**
   * api 的前缀
   */
  apiPrefix?:
    | string
    | ((params: {
        path: string;
        method: string;
        namespace: string;
        functionName: string;
        autoExclude?: boolean;
      }) => string);
  /**
   * 生成的文件夹的路径
   */
  serversPath?: string;
  /**
   * Swagger 2.0 或 OpenAPI 3.0 的地址
   */
  schemaPath?: string;
  /**
   * 项目名称
   */
  projectName?: string;

  hook?: {
    /** 自定义函数名称 */
    customFunctionName?: (data: OperationObject) => string;
    /** 自定义类型名称 */
    customTypeName?: (data: OperationObject) => string;
    /** 自定义类名 */
    customClassName?: (tagName: string) => string;
  };
  namespace?: string;

  /**
   * 默认为false，true时使用null代替可选
   */
  nullable?: boolean;

  mockFolder?: string;
  /**
   * 模板文件的文件路径
   */
  templatesFolder?: string;

  /**
   * 枚举样式
   */
  enumStyle?: "string-literal" | "enum";

  /**
   * response中数据字段
   * example: ['result', 'res']
   */
  dataFields?: string[];
};


export const generateService = async ({
  requestLibPath,
  schemaPath,
  nullable = false,
  ...rest
}: GenerateServiceProps) => {
  const openAPI = await getOpenAPIConfig(schemaPath);
  const requestImportStatement = getImportStatement(requestLibPath);
  const serviceGenerator = new ServiceGenerator(
    {
      namespace: "API",
      requestImportStatement,
      enumStyle: "string-literal",
      nullable,
      ...rest,
    },
    openAPI
  );
  serviceGenerator.genFile();
};

/**
 * @description 获取openAPIConfig
 * @param schemaPath 配置文件路径
 * @returns Promise 配置文件对象
*/
const getOpenAPIConfig = async (schemaPath: string) => {
  const schema = await getSchema(schemaPath);
  if (!schema) {
    return null;
  }
  const openAPI = await converterSwaggerToOpenApi(schema);
  return openAPI;
};

/**
 * @description 获取 `request` 路径
 * @param{string} requestLibPath import 路径 也可以是包的路径
 * @returns 返回 `request` 路径
*/
const getImportStatement = (requestLibPath?: string) => {
  // 判断是否以 `import` 开头 表示为完整import语法
  if (requestLibPath && requestLibPath.startsWith("import")) {
    return requestLibPath;
  }
  // 判断是否传入了 `requestLibPath`
  if (requestLibPath) {
    return `import request from '${requestLibPath}'`;
  }
  // 默认返回
  return "import { request } from \"your request path\"";
};

/**
 * @description 获取 openAPIDocs 
 * @param schemaPath 配置文件路径可能是url或者本地路径
 * @returns Promise docs对象类型为JSON
*/
export const getSchema = async (schemaPath: string) => {
  // 判断是否是URL路径
  if (schemaPath.startsWith("http")) {
    // 创建http/https对象
    const protocol = schemaPath.startsWith("https:") ? https : http;
    try {
      // 创建agent
      const agent = new protocol.Agent({
        rejectUnauthorized: false,
      });
      // 请求URL并返回json对象
      return await fetch(schemaPath, { agent, }).then((rest) => rest.json());
    } catch (error) {
      console.log("fetch openapi error:", error);
    }
    return null;
  }
  // 本地文件 直接返回json对象
  const schema = require(schemaPath);
  return schema;
};

/**
 * @description Swagger转OpenApi
 * @param swagger swagger对象
 * @returns Object OpenApi对象
*/
const converterSwaggerToOpenApi = (swagger: any) => {
  if (!swagger.swagger) {
    return swagger;
  }
  return new Promise((resolve, reject) => {
    converter.convertObj(swagger, {}, (err, options) => {
      consola.info("💺 将 Swagger 转化为 openAPI")
      if (err) {
        reject(err);
        return;
      }
      resolve(options.openapi);
    });
  });
};