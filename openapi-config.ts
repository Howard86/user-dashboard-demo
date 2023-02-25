import { loadEnvConfig } from '@next/env';
import type { ConfigFile } from '@rtk-query/codegen-openapi';

loadEnvConfig(process.cwd());

const config: ConfigFile = {
  schemaFile: `${process.env.NEXT_PUBLIC_USER_API_ENDPOINT}/openapi.json`,
  apiFile: './src/services/base-api.ts',
  apiImport: 'baseApi',
  outputFile: './src/services/user-api.ts',
  exportName: 'userApi',
  hooks: true,
};

export default config;
