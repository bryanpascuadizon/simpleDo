import User from "@/model/user";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  const { email, username, name, password } = data.account;

  try {
    await connectToDB();

    const saltRounds: number = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const createRequest = await new User({
      email,
      username,
      name,
      password: hash,
    });

    await createRequest.save();

    return new NextResponse(JSON.stringify(createRequest), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to create an account.", { status: 500 });
  }
};
