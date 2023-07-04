import User from "@/model/user";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createCookie } from "@/lib/auth";
import { Session } from "next-auth";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const data = await req.json();
  const { username, password } = data.loginCredentials;
  try {
    await connectToDB();
    const checkExisitingUser = await User.findOne({ username });
    if (checkExisitingUser === null) {
      return new NextResponse("Check Username or Password.", {
        status: 401,
      });
    }

    const checkPassword = await bcrypt.compareSync(
      password,
      checkExisitingUser.password
    );

    if (checkPassword && checkExisitingUser.username === username) {
      const serializedCookie: string = await createCookie();

      return new NextResponse(JSON.stringify(checkExisitingUser), {
        status: 200,
        headers: {
          "Set-Cookie": serializedCookie,
          "Content-Type": "text/plain",
        },
      });
    } else {
      return new NextResponse("Check Username or Password.", {
        status: 401,
      });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong.", { status: 500 });
  }
};
