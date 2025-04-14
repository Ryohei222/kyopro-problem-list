import { prisma } from "@/prisma";
import type { RequestedUserId } from "@/types/RequestedUserId";
import { withAuthorization } from "@/utils/withAuthorization";

const _getUserSettings = async (userId: RequestedUserId) => {
	return await prisma.user.findUnique({
		select: {
			id: true,
			name: true,
			email: true,
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

export const getUserSettings = withAuthorization(_getUserSettings);
