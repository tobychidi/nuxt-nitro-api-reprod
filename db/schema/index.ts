import { sql } from "drizzle-orm";
import { pgTable, uuid, text, numeric, integer } from "drizzle-orm/pg-core";

export const owners = pgTable("owners", {
   id: uuid()
      .primaryKey()
      .default(sql`uuid_generate_v7()`)
      .notNull(),
   name: text(),
   email: text(),
});

export const houses = pgTable("houses", {
   id: uuid()
      .primaryKey()
      .default(sql`uuid_generate_v7()`)
      .notNull(),
   ownerId: uuid().references(() => owners.id),
   address: text(),
   price: numeric({ precision: 10, scale: 2 }),
});

export const cars = pgTable("cars", {
   id: uuid()
      .primaryKey()
      .default(sql`uuid_generate_v7()`)
      .notNull(),
   ownerId: uuid().references(() => owners.id),
   make: text(),
   model: text(),
   year: integer(),
});
