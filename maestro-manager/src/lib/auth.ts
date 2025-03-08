import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

// Function to get the current session on the server
export async function getSession() {
  return await getServerSession();
}

// Function to check if the user is authenticated on the server
export async function getCurrentUser() {
  const session = await getSession();

  return session?.user;
}

// Middleware to protect routes that require authentication
export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}
