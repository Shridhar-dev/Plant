import { Config } from "drizzle-kit";

import * as dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

export default {
  schema: "./lib/schemas/*",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.PGSQL_CONNECTION_STRING!,
  },
  out: "./drizzle",
} satisfies Config;
