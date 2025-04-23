import { getUsers } from "@/lib/user";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const users = await getUsers();
  return NextResponse.json(users);
}
