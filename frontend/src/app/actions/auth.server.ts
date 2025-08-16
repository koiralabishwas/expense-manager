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

export async function checkIsAuthorized() : Promise<Boolean> {
  const req = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/check",
    {
      method: "GET",
      headers: { "Content-Type": "application/Json" },
    }
  );

  if (req.status !== 200 ) {
    return false
  }

  return true
}
