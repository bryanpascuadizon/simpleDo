"use client";

import { useSession } from "next-auth/react";

//COMPONENTS
import Login from "@/components/Login";
import Loader from "@/utils/loader";

export default function Home() {
  const { data: session }: any = useSession();
  return (
    <section className="h-screen">
      <Loader />
      <Login />
    </section>
  );
}
