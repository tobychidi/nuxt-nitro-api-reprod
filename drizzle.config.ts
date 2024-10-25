import { defineConfig } from "drizzle-kit";
export const dbConnectionString = process.env.DATABASE_URL;
export const dbDataCasing = "snake_case";

export default defineConfig({
   schema: "./db/schema",
   out: "./db/drizzle",
   dialect: "postgresql",
   dbCredentials: {
      url: dbConnectionString!,
   },
   casing: dbDataCasing,
});
