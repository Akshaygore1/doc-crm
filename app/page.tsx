import Link from "next/link";
import { signOut } from "next-auth/react";
import { getServerSession } from "next-auth";
import { option } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
export default async function Home() {
  const data = await getServerSession(option);

  if (data?.user) {
    redirect("/dashboard");
  }
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
        {/* <button onClick={() => signOut()}>Sign Out</button> */}
      </div>
    </div>
  );
}
