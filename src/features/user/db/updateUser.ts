"use server";

import { prisma } from "@/prisma";
import { withAuthorization } from "@/utils/withAuthorization";
import { redirect } from "next/navigation";
import { UserSettingsFormSchema } from "../types/UserSettingsFormSchema";

async function __updateUser(
	requestedUserId: string,
	formData: Zod.infer<typeof UserSettingsFormSchema>,
) {
	const result = UserSettingsFormSchema.safeParse(formData);
	if (!result.success) {
		return result.error.format();
	}
	const newUserData = result.data;
	await prisma.user.update({
		data: { ...newUserData },
		where: { id: requestedUserId },
	});
	return redirect(`/user/${requestedUserId}`);
}

export const updateUser = withAuthorization(__updateUser);
