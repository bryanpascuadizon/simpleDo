"use client";

import { openLoader } from "@/utils/reducers/loaderReducer";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const CreateAccount = () => {
  const [account, setAccount] = useState({
    email: "",
    username: "",
    name: "",
    password: "",
  });
  const { email, username, name, password } = account;
  const router = useRouter();
  const dispatch = useDispatch();

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value,
    });
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    dispatch(openLoader());
    const createRequest = await axios.post("/api/create", {
      account,
    });

    console.log("CREATE REQUEST: ", createRequest)

    if (createRequest.statusText === "OK") {
      router.push("/");
    }
  };

  return (
    <div className="h-full relative">
      <div className="login_header text-center mb-7">
        <p className="font-bold text-5xl font-sans text-blueGrey-900 mb-3">
          SimpleDo
        </p>
        <p className="text-sm">Stay Organized. Get it Done.</p>
      </div>
      <div className="login_body text-center">
        <p className="text-md mb-3">Create Account</p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            className="border border-blueGrey-100 rounded-md mt-3 text-xs text-center p-3 w-[60%] place-self-center"
            onChange={handleOnChange}
          />
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            className="border border-blueGrey-100 rounded-md mt-3 text-xs text-center p-3 w-[60%] place-self-center"
            onChange={handleOnChange}
          />
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Given Name"
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
          <button
            type="submit"
            className=" bg-deepPurple-900 rounded-full mt-5 text-xs text-center p-3 w-[60%] place-self-center text-white"
          >
            Create Account
          </button>
          <Link href="/" className="mt-4 text-xs">
            Have an account?
            <span className="text-deepPurple-600 font-semibold">
              {` `}Sign in now
            </span>
          </Link>
        </form>
        {/*  Other Forms of Login */}
      </div>
      <div className="login_footer text-center absolute bottom-4 left-[25%] right-[25%]">
        <p className="text-xs">{`© ${moment(new Date()).format(
          "YYYY"
        )} Bryan Dizon`}</p>
      </div>
    </div>
  );
};

export default CreateAccount;
