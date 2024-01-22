import { Config } from "drizzle-kit";

import * as dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

export default {
  schema: "./lib/schemas/*",
  driver: "pg",
  dbCredentials: {
    connectionString: "postgresql://shridharkamat10:hDoNHTzUl21r@ep-misty-dust-a5w0n53p.us-east-2.aws.neon.tech/Plant?sslmode=require"!,
  },
  out: "./drizzle",
} satisfies Config;
