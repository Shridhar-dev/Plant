import * as schema from "./schemas";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
let queryClient;

if (!queryClient) {
  queryClient = postgres(process.env.PGSQL_CONNECTION_STRING!);
}

const db = drizzle(queryClient, { schema });

export default db;
