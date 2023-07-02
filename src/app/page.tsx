"use client";

import { useSession } from "next-auth/react";

//COMPONENTS
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Loader from "@/utils/loader";

export default function Home() {
  const { data: session }: any = useSession();
  return (
    <main className="bg-white text-blueGrey-600 m-auto max-w-md p-5 h-screen">
      <Loader />
      {session ? <Dashboard /> : <Login />}
    </main>
  );
}
