import { UserProfile } from "@/features/user/components/user-profile"
import { notFound } from "next/navigation"
import { getUserById } from "../db/getUser"


export default async function UserPage({ params }: { params: { id: string } }) {
    const userId = params.id;
    const user = await getUserById(userId);

    if (!user) {
        notFound()
    }

    return (
        <UserProfile user={user} />
    )
}