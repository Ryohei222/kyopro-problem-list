import { prisma } from "@/prisma";

export const getUser = async (userId: string) => {
	return await prisma.user.findUnique({
		select: {
			id: true,
			name: true,
			bio: true,
			aojId: true,
			atcoderId: true,
			codeforcesId: true,
			mofeId: true,
			yukicoderId: true,
			blogURL: true,
			githubId: true,
			xId: true,
			createdAt: true,
			image: true,
		},
		where: { id: userId },
	});
};
