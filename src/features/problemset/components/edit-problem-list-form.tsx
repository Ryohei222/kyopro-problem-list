"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Save, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Resolve, ReturnType } from "@/lib/utils"
import { getProblemSetById } from "../db/ProblemSet"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { EditableProblemTable } from "./editable-problem-table"

// フォームのバリデーションスキーマ
const formSchema = z.object({
    name: z
        .string()
        .min(3, { message: "リスト名は3文字以上である必要があります" })
        .max(50, { message: "リスト名は50文字以内である必要があります" }),
    description: z
        .string()
        .min(10, { message: "概要は10文字以上である必要があります" })
        .max(500, { message: "概要は500文字以内である必要があります" }),
    isPublic: z.boolean().default(true),
})

type FormValues = z.infer<typeof formSchema>
type ProblemSetData = Resolve<ReturnType<typeof getProblemSetById>>
type Problem = {
    id: string;
    contestId: string;
    problemId: string;
    name: string;
    difficulty?: number;
    order?: number;
}

export function EditProblemListForm({ problemSet }: { problemSet: ProblemSetData }) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const session = useSession()
    const [problems, setProblems] = useState<Problem[]>([])

    // 既存の問題をロード
    useEffect(() => {
        if (problemSet?.problemSetProblems) {
            const initialProblems = problemSet.problemSetProblems.map((p, index) => ({
                id: `${p.contestId}_${p.problemId}`,
                contestId: p.contestId,
                problemId: p.problemId,
                name: p.name,
                difficulty: p.difficulty,
                order: p.order ?? index
            })).sort((a, b) => (a.order || 0) - (b.order || 0))

            setProblems(initialProblems)
        }
    }, [problemSet])

    // フォームの初期値
    const defaultValues: FormValues = {
        name: problemSet.name,
        description: problemSet.description,
        isPublic: problemSet.isPublic,
    }

    // フォームの設定
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
        mode: "onChange",
    })

    // 問題の追加処理
    const handleAddProblem = async (contestId: string, problemId: string) => {
        // IDを正規化
        contestId = contestId.trim().toLowerCase();
        problemId = problemId.trim().toLowerCase();

        // 既に追加済みの問題かチェック
        const problemIdKey = `${contestId}_${problemId}`;
        if (problems.some(p => p.id === problemIdKey)) {
            toast.error("この問題は既に追加されています");
            return;
        }

        try {
            // 問題の詳細情報を取得
            const response = await fetch(`/api/problems/getById?contestId=${contestId}&problemId=${problemId}`);

            if (!response.ok) {
                throw new Error("問題が見つかりませんでした");
            }

            const problemData = await response.json();

            // 問題を追加
            const newProblem: Problem = {
                id: problemIdKey,
                contestId: problemData.contestId,
                problemId: problemData.problemId,
                name: problemData.name,
                difficulty: problemData.difficulty,
                order: problems.length
            };

            setProblems([...problems, newProblem]);
            toast.success("問題を追加しました");
        } catch (error) {
            console.error("問題追加エラー:", error);
            toast.error(error instanceof Error ? error.message : "問題の追加に失敗しました");
        }
    };

    // 問題の削除処理
    const handleRemoveProblem = (problemId: string) => {
        setProblems(problems.filter(p => p.id !== problemId));
        toast.success("問題を削除しました");
    };

    // 問題の並び替え処理
    const handleProblemsReorder = (updatedProblems: Problem[]) => {
        setProblems(updatedProblems);
    };

    // フォーム送信処理
    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);

        try {
            // 問題セットを更新するAPIリクエスト
            const response = await fetch(`/api/problemset/${problemSet.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    description: data.description,
                    isPublic: data.isPublic,
                    problems: problems.map((p, index) => ({
                        contestId: p.contestId,
                        problemId: p.problemId,
                        order: index
                    }))
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "問題リストの更新に失敗しました");
            }

            toast.success("問題リストが更新されました");
            router.push(`/problemset/show/${problemSet.id}`);
        } catch (error) {
            console.error("エラー:", error);
            toast.error(error instanceof Error ? error.message : "問題リストの更新に失敗しました");
        } finally {
            setIsSubmitting(false);
        }
    };

    // 現在のユーザーが作成者かどうかをチェック
    const isAuthor = session.data?.user.id === problemSet.author.id;

    // 権限がなければ編集不可のメッセージを表示
    if (!isAuthor) {
        return (
            <Card className="bg-white">
                <CardContent className="pt-6">
                    <h2 className="text-lg font-medium text-red-600">アクセス権限がありません</h2>
                    <p className="mt-2 text-gray-600">
                        この問題リストは他のユーザーによって作成されたため、編集することができません。
                    </p>
                    <div className="mt-4">
                        <Link href={`/problemset/show/${problemSet.id}`} className="text-blue-600 hover:underline">
                            問題リストの詳細に戻る
                        </Link>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-white">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="space-y-6 pt-6">
                        <Link href={`/problemset/show/${problemSet.id}`} className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
                            <ArrowLeft className="mr-1 h-4 w-4" />
                            問題リストの詳細に戻る
                        </Link>

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium">リスト名</FormLabel>
                                    <FormControl>
                                        <Input placeholder="例: 初心者向けグラフアルゴリズム集" {...field} />
                                    </FormControl>
                                    <FormDescription>問題リストの内容を簡潔に表す名前をつけてください</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium">概要</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="この問題リストの内容や目的について説明してください"
                                            className="min-h-[120px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        どのような問題が含まれているか、どのようなスキルを身につけられるかなどを記述してください
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isPublic"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="text-base font-medium">公開設定</FormLabel>
                                        <FormDescription>
                                            チェックを入れると、このリストは他のユーザーに公開されます。チェックを外すと、自分だけが閲覧できるプライベートリストになります。
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />

                        {/* 問題リスト編集セクション */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">問題リスト</h3>
                            <EditableProblemTable
                                problems={problems}
                                onProblemAdd={handleAddProblem}
                                onProblemRemove={handleRemoveProblem}
                                onProblemsReorder={handleProblemsReorder}
                            />
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-between border-t p-6">
                        <Button type="button" variant="outline" onClick={() => router.push(`/problemset/show/${problemSet.id}`)}>
                            キャンセル
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="flex items-center gap-1">
                            <Save className="h-4 w-4" />
                            {isSubmitting ? "保存中..." : "変更を保存"}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}