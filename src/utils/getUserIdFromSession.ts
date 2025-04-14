"use server";
import { auth } from "@/auth";

export default async function getUserIdFromSession(): Promise<string | null> {
	const session = await auth();
	if (!session?.user?.id) return null;
	return session.user.id;
}
