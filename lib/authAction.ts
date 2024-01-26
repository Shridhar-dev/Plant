"use server";

import { signIn, signOut } from "@/lib/auth";

export const login = async () => {
  "use server";
  await signIn("google");
};

export const loginWithEmail = async (email: FormData) => {
  "use server";
  await signIn("email", email);
};

export const logout = async () => {
  "use server";
  await signOut();
};
