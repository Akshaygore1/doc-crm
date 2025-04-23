import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import db from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const [user] = await db
      .insert(users)
      .values({
        email,
        password_hash: hashedPassword,
        full_name: name,
        username: email.split("@")[0],
        is_active: true,
      })
      .returning();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
