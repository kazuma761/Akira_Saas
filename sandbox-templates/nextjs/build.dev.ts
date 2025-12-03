import dotenv from "dotenv";
dotenv.config({ path: "C:/Users/akshay/Downloads/Akira_Saas-E2b/Akira_Saas-E2b/.env" });

import { Template, defaultBuildLogger } from 'e2b'
import { template } from './template'

async function main() {
  await Template.build(template, {
    alias: '13',
    onBuildLogs: defaultBuildLogger(),
  });
}

main().catch(console.error);
