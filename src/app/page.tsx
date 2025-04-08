import { ReactNode } from "react";
import { ProblemListsContainer } from "@/features/problemlist/components/ProblemListsContainer";

export default async function HomePage(): Promise<ReactNode> {
    return <ProblemListsContainer />;
}
