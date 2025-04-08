import { TableCell, TableRow } from "@/components/ui/table";
import { buildProblemUrl } from "@/utils/buildProblemUrl";
import { useState } from "react";
import { ProblemListRecordResponse } from "../types/ProblemLists";

export default function ProblemListRecord({
    problemListRecord,
}: {
    problemListRecord: ProblemListRecordResponse;
}) {
    const [showHint, setShowHint] = useState(false);
    const { problem, memo, hint, order } = problemListRecord;
    return (
        <TableRow key={order} className="hover:bg-gray-50">
            <TableCell className="font-mono">{order}</TableCell>
            <TableCell>
                <a
                    href={buildProblemUrl(problem)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2"
                >
                    <div>
                        <div className="font-medium">{problemListRecord.problem.name}</div>
                        <div className="text-xs text-gray-500">
                            {problem.resource.toLowerCase()}
                        </div>
                    </div>
                </a>
            </TableCell>
            <TableCell className="text">{memo}</TableCell>
            <TableCell
                className="relative group"
                onMouseEnter={() => setShowHint(true)}
                onMouseLeave={() => setShowHint(false)}
            >
                {hint ? (
                    <>
                        <div className="text-gray-400 italic cursor-help">
                            {!showHint && "カーソルを合わせてヒントを表示"}
                        </div>
                        {showHint && (
                            <div className="bg-yellow-50 p-2 rounded shadow-sm border border-yellow-200">
                                {hint}
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
