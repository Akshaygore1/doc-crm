import db from "@/db";
import { users } from "@/db/schema/users";
import { eq, ne, and } from "drizzle-orm";
export const getUsers = async () => {
  const response = await db
    .select({
      name: users.full_name,
      email: users.email,
      created_at: users.created_at,
    })
    .from(users)
    .where(and(eq(users.is_active, true)));

  return response;
};
