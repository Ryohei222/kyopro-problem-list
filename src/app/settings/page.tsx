import { redirect } from "next/navigation";
import { getUserById } from "@/features/user/db/getUser";
import { UserSettingsForm } from "@/features/user/components/UserSettingForm";
import { auth } from "@/lib/auth";

export default async function SettingPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/");
    }

    const user = await getUserById(session.user.id);

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

                <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
                    <UserSettingsForm user={user} />
                </div>
            </div>
        </div>
    );
}
