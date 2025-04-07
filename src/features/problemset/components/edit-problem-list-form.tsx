"use client";
import { useRouter } from "next/navigation";
import { getProblemSetById } from "@/features/problemset/db/ProblemSet";
import { Prisma } from "@prisma/client";
import { useState, FormEvent } from "react";
import useProblems from "@/features/problemset/hooks/useProblems";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, Trash2, ExternalLink, GripVertical } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { PUTRequestBody } from "../types/api";
import { buildProblemUrl } from "@/features/problemset/utils/buildProblemUrl";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import type { ProblemSetProblem } from "../types/ProblemSetProblem";

import DraggableRow from "./draggable-row";
import ProblemSetNameInput from "./ProblemSetNameInput";
import ProblemSetDescriptionInput from "./ProblemSetDescriptionInput";
import ProblemSetIsPublicInput from "./ProblemSetIsPublicInput";
import AddProblemForm from "./AddProblem";

export default function EditProblemListForm({
    problemSet,
}: {
    problemSet: NonNullable<Prisma.PromiseReturnType<typeof getProblemSetById>>;
}) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState(problemSet.name);
    const [description, setDescription] = useState(problemSet.description);
    const [isPublic, setIsPublic] = useState(problemSet.isPublic);
    const [problems, setProblems] = useState<ProblemSetProblem[]>(
        problemSet.problemSetProblems.map((p) => ({
            problemProvider: p.problem.provider,
            contestId: p.problem.contestId,
            problemId: p.problem.problemId,
            title: p.problem.title,
            memo: p.memo,
            hint: p.hint,
            order: p.order,
        })),
    );
    const [error, setError] = useState<string | null>(null);
    const { problems: allProblems } = useProblems();

    // 問題追加
    const handleAddProblem = (problem: ProblemSetProblem) => {
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

    // 問題IDから問題の詳細情報を取得
    const getProblemDetails = (problemId: string) => {
        const problem = allProblems.find((p) => p.problemId === problemId);
        return problem || null;
    };

    // フォーム送信
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // 問題の順序を再計算（1から連番）
            const sortedProblems = [...problems].sort((a, b) => a.order - b.order);
            const reorderedProblems = sortedProblems.map((p, index) => ({
                ...p,
                order: index + 1,
            }));

            const requestData: PUTRequestBody = {
                id: problemSet.id,
                name,
                description,
                isPublic,
                problemSetProblems: reorderedProblems,
            };

            const response = await fetch(`/api/problemset/${problemSet.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "問題リストの更新に失敗しました");
            }

            // 更新成功
            router.push(`/problemset/show/${problemSet.id}`);
            router.refresh();
        } catch (err) {
            console.error("更新エラー:", err);
            setError(err instanceof Error ? err.message : "更新中にエラーが発生しました");
        } finally {
            setIsSubmitting(false);
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

                    <ProblemSetNameInput
                        name={name}
                        handleNameChange={(e) => setName(e.target.value)}
                    />

                    <ProblemSetDescriptionInput
                        description={description}
                        handleDescriptionChange={(e) => setDescription(e.target.value)}
                    />

                    <ProblemSetIsPublicInput
                        isPublic={isPublic}
                        handleIsPublicChange={(checked) => setIsPublic(checked === true)}
                    />

                    <div className="space-y-6 mt-8">
                        <div className="flex justify-between items-center">
                            <AddProblemForm
                                onAddProblem={handleAddProblem}
                                existingProblems={problems}
                            />
                        </div>

                        {problems.length > 0 ? (
                            <DndProvider backend={HTML5Backend}>
                                <div className="rounded-md border bg-white">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead></TableHead>
                                                <TableHead>問題名</TableHead>
                                                <TableHead>コンテストID</TableHead>
                                                <TableHead>メモ</TableHead>
                                                <TableHead>ヒント</TableHead>
                                                <TableHead className="w-[100px]"></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {problems
                                                .sort((a, b) => a.order - b.order)
                                                .map((problem, index) => {
                                                    const problemDetail = getProblemDetails(
                                                        problem.problemId,
                                                    );
                                                    const problemUrl = problemDetail
                                                        ? buildProblemUrl({
                                                              problemProvider:
                                                                  problemDetail.provider,
                                                              contestId: problemDetail.contestId,
                                                              problemId: problemDetail.problemId,
                                                          })
                                                        : "#";

                                                    return (
                                                        <DraggableRow
                                                            key={index}
                                                            index={index}
                                                            moveRow={moveRow}
                                                            id={problem.problemId}
                                                        >
                                                            <TableCell>
                                                                <div className="flex items-center gap-2">
                                                                    <div className="cursor-move">
                                                                        <GripVertical className="h-4 w-4 text-gray-400" />
                                                                    </div>
                                                                    <Input
                                                                        type="number"
                                                                        min="1"
                                                                        value={problem.order}
                                                                        onChange={(e) =>
                                                                            handleReorderProblem(
                                                                                index,
                                                                                parseInt(
                                                                                    e.target.value,
                                                                                ) || 1,
                                                                            )
                                                                        }
                                                                        className="w-16 text"
                                                                        hidden={true}
                                                                    />
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                {problemDetail ? (
                                                                    <a
                                                                        href={problemUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-blue-600 hover:underline flex items-center gap-1"
                                                                    >
                                                                        {problemDetail.title}
                                                                        <ExternalLink className="h-3 w-3" />
                                                                    </a>
                                                                ) : (
                                                                    <span className="text-gray-400">
                                                                        問題情報なし
                                                                    </span>
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                {problemDetail ? (
                                                                    <span className="text-sm">
                                                                        {problemDetail.provider} /{" "}
                                                                        {problemDetail.contestId}
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-gray-400">
                                                                        -
                                                                    </span>
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Input
                                                                    value={problem.memo}
                                                                    onChange={(e) => {
                                                                        const newProblems = [
                                                                            ...problems,
                                                                        ];
                                                                        newProblems[index].memo =
                                                                            e.target.value;
                                                                        setProblems(newProblems);
                                                                    }}
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Input
                                                                    value={problem.hint}
                                                                    onChange={(e) => {
                                                                        const newProblems = [
                                                                            ...problems,
                                                                        ];
                                                                        newProblems[index].hint =
                                                                            e.target.value;
                                                                        setProblems(newProblems);
                                                                    }}
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        handleRemoveProblem(index)
                                                                    }
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
                >
                    <Save className="h-4 w-4" />
                    {isSubmitting ? "保存中..." : "問題リストを更新"}
                </Button>
            </CardFooter>
        </Card>
    );
}
