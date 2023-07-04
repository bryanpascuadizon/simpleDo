import { serialize } from "cookie";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const token = await getToken({ req });

    console.log("JWT TOKEN: ", token);
    const serializedCookie = serialize("user-token", JSON.stringify(token), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600, // Expires in 1 hour
      path: "/",
    });

    console.log("SERIALIZED COOKIES: ", serializedCookie);

    return new NextResponse("Successful Provider Login.", {
      status: 200,
      headers: {
        "Set-Cookie": serializedCookie,
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {}
};
