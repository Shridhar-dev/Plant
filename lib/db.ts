import * as schema from "./schemas";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
let queryClient;

export const dbconfig = {
  user: process.env.PGSQL_USER,
  password: process.env.PGSQL_PASSWORD,
  host: process.env.PGSQL_HOST,
  port: parseInt(process.env.PGSQL_PORT || ""),
  database: process.env.PGSQL_DATABASE,
};
if (!queryClient) {
  queryClient = postgres(
    `postgres://${dbconfig.user}:${dbconfig.password}@${dbconfig.host}:${dbconfig.port}/${dbconfig.database}`
  );
}

const db = drizzle(queryClient, { schema });

export default db;
