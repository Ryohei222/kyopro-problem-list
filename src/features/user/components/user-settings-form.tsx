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
import { z } from "zod";
import { Save, Loader2 } from "lucide-react";
import { AvatarUpload } from "./avater-upload";
import { toast } from "sonner";

type UserProps = {
    id: string;
    name: string;
    displayName?: string;
    bio?: string | null;
    image?: string | null;
    AtCoderId?: string | null;
    CodeforcesId?: string | null;
    XId?: string | null;
    GitHubId?: string | null;
    email: string;
    createdAt: Date;
    updatedAt: Date;
};

// フォームのバリデーションスキーマ
const formSchema = z.object({
    displayName: z
        .string()
        .min(2, { message: "名前は2文字以上である必要があります" })
        .max(50, { message: "名前は50文字以内である必要があります" }),
    bio: z
        .string()
        .max(500, { message: "自己紹介は500文字以内である必要があります" })
        .optional()
        .nullable(),
    AtCoderId: z
        .string()
        .max(50, { message: "AtCoder IDは50文字以内である必要があります" })
        .optional()
        .nullable(),
    CodeforcesId: z
        .string()
        .max(50, { message: "Codeforces IDは50文字以内である必要があります" })
        .optional()
        .nullable(),
    XId: z
        .string()
        .max(15, { message: "X(Twitter) IDは15文字以内である必要があります" })
        .optional()
        .nullable(),
    GitHubId: z
        .string()
        .max(39, { message: "GitHub IDは39文字以内である必要があります" })
        .optional()
        .nullable(),
    image: z.string().optional().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

export function UserSettingsForm({ user }: { user: UserProps }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(user.image || null);

    // フォームの初期値
    const defaultValues: Partial<FormValues> = {
        displayName: user.displayName || user.name,
        bio: user.bio || "",
        AtCoderId: user.AtCoderId || "",
        CodeforcesId: user.CodeforcesId || "",
        XId: user.XId || "",
        GitHubId: user.GitHubId || "",
        image: user.image || null,
    };

    // フォームの設定
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
        mode: "onChange",
    });

    // フォーム送信処理
    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);

        try {
            // APIリクエストを実行
            const response = await fetch(`/api/user/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "設定の保存に失敗しました");
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
                            <div className="md:w-1/3">
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>プロフィール画像</FormLabel>
                                            <FormControl>
                                                <AvatarUpload
                                                    currentAvatar={avatarPreview}
                                                    onAvatarChange={(url) => {
                                                        setAvatarPreview(url);
                                                        field.onChange(url);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                JPG、PNG、GIF形式、最大2MBまで
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="md:w-2/3 space-y-4">
                                <FormField
                                    control={form.control}
                                    name="displayName"
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
                                    name="AtCoderId"
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
                                    name="CodeforcesId"
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
                                    name="XId"
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
                                    name="GitHubId"
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
                                <p className="text-sm font-medium text-gray-500">ユーザー名</p>
                                <p className="mt-1">{user.name}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    ユーザー名は変更できません
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-500">メールアドレス</p>
                                <p className="mt-1">{user.email}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    メールアドレスは認証プロバイダーを通じて設定されています
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    );
}
