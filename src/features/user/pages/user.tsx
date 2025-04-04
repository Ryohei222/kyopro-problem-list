import { UserProfile } from "@/features/user/components/user-profile"
import { notFound } from "next/navigation"

import useSWR, { Fetcher } from 'swr'
import { getUserById } from "../db/getUser"
import { Resolve } from "@/lib/utils"


const fetcher: Fetcher<Resolve<ReturnType<typeof getUserById>>, string> = (id) => getUserById(id)

export default function UserPage({ params }: { params: { id: string } }) {
    const { data, error, isLoading } = useSWR('/api/user/' + params.id);

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const user = data?.user;

    if (!user) {
        notFound()
    }

    return (
        <UserProfile user={user} />
    )
}