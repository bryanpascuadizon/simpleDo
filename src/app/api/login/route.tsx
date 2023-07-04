import User from "@/model/user";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { useRouter } from "next/navigation";
export const POST = async (req: NextRequest) => {
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
      return new NextResponse(JSON.stringify(checkExisitingUser), {
        status: 200,
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
