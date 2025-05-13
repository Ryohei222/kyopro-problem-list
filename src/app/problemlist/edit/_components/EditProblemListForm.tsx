"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import useProblems from "@/hooks/useProblems";
import { ExternalLink, GripVertical, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { ProblemListItemSchema } from "@/features/problemlist/types/ProblemListItemSchema";
import { ProblemListMetadataSchema } from "@/features/problemlist/types/ProblemListMetadataSchema";
import {
	createProblemKey,
	type createProblemKeyProps,
} from "@/types/CommonProblem";
import getResourceName from "@/utils/getResourceName";
import { hasContest } from "@/utils/hasContest";
import { transformProblem } from "@/utils/transformProblem";
import { updateProblemList } from "../../../../features/problemlist/db/updateProblemList";
import type { ProblemListResponse } from "../../../../features/problemlist/types/ProblemLists";
import DraggableRow from "../../show/_components/DraggableRow";
import AddProblemForm from "./AddProblem";
import ProblemListDescriptionInput from "./ProblemListDescriptionInput";
import ProblemListIsPublicInput from "./ProblemListIsPublicInput";
import ProblemListNameInput from "./ProblemListNameInput";

import type { ProblemListItem } from "@/features/problemlist/types/ProblemListItemSchema";

export default function EditProblemListForm({
	problemList: beforeTransformProblemList,
}: {
	problemList: NonNullable<ProblemListResponse>;
}) {
	const problemList = {
		...beforeTransformProblemList,
		problemListRecords: beforeTransformProblemList.problemListRecords.map(
			(record) => ({
				...record,
				problem: transformProblem(record.problem),
			}),
		),
	};

	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [name, setName] = useState(problemList.name);
	const [description, setDescription] = useState(problemList.description);
	const [isPublic, setIsPublic] = useState(problemList.isPublic);
	const [problems, setProblems] = useState(problemList.problemListRecords);
	const [showAddProblemForm, setShowAddProblemForm] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { problems: allProblems, isLoading } = useProblems();

	// フォーカス状態を管理する状態
	const [focusedCell, setFocusedCell] = useState<{
		index: number;
		field: "memo" | "hint";
	} | null>(null);

	// 問題追加
	const handleAddProblem = (problem: ProblemListItem) => {
		setProblems((prev) => [...prev, problem]);
	};

	// 問題削除
	const handleRemoveProblem = (index: number) => {
		setProblems((prev) => prev.filter((_, i) => i !== index));
	};

	// 問題順序変更
	const handleReorderProblem = (index: number, newOrder: number) => {
		const newProblems = [...problems];
		newProblems[index].order = newOrder;
		setProblems(newProblems);
	};

	// フォーム送信
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);
		try {
			// メタデータバリデーション
			const metaResult = ProblemListMetadataSchema.safeParse({
				name,
				description,
				isPublic,
			});
			if (!metaResult.success) {
				const fieldErrors = metaResult.error.format();
				const messages = Object.values(fieldErrors)
					.map((v) =>
						v && typeof v === "object" && "_errors" in v
							? v._errors.join(" ")
							: "",
					)
					.filter(Boolean)
					.join("\n");
				setError(`リスト名または概要にエラーがあります:\n${messages}`);
				setIsSubmitting(false);
				return;
			}

			const sortedProblems = [...problems].sort((a, b) => a.order - b.order);
			const reorderedProblems = sortedProblems.map((p, index) => ({
				...p,
				order: index + 1,
			}));

			// 問題リスト項目バリデーション
			for (const [i, record] of reorderedProblems.entries()) {
				const result = ProblemListItemSchema.safeParse({
					problemKey: record.problem.ProblemKey(),
					memo: record.memo,
					hint: record.hint,
					order: record.order,
				});
				if (!result.success) {
					const fieldErrors = result.error.format();
					const messages = Object.values(fieldErrors)
						.map((v) =>
							v && typeof v === "object" && "_errors" in v
								? v._errors.join(" ")
								: "",
						)
						.filter(Boolean)
						.join("\n");
					setError(`No.${i + 1} の項目にエラーがあります:\n${messages}`);
					setIsSubmitting(false);
					return;
				}
			}

			const response = await updateProblemList({
				id: problemList.id,
				name,
				description,
				isPublic,
				problemListRecords: reorderedProblems.map((record) => ({
					problemKey: record.problem.ProblemKey(),
					memo: record.memo,
					hint: record.hint,
					order: record.order,
				})),
			});

			if (!response.success) {
				throw new Error(response.error || "問題リストの更新に失敗しました");
			}

			// 更新成功
			router.push(`/problemlist/show/${problemList.id}`);
			router.refresh();
		} catch (err) {
			console.error("更新エラー:", err);
			setError(
				err instanceof Error ? err.message : "更新中にエラーが発生しました",
			);
		} finally {
			setIsSubmitting(false);
			setShowAddProblemForm(true);
		}
	};

	// 行の順序を入れ替える関数
	const moveRow = (dragIndex: number, hoverIndex: number) => {
		const dragRow = problems[dragIndex];
		const newProblems = [...problems];

		// 配列から要素を削除
		newProblems.splice(dragIndex, 1);

		// 新しい位置に要素を挿入
		newProblems.splice(hoverIndex, 0, dragRow);

		// 順序を1から連番で再設定
		const updatedProblems = newProblems.map((p, idx) => ({
			...p,
			order: idx + 1,
		}));

		setProblems(updatedProblems);
	};

	return (
		<Card className="bg-white">
			<CardHeader>
				<CardTitle className="text-2xl font-bold">問題リストの編集</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6 pt-4 mb-4">
				<form id="edit-problem-form" onSubmit={handleSubmit}>
					{error && (
						<div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
							{error}
						</div>
					)}

					<ProblemListNameInput
						name={name}
						handleNameChange={(e) => setName(e.target.value)}
					/>

					<ProblemListDescriptionInput
						description={description}
						handleDescriptionChange={(e) => setDescription(e.target.value)}
					/>

					<ProblemListIsPublicInput
						isPublic={isPublic}
						handleIsPublicChange={(checked) => setIsPublic(checked === true)}
					/>

					{showAddProblemForm && (
						<div className="flex justify-between items-center">
							<AddProblemForm
								onAddProblem={handleAddProblem}
								existingProblems={problems}
							/>
						</div>
					)}

					<div className="space-y-6 mt-8">
						{problems.length > 0 ? (
							<DndProvider backend={HTML5Backend}>
								<div className="rounded-md border bg-white">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead />
												<TableHead>問題名</TableHead>
												<TableHead>出典</TableHead>
												<TableHead>メモ</TableHead>
												<TableHead>ヒント</TableHead>
												<TableHead className="w-[60px]" />
											</TableRow>
										</TableHeader>
										<TableBody>
											{problems
												.sort((a, b) => a.order - b.order)
												.map((record, index) => {
													const problem = record.problem;
													const problemUrl = problem.Url();

													const isMemoFocused =
														focusedCell?.index === index &&
														focusedCell?.field === "memo";
													const isHintFocused =
														focusedCell?.index === index &&
														focusedCell?.field === "hint";

													return (
														<DraggableRow
															// biome-ignore lint:
															key={index}
															index={index}
															moveRow={moveRow}
															id={record.problem.ProblemKey()}
														>
															<TableCell>
																<div className="flex items-center gap-2 max-w-[0px]">
																	<div className="cursor-move">
																		<GripVertical className="h-4 w-4 text-gray-400" />
																	</div>
																	<Input
																		type="number"
																		min="1"
																		value={record.order}
																		onChange={(e) =>
																			handleReorderProblem(
																				index,
																				Number.parseInt(e.target.value) || 1,
																			)
																		}
																		className="w-16 text"
																		hidden={true}
																	/>
																</div>
															</TableCell>
															<TableCell>
																{problem ? (
																	<a
																		href={problemUrl}
																		target="_blank"
																		rel="noopener noreferrer"
																		className="text-blue-600 hover:underline flex items-center gap-1"
																		tabIndex={-1}
																	>
																		{problem.Title()}
																		<ExternalLink className="h-3 w-3" />
																	</a>
																) : (
																	<span className="text-gray-400">
																		問題情報なし
																	</span>
																)}
															</TableCell>
															<TableCell>
																<span className="text-sm">
																	{getResourceName(problem.resource)}
																	{hasContest(problem) &&
																		` - ${problem.ContestTitle()}`}
																</span>
															</TableCell>
															<TableCell
																className={`transition-all duration-200 ${
																	isMemoFocused ? "p-0 min-w-[300px]" : ""
																}`}
															>
																<Textarea
																	value={record.memo}
																	onChange={(e) => {
																		const newProblems = [...problems];
																		newProblems[index].memo = e.target.value;
																		setProblems(newProblems);
																	}}
																	onFocus={() =>
																		setFocusedCell({
																			index,
																			field: "memo",
																		})
																	}
																	onBlur={() => setFocusedCell(null)}
																	className={`resize-none transition-all duration-200 ${
																		isMemoFocused ? "min-h-[120px]" : "h-9"
																	}`}
																	placeholder="メモを入力"
																/>
															</TableCell>
															<TableCell
																className={`transition-all duration-200 ${
																	isHintFocused ? "p-0 min-w-[300px]" : ""
																}`}
															>
																<Textarea
																	value={record.hint}
																	onChange={(e) => {
																		const newProblems = [...problems];
																		newProblems[index].hint = e.target.value;
																		setProblems(newProblems);
																	}}
																	onFocus={() =>
																		setFocusedCell({
																			index,
																			field: "hint",
																		})
																	}
																	onBlur={() => setFocusedCell(null)}
																	className={`resize-none transition-all duration-200 ${
																		isHintFocused ? "min-h-[120px]" : "h-9"
																	}`}
																	placeholder="ヒントを入力"
																/>
															</TableCell>
															<TableCell>
																<Button
																	type="button"
																	variant="outline"
																	size="sm"
																	onClick={() => handleRemoveProblem(index)}
																	tabIndex={-1}
																>
																	<Trash2 className="h-4 w-4" />
																</Button>
															</TableCell>
														</DraggableRow>
													);
												})}
										</TableBody>
									</Table>
								</div>
							</DndProvider>
						) : (
							<div className="text-center p-6 border rounded-md text-gray-500">
								問題が追加されていません。「問題を追加」ボタンから問題を追加してください。
							</div>
						)}
					</div>
				</form>
			</CardContent>

			<CardFooter className="flex justify-between border-t p-6">
				<Button type="button" variant="outline" onClick={() => router.back()}>
					キャンセル
				</Button>
				<Button
					form="edit-problem-form"
					type="submit"
					disabled={isSubmitting}
					className="flex items-center gap-1"
					onClick={() => setShowAddProblemForm(false)}
				>
					<Save className="h-4 w-4" />
					{isSubmitting ? "保存中..." : "問題リストを更新"}
				</Button>
			</CardFooter>
		</Card>
	);
}
