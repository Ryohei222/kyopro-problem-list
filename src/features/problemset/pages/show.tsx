"use client";

import { ProblemSetDetail } from "../components/problemset-detail";
import { notFound } from "next/navigation"
import { BackButton } from "../components/back-button";
import { useProblemSet } from "../hooks/useProblemSet";

export default function ProblemSetShowPage({ id }: { id: string }) {
    const { problemSet, isLoading, error } = useProblemSet(Number(id));
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }
    if (!problemSet) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <BackButton />
            <ProblemSetDetail problemset={problemSet} />
        </div>
    )
}