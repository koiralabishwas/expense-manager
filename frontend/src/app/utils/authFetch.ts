export async function authFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    credentials: "include", // Send cookies with requests
    headers: { "Content-Type": "application/json", ...options?.headers || {} },
    ...options,
  });

  if (res.status === 401) {
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }
  const response = await res.json()

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "API request failed");
  }

  return response
}
