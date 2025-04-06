"use client";
import { useRouter } from "next/navigation";
import { getProblemSetById } from "@/features/problemset/db/ProblemSet";
import { Prisma, ProblemProvider } from "@prisma/client";
import { useState, FormEvent, useEffect, useRef } from "react";
import useProblems from "@/features/problem/hooks/useProblems";
import extractProblemFromUrl from "../utils/extractProblemFromUrl";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Save, Plus, Trash2, ExternalLink, GripVertical } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PUTRequestBody } from "../types/api";
import { buildProblemUrl } from "@/features/problem/utils/buildProblemUrl";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

type ProblemSetProblemData = {
    id?: number;
    problemId: string;
    memo: string;
    hint: string;
    order: number;
};

// ドラッグ可能な行のアイテムタイプ
const ItemTypes = {
    ROW: 'row'
};

// ドラッグ可能な行コンポーネント
function DraggableRow({
    index,
    moveRow,
    children,
    id
}: {
    index: number;
    moveRow: (dragIndex: number, hoverIndex: number) => void;
    children: React.ReactNode;
    id: any;
}) {
    const ref = useRef<HTMLTableRowElement>(null);

    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.ROW,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: any, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            // 自分自身の上にドロップしても何もしない
            if (dragIndex === hoverIndex) {
                return;
            }

            // マウスの位置を取得
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

            // ドラッグしている要素が上から来た場合は、マウスが中央よりも上にあるときだけ移動する
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // ドラッグしている要素が下から来た場合は、マウスが中央よりも下にあるときだけ移動する
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // 実際に順序を入れ替える
            moveRow(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.ROW,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.5 : 1;
    drag(drop(ref));

    return (
        <TableRow
            ref={ref}
            style={{ opacity }}
            data-handler-id={handlerId}
            className="hover:bg-gray-50 cursor-move"
        >
            {children}
        </TableRow>
    );
}

export default function EditProblemListForm({ problemSet }: { problemSet: NonNullable<Prisma.PromiseReturnType<typeof getProblemSetById>> }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState(problemSet.name);
    const [description, setDescription] = useState(problemSet.description);
    const [isPublic, setIsPublic] = useState(problemSet.isPublic);
    const [problems, setProblems] = useState<ProblemSetProblemData[]>(
        problemSet.problemSetProblems.map((p) => ({
            id: p.problem.id,
            problemId: p.problem.id.toString(),
            memo: p.memo,
            hint: p.hint,
            order: p.order,
        }))
    );
    const [error, setError] = useState<string | null>(null);
    const { problems: allProblems } = useProblems();

    // 問題追加
    const handleAddProblem = (problem: ProblemSetProblemData) => {
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
        const problem = allProblems.find(p => p.id.toString() === problemId);
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
            order: idx + 1
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
                        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">{error}</div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="name">リスト名</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="例: 初心者向けグラフアルゴリズム集"
                            required
                        />
                    </div>

                    <div className="space-y-2 mt-6">
                        <Label htmlFor="description">概要</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="この問題リストの内容や目的について説明してください"
                            className="min-h-[120px]"
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-2 mt-6 mb-8">
                        <Checkbox
                            id="isPublic"
                            checked={isPublic}
                            onCheckedChange={(checked) => setIsPublic(checked === true)}
                        />
                        <Label htmlFor="isPublic">公開する</Label>
                    </div>

                    <div className="space-y-6 mt-8">
                        <div className="flex justify-between items-center">
                            <AddProblemForm onAddProblem={handleAddProblem} existingProblems={problems} />
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
                                                    const problemDetail = getProblemDetails(problem.problemId);
                                                    const problemUrl = problemDetail ? buildProblemUrl({
                                                        problemProvider: problemDetail.provider,
                                                        contestId: problemDetail.contestId,
                                                        problemId: problemDetail.problemId
                                                    }) : "#";

                                                    return (
                                                        <DraggableRow key={index} index={index} moveRow={moveRow} id={problem.problemId}>
                                                            <TableCell>
                                                                <div className="flex items-center gap-2">
                                                                    <div className="cursor-move">
                                                                        <GripVertical className="h-4 w-4 text-gray-400" />
                                                                    </div>
                                                                    <Input
                                                                        type="number"
                                                                        min="1"
                                                                        value={problem.order}
                                                                        onChange={(e) => handleReorderProblem(index, parseInt(e.target.value) || 1)}
                                                                        className="w-16 text"
                                                                        hidden={true}
                                                                    />
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                {problemDetail ? (
                                                                    <a href={problemUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                                                                        {problemDetail.title}
                                                                        <ExternalLink className="h-3 w-3" />
                                                                    </a>
                                                                ) : (
                                                                    <span className="text-gray-400">問題情報なし</span>
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                {problemDetail ? (
                                                                    <span className="text-sm">
                                                                        {problemDetail.provider} / {problemDetail.contestId}
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-gray-400">-</span>
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Input
                                                                    value={problem.memo}
                                                                    onChange={(e) => {
                                                                        const newProblems = [...problems];
                                                                        newProblems[index].memo = e.target.value;
                                                                        setProblems(newProblems);
                                                                    }}
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Input
                                                                    value={problem.hint}
                                                                    onChange={(e) => {
                                                                        const newProblems = [...problems];
                                                                        newProblems[index].hint = e.target.value;
                                                                        setProblems(newProblems);
                                                                    }}
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => handleRemoveProblem(index)}
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
        </Card >
    );
}

function AddProblemForm({ onAddProblem, existingProblems }: {
    onAddProblem: (problem: ProblemSetProblemData) => void,
    existingProblems: ProblemSetProblemData[]
}) {
    const { problems } = useProblems();
    const [url, setUrl] = useState("");
    const [memo, setMemo] = useState("");
    const [hint, setHint] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [previewProblem, setPreviewProblem] = useState<{
        title: string;
        provider: ProblemProvider;
        contestId: string;
        problemId: string;
    } | null>(null);

    const resetForm = () => {
        setUrl("");
        setMemo("");
        setHint("");
        setError(null);
        setPreviewProblem(null);
    };

    const searchProblemFromUrl = (url: string) => {
        const extractedProblem = extractProblemFromUrl(url);
        if (!extractedProblem) {
            return null;
        }

        if (!problems) {
            return null;
        }

        const ret = problems.find(
            (p) =>
                p.provider === extractedProblem.problemProvider &&
                p.contestId === extractedProblem.contestId &&
                p.problemId === extractedProblem.problemId
        ) || null;
        console.log("searchProblemFromUrl", extractedProblem, ret);
        return ret;
    };

    // URLが変更されたときに問題情報を検索して表示
    useEffect(() => {
        if (url.trim() === "") {
            setPreviewProblem(null);
            setError(null);
            return;
        }

        const problem = searchProblemFromUrl(url);
        if (!problem) {
            setPreviewProblem(null);
            setError("指定されたURLから問題を見つけることができませんでした");
            return;
        }

        // 問題が既に追加されているか確認
        const isDuplicate = existingProblems.some(p => p.problemId === problem.id.toString());
        if (isDuplicate) {
            setPreviewProblem(null);
            setError("この問題は既にリストに追加されています");
            return;
        }

        setError(null);
        setPreviewProblem({
            title: problem.title,
            provider: problem.provider,
            contestId: problem.contestId,
            problemId: problem.problemId
        });
    }, [url, problems, existingProblems]);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setError(null);

        // URLから問題を検索
        const problem = searchProblemFromUrl(url);
        if (!problem) {
            setError("指定されたURLから問題を見つけることができませんでした");
            return;
        }

        // 問題が既に追加されているか確認
        const isDuplicate = existingProblems.some(p => p.problemId === problem.id.toString());
        if (isDuplicate) {
            setError("この問題は既にリストに追加されています");
            return;
        }

        // 新しい問題の順序は既存の問題の最大順序+1
        const maxOrder = existingProblems.length > 0
            ? Math.max(...existingProblems.map(p => p.order))
            : 0;

        // 問題を追加
        onAddProblem({
            problemId: problem.id.toString(),
            memo,
            hint,
            order: maxOrder + 1,
        });

        // フォームをリセットするが閉じない
        resetForm();
        // setShowForm(false); // この行を削除
    };

    if (!showForm) {
        return (
            <Button
                type="button"
                onClick={() => setShowForm(true)}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
            >
                <Plus className="h-4 w-4" />
                問題を追加
            </Button>
        );
    }

    return (
        <Card className="p-4 border rounded-md shadow-sm w-full">
            <div className="space-y-4">
                <h4 className="font-medium">新しい問題を追加</h4>

                {error && (
                    <div className="p-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">{error}</div>
                )}

                <div className="space-y-2">
                    <Label htmlFor="url">問題URL</Label>
                    <Input
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://atcoder.jp/contests/abc123/tasks/abc123_a"
                        required
                    />
                    <p className="text-xs text-gray-500">
                        AtCoder / Codeforces / yukicoder / AOJ の問題URLを入力してください
                    </p>
                </div>

                {previewProblem && (
                    <div className="p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-md space-y-2">
                        <h5 className="font-medium">追加する問題:</h5>
                        <div className="text-sm">
                            <div><span className="font-semibold">タイトル:</span> {previewProblem.title}</div>
                            <div>
                                <span className="font-semibold">出典:</span>
                                {previewProblem.provider} / {previewProblem.contestId} / {previewProblem.problemId}
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-2">
                    <Label htmlFor="memo">メモ</Label>
                    <Textarea
                        id="memo"
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        className="min-h-[120px]"
                        placeholder="問題に関するメモ"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="hint">ヒント</Label>
                    <Textarea
                        id="hint"
                        value={hint}
                        onChange={(e) => setHint(e.target.value)}
                        className="min-h-[120px]"
                        placeholder="解法のヒント"
                    />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => setShowForm(false)}>
                        キャンセル
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        onClick={handleSubmit}
                        disabled={!previewProblem}
                    >
                        追加
                    </Button>
                </div>
            </div>
        </Card>
    );
}