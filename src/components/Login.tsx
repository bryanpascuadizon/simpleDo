import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
  useSession,
} from "next-auth/react";
import React, { useEffect, useState } from "react";
import googleIcon from "@/assets/images/google_icon.png";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const { username, password } = loginCredentials;
  const handleLoginSubmit = (e: any) => {
    e.preventDefault();
  };
  const handleOnChange = (e: any) => {
    const { name, value }: { name: string; value: string } = e.target;
    setLoginCredentials({
      ...loginCredentials,
      [name]: value,
    });
  };

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);
  return (
    <div className="h-full relative">
      <div className="login_header text-center mb-10">
        <p className="font-bold text-5xl font-sans text-blueGrey-900 mb-3">
          SimpleDo
        </p>
        <p className="text-sm">Stay Organized. Get it Done.</p>
      </div>
      <div className="login_body text-center">
        <p className="text-md mb-3">Login</p>
        <form onSubmit={handleLoginSubmit} className="flex flex-col">
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            className="border border-blueGrey-100 rounded-md mt-3 text-xs text-center p-3 w-[60%] place-self-center"
            onChange={handleOnChange}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            className="border border-blueGrey-100 rounded-md mt-3 text-xs text-center p-3 w-[60%] place-self-center"
            onChange={handleOnChange}
          />
          <Link href="/forgotpassword" className="text-xs mt-5 font-light">
            Forgot Password?
          </Link>
          <button
            type="submit"
            className=" bg-deepPurple-900 rounded-full mt-5 text-xs text-center p-3 w-[60%] place-self-center text-white"
          >
            Sign In
          </button>
        </form>
        {/*  Other Forms of Login */}
        {providers &&
          Object.values(providers).map((provider: any) => (
            <div className="mt-5" key={provider.name}>
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="text-xs rounded-full text-center p-3 border border-gray-400 w-[60%] relative"
              >
                {provider.name === "Google" ? (
                  <>
                    <Image
                      src={googleIcon}
                      height={15}
                      width={15}
                      alt="Google Icon"
                      className="absolute top-3 left-12"
                    />
                    <p className="ml-1">Sign In with Google</p>
                  </>
                ) : (
                  ""
                )}
              </button>
            </div>
          ))}
      </div>
      <div className="login_footer text-center absolute bottom-5 left-[25%] right-[25%]">
        <p className="text-xs">{`© ${moment(new Date()).format("YYYY")} Bryan Dizon`}</p>
      </div>
    </div>
  );
};

export default Login;
