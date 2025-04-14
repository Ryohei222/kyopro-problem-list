import { ProblemListsContainer } from "@/features/problemlist/components/ProblemListsContainer";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Kyopro Problem List",
};

export default async function HomePage(): Promise<ReactNode> {
	return (
		<div className="space-y-6">
			<ProblemListsContainer />
		</div>
	);
}
