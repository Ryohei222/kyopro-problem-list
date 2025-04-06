"use client";
import { useRouter } from "next/navigation";
import { getProblemSetById } from "@/features/problemset/db/ProblemSet";
import { Prisma, ProblemProvider } from "@prisma/client";
import { useState, FormEvent } from "react";
import useProblems from "@/features/problem/hooks/useProblems";
import extractProblemFromUrl from "../utils/extractProblemFromUrl";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Save, Plus, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PUTRequestBody } from "../types/api";

type ProblemSetProblemData = {
    id?: number;
    problemId: string;
    memo: string;
    hint: string;
    order: number;
};

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

    return (
        <Card className="bg-white">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">問題リスト</h3>
                <AddProblemForm onAddProblem={handleAddProblem} existingProblems={problems} />
            </div>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6 pt-6">
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

                    <div className="space-y-2">
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

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="isPublic"
                            checked={isPublic}
                            onCheckedChange={(checked) => setIsPublic(checked === true)}
                        />
                        <Label htmlFor="isPublic">公開する</Label>
                    </div>

                    <div className="space-y-4">

                        {problems.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[80px]">順序</TableHead>
                                        <TableHead>問題ID</TableHead>
                                        <TableHead>メモ</TableHead>
                                        <TableHead>ヒント</TableHead>
                                        <TableHead className="w-[100px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {problems
                                        .sort((a, b) => a.order - b.order)
                                        .map((problem, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Input
                                                        type="number"
                                                        min="1"
                                                        value={problem.order}
                                                        onChange={(e) => handleReorderProblem(index, parseInt(e.target.value) || 1)}
                                                        className="w-16"
                                                    />
                                                </TableCell>
                                                <TableCell>{problem.problemId}</TableCell>
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
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="text-center p-6 border rounded-md text-gray-500">
                                問題が追加されていません。「問題を追加」ボタンから問題を追加してください。
                            </div>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between border-t p-6">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        キャンセル
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="flex items-center gap-1">
                        <Save className="h-4 w-4" />
                        {isSubmitting ? "保存中..." : "問題リストを更新"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
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

    const resetForm = () => {
        setUrl("");
        setMemo("");
        setHint("");
        setError(null);
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

    const handleSubmit = (e: FormEvent) => {
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

        // フォームをリセットして閉じる
        resetForm();
        setShowForm(false);
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
        <Card className="p-4 border rounded-md shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
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
                        AtCoder、Codeforces、YukiCoder、AOJの問題URLを入力してください
                    </p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="memo">メモ</Label>
                    <Input
                        id="memo"
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        placeholder="問題に関するメモ"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="hint">ヒント</Label>
                    <Input
                        id="hint"
                        value={hint}
                        onChange={(e) => setHint(e.target.value)}
                        placeholder="解法のヒント"
                    />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => setShowForm(false)}>
                        キャンセル
                    </Button>
                    <Button type="submit" size="sm">
                        追加
                    </Button>
                </div>
            </form>
        </Card>
    );
}