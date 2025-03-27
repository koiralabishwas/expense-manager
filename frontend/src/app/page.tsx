'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchUser } from "./action";

export default function Home() {
  const { data: session, status } = useSession();
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (status === "authenticated" && session?.accessToken) {
      fetchUser(session.accessToken)
        .then((user) => {
          if (user) setName(user.name);
        })
        .catch(console.error);
    }
  }, [status, session]);

  return (
    <div>
      Hello, {name || "Guest"}!
    </div>
  );
}
