import { drizzle } from "drizzle-orm/node-postgres";
import { roles, users } from "./db/schema/users";
const db = drizzle(process.env.DATABASE_URL!, {
  logger: true,
  schema: {
    ...users,
    ...roles,
  },
});

export default db;
