import { pgTable, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: text("username").notNull().unique(),
  password_hash: text("password_hash").notNull(),
  email: text("email").notNull(),
  full_name: text("full_name").notNull(),
  role_id: uuid("role_id")
    .references(() => roles.id)
    .unique(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  last_login: timestamp("last_login"),
  is_active: boolean("is_active").notNull().default(true),
});

export const roles = pgTable("roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  created_at: timestamp("created_at").notNull().defaultNow(),
});
