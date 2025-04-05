"use client";
import axios, { AxiosRequestConfig } from "axios";
import { getProblemSetById } from "@/features/problemset/db/ProblemSet";
import { Prisma, ProblemSetProblem } from "@prisma/client";
import { useState } from "react";
import useProblems from "@/features/problem/hooks/useProblems";
import extractProblemFromUrl from "../utils/extractProblemFromUrl";


export default function EditProblemListForm({ problemSet }: { problemSet: NonNullable<Prisma.PromiseReturnType<typeof getProblemSetById>> }) {
    const [editProblemSet, setEditProblemSet] = useState(problemSet);

    const handleProblemSetChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    }

    const handleAddProblem = async (newProblem: ProblemSetProblem) => {
        const newEditProblemSet = editProblemSet;
        newEditProblemSet.problemSetProblems.push(newProblem);
    }

    return (
        <div>
            <form action="">

            </form>
        </div>);
}

export function AddProblemForm() {
    const { problems } = useProblems();

    function searchProblemFromUrl(url: string) {
        const problem = extractProblemFromUrl(url);
        if (!problem) {
            return null;
        }
        for (const p of problems) {
            if (p.contestId === problem.contestId && p.problemId === problem.problemId) {
                return p;
            }
        }
        return null;
    }

    function addProblem(formData: FormData) {
        const url = formData.get("url") as string;
        const memo = formData.get("memo") as string;
        const hint = formData.get("hint") as string;
        const problem = searchProblemFromUrl(url);

        if (!problem) {
            return;
        }

        const newProblemSetProblem = {

        } satisfies ProblemSetProblem;

    }
    return (
        <div>
            <form action="">

            </form>
        </div>);
}