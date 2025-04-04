"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { AvatarUpload } from "@/components/avatar-upload"
import { Save, Loader2 } from "lucide-react"

type UserProps = {
    id: string
    name: string
    username: string
    bio: string
    avatarUrl: string
    atcoderId?: string
    codeforcesId?: string
    twitterId?: string
    githubId?: string
    email: string
}

// フォームのバリデーションスキーマ
const formSchema = z.object({
    name: z
        .string()
        .min(2, { message: "名前は2文字以上である必要があります" })
        .max(50, { message: "名前は50文字以内である必要があります" }),
    bio: z.string().max(500, { message: "自己紹介は500文字以内である必要があります" }).optional(),
    atcoderId: z.string().max(50, { message: "AtCoder IDは50文字以内である必要があります" }).optional().or(z.literal("")),
    codeforcesId: z
        .string()
        .max(50, { message: "Codeforces IDは50文字以内である必要があります" })
        .optional()
        .or(z.literal("")),
    twitterId: z.string().max(15, { message: "Twitter IDは15文字以内である必要があります" }).optional().or(z.literal("")),
    githubId: z.string().max(39, { message: "GitHub IDは39文字以内である必要があります" }).optional().or(z.literal("")),
    avatarUrl: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function UserSettingsForm({ user }: { user: UserProps }) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(user.avatarUrl || null)

    // フォームの初期値
    const defaultValues: Partial<FormValues> = {
        name: user.name,
        bio: user.bio || "",
        atcoderId: user.atcoderId || "",
        codeforcesId: user.codeforcesId || "",
        twitterId: user.twitterId || "",
        githubId: user.githubId || "",
        avatarUrl: user.avatarUrl,
    }

    // フォームの設定
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
        mode: "onChange",
    })

    // フォーム送信処理
    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true)

        try {
            // ここで実際のAPIリクエストを行う
            console.log("送信データ:", data)

            // 成功したらユーザーページにリダイレクト（実際の実装では適切なエラーハンドリングを追加）
            setTimeout(() => {
                alert("設定が保存されました！")
                router.push(`/user/${user.id}`)
            }, 1000)
        } catch (error) {
            console.error("エラー:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

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
                                    name="avatarUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>プロフィール画像</FormLabel>
                                            <FormControl>
                                                <AvatarUpload
                                                    currentAvatar={avatarPreview}
                                                    onAvatarChange={(url) => {
                                                        setAvatarPreview(url)
                                                        field.onChange(url)
                                                    }}
                                                />
                                            </FormControl>
                                            <FormDescription>JPG、PNG、GIF形式、最大2MBまで</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="md:w-2/3 space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>名前</FormLabel>
                                            <FormControl>
                                                <Input placeholder="あなたの名前" {...field} />
                                            </FormControl>
                                            <FormDescription>他のユーザーに表示される名前です</FormDescription>
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
                                                />
                                            </FormControl>
                                            <FormDescription>競プロ歴や得意なアルゴリズムなどを書くと良いでしょう</FormDescription>
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
                                                <Input placeholder="AtCoder ID" {...field} />
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
                                                <Input placeholder="Codeforces ID" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="twitterId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Twitter ID</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Twitter ID（@なし）" {...field} />
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
                                                <Input placeholder="GitHub ID" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-6">
                        <Button type="button" variant="outline" onClick={() => router.push(`/user/${user.id}`)}>
                            キャンセル
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="flex items-center gap-1">
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
                                <p className="mt-1">{user.username}</p>
                                <p className="text-xs text-gray-500 mt-1">ユーザー名は変更できません</p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-500">メールアドレス</p>
                                <p className="mt-1">{user.email}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    <a href="/settings/email" className="text-blue-600 hover:underline">
                                        メールアドレスを変更
                                    </a>
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}