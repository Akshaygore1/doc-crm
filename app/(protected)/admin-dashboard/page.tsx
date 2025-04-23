"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { DialogDemo } from "@/components/add-user-modal";
import { useEffect, useState } from "react";
import { getUsers } from "@/lib/user";
import UsersTable from "@/components/user-table";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await fetch("/api/auth/users");
      const data = await users.json();
      console.log(data);
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <div className="flex flex-row w-full justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome, {session?.user?.name}</h1>
        <div className="flex items-center gap-4">
          <Button onClick={() => setOpen(true)}>Add User</Button>
        </div>
      </div>
      <div className="p-4">
        <UsersTable users={users} />
      </div>
      <DialogDemo open={open} setOpen={setOpen} />
    </div>
  );
}
