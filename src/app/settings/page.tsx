import { UserSettingsForm } from "@/app/settings/_components/UserSettingsForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserSettings } from "@/features/user/db/getUserSettings";
import buildTwitterMetadata from "@/utils/buildTwitterMetaData";
import { formatDate } from "@/utils/formatDate";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "設定",
  twitter: buildTwitterMetadata({
    title: "設定",
    description: "アカウント設定やプロフィール情報を管理できます",
  }),
};

export default async function SettingPage() {
  const user = await getUserSettings();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <UserSettingsForm user={user} />
        <Card>
          <CardHeader>
            <CardTitle>アカウント情報</CardTitle>
            <CardDescription>アカウントに関する基本情報です</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  メールアドレス
                </p>
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
