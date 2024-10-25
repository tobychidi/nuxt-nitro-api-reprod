import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import { dbConnectionString, dbDataCasing } from "~~/drizzle.config";

export const db = drizzle({
   connection: dbConnectionString!,
   schema,
   casing: dbDataCasing,
   // logger: true,
});
