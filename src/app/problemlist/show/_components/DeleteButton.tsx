"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteProblemList } from "@/features/problemlist/db/deleteProblemList";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ProblemListResponse } from "../../../../features/problemlist/types/ProblemLists";
import { CardHeaderButton } from "./CardHeaderButton";

type DeleteButtonProps = {
	problemList: NonNullable<ProblemListResponse>;
};

export function DeleteButton(props: DeleteButtonProps) {
	const router = useRouter();
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<CardHeaderButton
					lucideIcon={Trash2}
					label="削除"
					variant="destructive"
					onClick={() => {}}
				/>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						本当に問題リスト「{props.problemList.name}」を削除しますか？
					</AlertDialogTitle>
					<AlertDialogDescription>
						削除した問題リストは復元できません。
						<br />
						この問題リストには {props.problemList.problemListRecords.length}{" "}
						個の問題が含まれ、{props.problemList.stars.length}{" "}
						人がお気に入りに登録しています。
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>キャンセル</AlertDialogCancel>
					<AlertDialogAction
						onClick={() =>
							deleteProblemList(props.problemList.id).then(() =>
								router.push("/"),
							)
						}
					>
						削除する
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
