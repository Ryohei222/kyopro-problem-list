import Link from "next/link";
import { Button } from "./ui/button";

export default function MyPageButton({ userId }: { userId: string }) {
	return (
		<Link href={`/user/${userId}`} className="my-5">
			<Button className="rounded bg-blue-500 font-bold text-white hover:bg-blue-700 block hover:cursor-pointer">
				マイページ
			</Button>
		</Link>
	);
}
