// actions.ts
'use server';

interface User {
  id: string;
  name: string;
  email: string;
}

export async function fetchUser(accessToken: string): Promise<User | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  });

  if (!res.ok) return null;

  return res.json();
}
