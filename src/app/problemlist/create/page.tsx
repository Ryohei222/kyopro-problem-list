import { CreateProblemListForm } from "@/features/problemlist/components/CreateProblemListForm";
import buildTwitterMetadata from "@/utils/buildTwitterMetaData";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "新規作成",
    twitter: buildTwitterMetadata({
        title: "新規作成",
        description: "新しい問題リストを作成するページです",
    }),
};

export default function CreateProblemSetPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">新しい問題リストを作成</h1>
            <CreateProblemListForm />
        </div>
    );
}
