"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { UserForm, UserFormSchema } from "../types/User";
import { User } from "@prisma/client";
import { updateUser } from "../db/updateUser";
import Image from "next/image";
import { formatDate } from "@/utils/formatDate";

export function UserSettingsForm({ user }: { user: User }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // フォームの初期値
    const defaultValues: UserForm = { ...user };

    // フォームの設定
    const form = useForm<UserForm>({
        resolver: zodResolver(UserFormSchema),
        defaultValues,
        mode: "onChange",
    });

    // フォーム送信処理
    const onSubmit = async (data: UserForm) => {
        setIsSubmitting(true);

        try {
            const response = await updateUser(data);
            if (!response) {
                throw new Error("ユーザー情報の更新に失敗しました");
            }
            toast.success("設定が保存されました");
            router.refresh(); // ページを再取得して最新のデータを表示
        } catch (error) {
            console.error("エラー:", error);
            toast.error(error instanceof Error ? error.message : "設定の保存に失敗しました");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>プロフィール設定</CardTitle>
                        <CardDescription>あなたのプロフィール情報を編集できます。</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-1/3 flex justify-center items-center">
                                <Image
                                    src={user.image || "/placeholder.svg"}
                                    alt={`${user.name}のプロフィール画像`}
                                    width={200}
                                    height={200}
                                    className="rounded-full border-4 border-white shadow-md bg-white"
                                />
                            </div>

                            <div className="md:w-2/3 space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>表示名</FormLabel>
                                            <FormControl>
                                                <Input placeholder="あなたの表示名" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                他のユーザーに表示される名前です
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>自己紹介</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="あなた自身について簡単に紹介してください"
                                                    className="min-h-[100px]"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                競プロ歴や得意なアルゴリズムなどを書くと良いでしょう
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-lg font-medium mb-4">外部アカウント連携</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="atcoderId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>AtCoder ID</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="AtCoder ID"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="codeforcesId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Codeforces ID</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Codeforces ID"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="mofeId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>MOFE ID</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="MOFE ID"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="yukicoderId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>yukicoder ID</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="yukicoder ID"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="aojId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>AOJ ID</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="AOJ ID"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="xId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>X (Twitter) ID</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="X ID（@なし）"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="githubId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>GitHub ID</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="GitHub ID"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="blogURL"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ブログの URL</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="ブログの URL"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push(`/user/${user.id}`)}
                        >
                            キャンセル
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-1"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    保存中...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />
                                    変更を保存
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>アカウント情報</CardTitle>
                        <CardDescription>アカウントに関する基本情報です。</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">メールアドレス</p>
                                <p className="mt-1">{user.email}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    メールアドレスは認証プロバイダーを通じて設定されています(他のユーザーには表示されません)
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    アカウント作成日
                                </p>
                                <p className="mt-1">{formatDate(user.createdAt)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    );
}
