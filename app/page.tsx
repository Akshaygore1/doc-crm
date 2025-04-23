"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Welcome to the Landing Page</h1>
        <p className="text-sm">This is the landing page of the application.</p>
      </div>
      <div className="p-10 flex flex-row gap-4">
        <Link className="underline rounded-md" href="/dashboard">
          Dashboard
        </Link>
        <Link className="underline rounded-md" href="/auth/login">
          Login
        </Link>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    </div>
  );
}
