const openAPI = require("../dist/index")

const gen = async () => {
  await openAPI.generateService({
    // requestLibPath: "import { request } from '@/utils/http'",
    schemaPath: `${__dirname}/schema/auth.json`,
    serversPath: "./service",
    projectName: "auth",
    apiPrefix: "'/auth'",
    namespace: "AUTH",
  });
}

gen()