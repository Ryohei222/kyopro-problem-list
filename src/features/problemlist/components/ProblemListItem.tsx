import { TableCell, TableRow } from "@/components/ui/table";
import { buildProblemUrl } from "@/utils/buildProblemUrl";
import { useState } from "react";
import { ProblemListRecordResponse } from "../types/ProblemLists";
import Image from "next/image";
import getResourceName from "@/utils/getResourceName";
import { getProblemDifficultyColor } from "@/utils/getProblemDifficultyColor";

type ProblemListRecordWithSolvedFlag = ProblemListRecordResponse & {
    isSolved: boolean;
};

type ProblemListItemProps = {
    problemListRecord: ProblemListRecordWithSolvedFlag;
    shouldDisplayDifficulty: boolean;
};

export default function ProblemListItem({
    problemListRecord,
    shouldDisplayDifficulty,
}: ProblemListItemProps) {
    const [showHint, setShowHint] = useState(false);
    const { problem, memo, hint, order, isSolved } = problemListRecord;

    const { logoSrc, logoAlt, bgColorClass } = getSiteLogo(problem.resource);

    return (
        <TableRow key={order} className={isSolved ? "bg-green-200" : "hover:bg-gray-50"}>
            <TableCell className="font-mono">{order}</TableCell>
            <TableCell>
                <div
                    className={`inline-flex items-center justify-center ${bgColorClass} p-1.5 rounded-full`}
                >
                    <Image
                        src={logoSrc}
                        alt={logoAlt}
                        width={20}
                        height={20}
                        className={problem.resource.toLowerCase() === "mofe" ? "rounded-full" : ""}
                    />
                </div>
            </TableCell>
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
                            {problem.contestName
                                ? problem.contestName
                                : getResourceName(problem.resource)}
                        </div>
                    </div>
                </a>
            </TableCell>
            {shouldDisplayDifficulty && (
                <TableCell>
                    <div
                        className="font-mono text-sm"
                        style={{ color: getProblemDifficultyColor(problem) }}
                    >
                        {problem.difficulty ? problem.difficulty : "-"}
                    </div>
                </TableCell>
            )}
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

// コンテストサイトに合わせたロゴと背景色を取得する関数
function getSiteLogo(resource: string) {
    const siteName = resource.toLowerCase();

    switch (siteName) {
        case "atcoder":
            return {
                logoSrc: "/atcoder-logo.png",
                logoAlt: "AtCoder Logo",
                bgColorClass: "bg-orange-50",
            };
        case "codeforces":
            return {
                logoSrc: "/codeforces-logo.png",
                logoAlt: "Codeforces Logo",
                bgColorClass: "bg-red-50",
            };
        case "yukicoder":
            return {
                logoSrc: "/yukicoder-logo.png",
                logoAlt: "Yukicoder Logo",
                bgColorClass: "bg-green-50",
            };
        case "aoj":
            return {
                logoSrc: "/aoj-logo.ico",
                logoAlt: "AOJ Logo",
                bgColorClass: "bg-blue-50",
            };
        case "mofe":
            return {
                logoSrc: "/mofe-logo.jpg",
                logoAlt: "MOFE Logo",
                bgColorClass: "bg-purple-50",
            };
        default:
            return {
                logoSrc: "/globe.svg",
                logoAlt: "Platform Logo",
                bgColorClass: "bg-gray-50",
            };
    }
}
