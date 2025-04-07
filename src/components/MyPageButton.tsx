import { Session } from "next-auth";

import Link from "next/link";

export default function MyPageButton({ userId }: { userId: string }) {
    return (
        <button className="my-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            <Link href={`/user/${userId}`}>マイページ</Link>
        </button>
    );
}
