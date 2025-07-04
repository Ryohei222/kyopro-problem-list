import { TableCell, TableRow } from "@/components/ui/table";
import getResourceName from "@/utils/getResourceName";
import { hasContest } from "@/utils/hasContest";
import { hasDifficulty } from "@/utils/hasDifficulty";
import Image from "next/image";
import { useState } from "react";
import type { ProblemListRecordWithSolvedFlag } from "./ProblemList";

type ProblemListItemProps = {
	problemListRecord: ProblemListRecordWithSolvedFlag;
	showDifficulty: boolean;
};

export default function ProblemListItem({
	problemListRecord,
	showDifficulty,
}: ProblemListItemProps) {
	const [showHint, setShowHint] = useState(false);
	const { problem, memo, hint, order, isSolved } = problemListRecord;

	return (
		<TableRow
			key={order}
			className={isSolved ? "bg-green-200" : "hover:bg-gray-50"}
		>
			<TableCell className="font-mono">{order}</TableCell>
			<ResourceIconCell resource={problem.resource} />
			<ProblemNamesCell problem={problem} />
			{showDifficulty && <DifficultyCell problem={problem} />}
			<TableCell className="text break-words whitespace-pre-wrap max-w-xs">
				{memo}
			</TableCell>
			<HintCell hint={hint} showHint={showHint} setShowHint={setShowHint} />
		</TableRow>
	);
}

function ResourceIconCell({
	resource,
}: {
	resource: ProblemListRecordWithSolvedFlag["problem"]["resource"];
}) {
	const { logoSrc, logoAlt, bgColorClass } = getSiteLogo(resource);
	return (
		<TableCell>
			<div
				className={`inline-flex items-center justify-center ${bgColorClass} p-1.5 rounded-full`}
			>
				<Image src={logoSrc} alt={logoAlt} width={20} height={20} />
			</div>
		</TableCell>
	);
}

function ProblemNamesCell({
	problem,
}: {
	problem: ProblemListRecordWithSolvedFlag["problem"];
}) {
	return (
		<TableCell>
			<div className="items-center space-x-2">
				<div>
					<a href={problem.Url()} target="_blank" rel="noopener noreferrer">
						<div className="font-medium">{problem.Title()}</div>
						{hasContest(problem) ? (
							<div className="text-xs text-gray-500">
								{problem.ContestTitle()}
							</div>
						) : (
							<div className="text-xs text-gray-500">
								{getResourceName(problem.resource)}
							</div>
						)}
					</a>
				</div>
			</div>
		</TableCell>
	);
}

function DifficultyCell({
	problem,
}: {
	problem: ProblemListRecordWithSolvedFlag["problem"];
}) {
	return (
		<TableCell>
			<div
				className="font-mono text-sm text-center"
				style={{
					color: hasDifficulty(problem) ? problem.DifficultyColor() : "#808080",
				}}
			>
				{hasDifficulty(problem) ? problem.DifficultyLabel() : "-"}
			</div>
		</TableCell>
	);
}

function HintCell({
	hint,
	showHint,
	setShowHint,
}: {
	hint: string;
	showHint: boolean;
	setShowHint: (showHint: boolean) => void;
}) {
	return (
		<TableCell>
			<div
				className="relative group break-words whitespace-pre-wrap"
				onMouseEnter={() => setShowHint(true)}
				onMouseLeave={() => setShowHint(false)}
			>
				{hint ? (
					<>
						<div className="text-gray-400 italic cursor-help">
							{!showHint && "カーソルを合わせてヒントを表示"}
						</div>
						{showHint && (
							<div className="bg-yellow-50 p-2 rounded shadow-sm border border-yellow-200 break-words whitespace-pre-wrap">
								{hint}
							</div>
						)}
					</>
				) : (
					<span className="text-gray-400">-</span>
				)}
			</div>
		</TableCell>
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
