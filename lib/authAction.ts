"use server";

import { signIn, signOut } from "@/lib/auth";

export const login = async () => {
  "use server";
  await signIn("google");
};

export const logout = async () => {
  "use server";
  await signOut();
};
