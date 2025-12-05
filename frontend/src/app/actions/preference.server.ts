"use server"

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function getPreferences(){
  const session = await getServerSession(authOptions);
  const url = new URL(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/users/preferences");
  const req = await fetch(url.toString(), {
    headers : {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    cache: "no-store"
  });
  const res = await req.json();
  return res

}
