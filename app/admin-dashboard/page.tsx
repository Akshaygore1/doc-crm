"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      redirect("/auth/login");
    }
    if (session?.user?.role !== "ADMIN") {
      redirect("/");
    }
  }, [session]);

  return (
    <div>
      <h1>Welcome, {session?.user?.name}</h1>
      <p>Your role: {session?.user?.role}</p>
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  );
}
