"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { DialogDemo } from "@/components/add-user-modal";
import { useEffect, useState } from "react";
import UsersTable from "@/components/user-table";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const users = await fetch("/api/auth/users");
        const data = await users.json();
        setUsers(data);
      } catch (error) {
        toast.error("Failed to fetch users");
        setLoading(false);
      } finally {
        setLoading(false);
      }
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
        {loading ? (
          <div className="flex justify-center py-10 items-center h-full">
            <div className="space-y-4 w-full">
              <div className="h-48 w-full bg-gray-200 animate-pulse rounded-md" />
            </div>
          </div>
        ) : (
          <UsersTable users={users} />
        )}
      </div>
      <DialogDemo open={open} setOpen={setOpen} />
    </div>
  );
}
