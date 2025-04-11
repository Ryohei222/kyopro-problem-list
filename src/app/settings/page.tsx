import { redirect } from "next/navigation";
import { UserSettingsForm } from "@/features/user/components/UserSettingsForm";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { formatDate } from "@/utils/formatDate";
import { getUserSettings } from "@/features/user/db/getUserSettings";

export default async function SettingPage() {
    const user = await getUserSettings();

    if (!user) {
        redirect("/");
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        アカウント設定
                    </h1>
                    <p className="text-gray-500">プロフィール情報やアカウント設定を管理できます</p>
                </div>
                <UserSettingsForm user={user} />
                <Card>
                    <CardHeader>
                        <CardTitle>アカウント情報</CardTitle>
                        <CardDescription>アカウントに関する基本情報です</CardDescription>
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
            </div>
        </div>
    );
}
