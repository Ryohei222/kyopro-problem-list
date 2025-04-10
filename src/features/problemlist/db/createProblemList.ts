"use server";

import { prisma } from "@/prisma";
import { auth } from "@/auth";

export const createProblemList = async (name: string, description: string) => {
    const userId = await auth().then((session) => session?.user?.id);
    if (!userId) {
        throw new Error("Unauthorized");
    }
    const problemList = await prisma.problemList.create({
        data: {
            name,
            description,
            authorId: userId,
        },
    });
    return problemList;
};
