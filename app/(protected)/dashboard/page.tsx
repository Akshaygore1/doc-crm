"use client";
// import { getServerSession } from "next-auth";
import { option } from "../../api/auth/[...nextauth]/options";
import { useSession } from "next-auth/react";
export default function Dashboard() {
  // const session = await getServerSession(option);
  const { data: session } = useSession();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {session?.user?.name}</p>
      <p>Your role: {session?.user?.role}</p>
    </div>
  );
}
