import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";

export async function createSession(
  idToken: string,
  expiresIn: number,
  admin: boolean
) {
  const nextCookies = cookies();

  nextCookies.set("session", idToken, {
    httpOnly: true,
    maxAge: expiresIn,
    path: "/",
  });

  if (admin) {
    nextCookies.set("role", "admin", {
      httpOnly: true,
      maxAge: expiresIn,
      path: "/",
    });
  }
}

export const verifySession = cache(async () => {
  const nextCookies = cookies();

  const session = nextCookies.get("session")?.value;

  return { isAuth: true, session: session };
});

export const deleteSession = async () => {
  const nextCookies = cookies();

  nextCookies.delete("session");
  nextCookies.delete("role");
};
