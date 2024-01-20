import { Config } from "drizzle-kit";

import * as dotenv from "dotenv";

dotenv.config({
    path: ".env.local",
});

export default {
    schema: "./lib/schemas/*",
    driver: "pg",
    dbCredentials: {
        connectionString: "postgres://postgres:shridhar1@127.0.0.1:5432/Plant"!,
    },
    out: "./drizzle",
} satisfies Config;
