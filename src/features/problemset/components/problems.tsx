"use client";

import useProblems from "../hooks/useProblems";

export default function Problems() {
    const { problems } = useProblems();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">問題一覧</h1>
            <ul>
                {problems.map((problem) => (
                    <li
                        key={problem.provider + problem.contestId + problem.problemId}
                        className="mb-2"
                    >
                        {problem.provider} {problem.contestId} {problem.problemId} {problem.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
