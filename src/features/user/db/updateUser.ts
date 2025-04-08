"use server";

import { prisma } from "@/prisma";
import { UserForm, UserFormSchema } from "../types/User";
import getUserIdFromSession from "@/utils/getUserIdFromSession";

export async function updateUser(userForm: UserForm) {
    const userId = await getUserIdFromSession();
    if (!userId) {
        throw new Error("Unauthorized");
    }
    const validationResult = UserFormSchema.safeParse(userForm);
    if (!validationResult.success) {
        throw new Error("Validation failed: " + validationResult.error.format());
    }
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { ...validationResult.data },
    });
    return updatedUser;
}
