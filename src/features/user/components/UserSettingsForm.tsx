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
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { UserSettingInputField } from "./UserSettingsInputField";
import {
    UserSettingsFormSchema,
    UserSettingsFormSchemaType,
} from "../types/UserSettingsFormSchema";
import { updateUser } from "../db/updateUser";
import { getUserSettings } from "../db/getUserSettings";

export function UserSettingsForm({
    user,
}: {
    user: NonNullable<Awaited<ReturnType<typeof getUserSettings>>>;
}) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const defaultValues: UserSettingsFormSchemaType = { ...user };

    const form = useForm<UserSettingsFormSchemaType>({
        resolver: zodResolver(UserSettingsFormSchema),
        defaultValues,
        mode: "onChange",
    });

    const onSubmit = async (data: UserSettingsFormSchemaType) => {
        setIsSubmitting(true);
        try {
            const response = await updateUser(data);
            if (!response) {
                throw new Error("ユーザー情報の更新に失敗しました");
            }
            router.push(`/user/${user.id}`);
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
                        <CardDescription>あなたのプロフィール情報を編集できます</CardDescription>
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
                                <UserSettingInputField
                                    name="name"
                                    control={form.control}
                                    label="表示名"
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
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="text-lg font-medium mb-4">
                                外部アカウント連携(他のユーザーに表示されます)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <UserSettingInputField
                                    name="aojId"
                                    control={form.control}
                                    label="AOJ ID"
                                    placeholder="AOJ ID"
                                />
                                <UserSettingInputField
                                    name="atcoderId"
                                    control={form.control}
                                    label="AtCoder ID"
                                    placeholder="AtCoder ID"
                                />
                                <UserSettingInputField
                                    name="codeforcesId"
                                    control={form.control}
                                    label="Codeforces ID"
                                    placeholder="Codeforces ID"
                                />
                                <UserSettingInputField
                                    name="mofeId"
                                    control={form.control}
                                    label="MOFE ID"
                                    placeholder="MOFE ID"
                                />
                                <UserSettingInputField
                                    name="yukicoderId"
                                    control={form.control}
                                    label="yukicoder ID"
                                    placeholder="yukicoder ID"
                                />
                                <UserSettingInputField
                                    name="xId"
                                    control={form.control}
                                    label="X(Twiiter) ID"
                                    placeholder="@ を除いた X ID"
                                />
                                <UserSettingInputField
                                    name="blogURL"
                                    control={form.control}
                                    label="ブログURL"
                                    placeholder="ブログURL"
                                />
                                <UserSettingInputField
                                    name="githubId"
                                    control={form.control}
                                    label="GitHub ID"
                                    placeholder="GitHub ID"
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-6">
                        <Button type="button" variant="outline" onClick={() => router.back()}>
                            戻る
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
            </form>
        </Form>
    );
}
