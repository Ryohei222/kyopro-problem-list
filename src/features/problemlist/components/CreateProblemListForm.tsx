"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { createProblemList } from "../db/createProblemList";

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
});

type FormValues = z.infer<typeof formSchema>;

export function CreateProblemListForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // フォームの初期値
    const defaultValues: Partial<FormValues> = {
        name: "",
        description: "",
        isPublic: true,
    };

    // フォームの設定
    const form = useForm<FormValues>({
        defaultValues,
        mode: "onChange",
    });

    // フォーム送信処理
    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);

        try {
            const response = await createProblemList(data.name, data.description);

            setTimeout(() => {
                router.push(`/problemlist/show/${response.id}`);
            }, 1000);
        } catch (error) {
            console.error("エラー:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="bg-white">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="space-y-6 p-4">
                        <Link
                            href="/"
                            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
                        >
                            <ArrowLeft className="mr-1 h-4 w-4" />
                            問題リスト一覧に戻る
                        </Link>

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium">
                                        リスト名
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="例: 初心者向けグラフアルゴリズム集"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        問題リストの内容を簡潔に表す名前をつけてください
                                    </FormDescription>
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
                                        問題リストの内容や目的について説明してください
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
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="text-base font-medium">
                                            公開設定
                                        </FormLabel>
                                        <FormDescription>
                                            チェックを入れると、このリストはトップページやあなたのプロフィールに表示されます。
                                            <br />
                                            チェックを外すと、リンクを知っている人のみが閲覧できるリストになります。
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </CardContent>

                    <CardFooter className="flex justify-between border-t p-6">
                        <Button type="button" variant="outline" onClick={() => router.push("/")}>
                            キャンセル
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-1"
                        >
                            <Save className="h-4 w-4" />
                            {isSubmitting ? "保存中..." : "問題リストを作成"}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}
