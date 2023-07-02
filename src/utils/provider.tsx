"use client";

import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { store } from "./store";

interface ProviderProps {
  children?: any;
  session?: any;
}

const Providers = ({ children, session }: ProviderProps) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
};

export default Providers;
