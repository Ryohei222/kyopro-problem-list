import { CardUserInfo } from "@/components/CardUserInfo";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/utils/formatDate";
import { Calendar, Star } from "lucide-react";
import type { ProblemListsResponse } from "../types/ProblemLists";

export function ProblemListCard({
	list,
}: { list: ProblemListsResponse[number] }) {
	return (
		<Card className="flex flex-col hover:shadow-md transition-shadow duration-200">
			<CardHeader>
				<CardTitle>
					<a
						href={`/problemlist/show/${list.id}`}
						className="text-blue-600 hover:underline"
					>
						{list.name}
					</a>
				</CardTitle>
				<CardDescription className="line-clamp-2 mt-2">
					{list.description}
				</CardDescription>
			</CardHeader>
			<CardContent className="mt-auto">
				<div className="flex gap-4 text-sm text-gray-600 ">
					<CardUserInfo
						id={list.author.id}
						name={list.author.name}
						image={list.author.image}
					/>
					<div className="flex items-center gap-1">
						<Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
						<span className="font-medium text-gray-800">
							{list._count.stars}
						</span>
					</div>
					<div className="flex items-center gap-1">
						<Calendar className="h-4 w-4 text-gray-500" />
						<span className="text-gray-700">{formatDate(list.createdAt)}</span>
					</div>
					{!list.isPublic && (
						<span className="text-red-500 font-semibold">非公開</span>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
