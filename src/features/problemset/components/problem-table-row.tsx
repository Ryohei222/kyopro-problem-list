import { TableCell, TableRow } from "@/components/ui/table";
import { ProblemSetProblem } from "../types/ProblemSetProblem";
import { buildProblemUrl } from "@/features/problemset/utils/buildProblemUrl";
import { useState } from "react";

export default function ProblemTableRow({
    problemSetProblem,
}: {
    problemSetProblem: ProblemSetProblem;
}) {
    const [showHint, setShowHint] = useState(false);

    return (
        <TableRow key={problemSetProblem.order} className="hover:bg-gray-50">
            <TableCell className="font-mono">{problemSetProblem.order}</TableCell>
            <TableCell>
                <a
                    href={buildProblemUrl({
                        problemProvider: problemSetProblem.problemProvider,
                        problemId: problemSetProblem.problemId,
                        contestId: problemSetProblem.contestId,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2"
                >
                    <div>
                        <div className="font-medium">{problemSetProblem.title}</div>
                        <div className="text-xs text-gray-500">
                            {problemSetProblem.problemProvider.toLowerCase() +
                                (problemSetProblem.problemProvider === "ATCODER" ||
                                problemSetProblem.problemProvider === "CODEFORCES"
                                    ? " - " + problemSetProblem.contestId
                                    : "")}
                        </div>
                    </div>
                </a>
            </TableCell>
            <TableCell className="text">{problemSetProblem.memo}</TableCell>
            <TableCell
                className="relative group"
                onMouseEnter={() => setShowHint(true)}
                onMouseLeave={() => setShowHint(false)}
            >
                {problemSetProblem.hint ? (
                    <>
                        <div className="text-gray-400 italic cursor-help">
                            {!showHint && "カーソルを合わせてヒントを表示"}
                        </div>
                        {showHint && (
                            <div className="bg-yellow-50 p-2 rounded shadow-sm border border-yellow-200">
                                {problemSetProblem.hint}
                            </div>
                        )}
                    </>
                ) : (
                    <span className="text-gray-400">-</span>
                )}
            </TableCell>
        </TableRow>
    );
}
