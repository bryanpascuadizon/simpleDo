"use client";

//COMPONENTS
import Login from "@/components/Login";
import Loader from "@/components/Loader";
import Alerts from "@/components/Alerts/Alerts";

export default function Home() {
  return (
    <>
      <Loader />
      <section className="relative">
        <Alerts />
        <Login />
      </section>
    </>
  );
}
