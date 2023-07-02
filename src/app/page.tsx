"use client";

//COMPONENTS
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session }: any = useSession();
  return (
    <main className="bg-white text-blueGrey-600 m-auto max-w-md p-5 h-screen">
      {session ? <Dashboard /> : <Login />}
    </main>
  );
}
