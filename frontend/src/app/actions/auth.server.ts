"use server";

import { RegisterForm } from "../(auth)/register/page";

export async function registerUser(registerForm: RegisterForm) {
  const req = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/register",
    {
      method: "POST",
      headers: { "Content-Type": "application/Json" },
      body: JSON.stringify(registerForm),
    }
  );

  const result = await req.json();
  if (result) {
    return result;
  }
}
