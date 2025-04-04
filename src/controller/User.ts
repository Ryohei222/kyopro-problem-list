import { prisma } from "@/prisma"

export const getUserById = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id }
    });
}