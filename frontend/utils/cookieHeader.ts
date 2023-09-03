"use server";

import { cookies } from "next/headers";

export async function set(cookieValue: string) {
  try {
    cookies().set("refresh", cookieValue, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // Expires in 24 hours
      path: "/",
    });

    console.log("Cookie set successfully.");
  } catch (error) {
    console.error("Error setting cookie:", error);
  }
}

export async function getUser() {
  const refreshCookie = cookies().get("refresh");
  return refreshCookie;
}

export async function logoutUser() {
  cookies().set("refresh", "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    expires: new Date(0),
    path: "/",
  });
}
