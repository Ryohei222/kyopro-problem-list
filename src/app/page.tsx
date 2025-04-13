import { ReactNode } from "react";
import { ProblemListsContainer } from "@/features/problemlist/components/ProblemListsContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kyopro Problem List",
};

export default async function HomePage(): Promise<ReactNode> {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-6">問題リスト一覧</h1>
            <ProblemListsContainer />
        </div>
    );
}
