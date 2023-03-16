import fs from "fs";
import path from "path";


export const stripDot = (str: string) => {
  return str.replace(/[-_ .](\w)/g, (_all, letter) => letter.toUpperCase());
};

/**
 * @description 写入文件
 * @param folderPath 文件夹路径
 * @param fileName 文件名称
 * @param content 文件内容
 * @return Boolean 是否error
*/
export const writeFile = (folderPath: string, fileName: string, content: string) => {
  const filePath = path.join(folderPath, fileName);
  mkdir(path.dirname(filePath));
  const [prettierContent, hasError] = prettierFile(content);
  fs.writeFileSync(filePath, prettierContent, {
    encoding: "utf8",
  });
  return hasError;
};


export const mkdir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    mkdir(path.dirname(dir));
    fs.mkdirSync(dir);
  }
};

/**
 * @description 格式化文件
 * @param content 文件内容
 * @returns Array [结果,是否error]
*/
export const prettierFile = (content: string): [string, boolean] => {
  let result = content;
  let hasError = false;
  try {
    const prettier = require("prettier");
    result = prettier.format(content, {
      singleQuote: true,
      trailingComma: "all",
      printWidth: 100,
      parser: "typescript",
    });
  } catch (error) {
    
    hasError = true;
  }
  return [result, hasError];
};