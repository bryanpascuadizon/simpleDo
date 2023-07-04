import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";
import { getToken } from "next-auth/jwt";
import { parse } from "cookie";

interface UserJWTPayload {
  jti: string;
  iat: number;
}

export const middleware = async (req: NextRequest) => {
  const token = req.cookies.get("user-token")?.value;
  const oauthToken: any = await getToken({ req });
  let verifiedProviderToken: void | "" | UserJWTPayload | undefined = undefined;
  let verifiedToken: void | "" | UserJWTPayload | undefined = undefined;

  if (oauthToken) {
    const oauthCookie = parse(oauthToken.cookie);
    const oauthCookieParsed = oauthCookie["user-token"];

    verifiedProviderToken =
      oauthCookie &&
      (await verifyAuth(oauthCookieParsed).catch((err: Error) => {
        console.error(err);
      }));

    console.log("Token Provider: ", oauthCookie);
    console.log("Token Provider Verified: ", verifiedProviderToken);
  } else if (token) {
    verifiedToken =
      token &&
      (await verifyAuth(token).catch((err: Error) => {
        console.error(err);
      }));

    console.log("Token: ", token);
    console.log("Token Verified: ", verifiedToken);
  }

  if (!verifiedToken && !verifiedProviderToken) {
    return NextResponse.redirect(
      new URL(process.env.NEXTAUTH_URL + "/", req.url)
    );
  }
};

export const config = {
  matcher: ["/dashboard"],
};
