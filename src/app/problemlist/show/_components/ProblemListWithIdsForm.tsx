"use client";

import { useSubmissions } from "@/hooks/useSubmissions";
import { type ProblemKey, createProblemKey } from "@/types/CommonProblem";
import { useEffect, useState } from "react";
import type { ProblemListRecordResponse } from "../../../../features/problemlist/types/ProblemLists";

import type { getUser } from "@/features/user/db/getUser";
import { Resource } from "@prisma/client";
import { ProblemList } from "./ProblemList";

type ProblemListWithIdsFormProps = {
	problemListRecords: ProblemListRecordResponse[];
	user: Awaited<ReturnType<typeof getUser>> | null;
};

export function ProblemListWithIdsForm({
	problemListRecords,
	user,
}: ProblemListWithIdsFormProps) {
	const [userIds, setUserIds] = useState({
		atcoder: user?.atcoderId || "",
		aoj: user?.aojId || "",
		yukicoder: user?.yukicoderId || "",
		codeforces: user?.codeforcesId || "",
	});

	const [acProblems, setAcProblems] = useState<Set<ProblemKey>>(new Set());

	const { submissions: aojSubmissions, trigger: aojTrigger } = useSubmissions(
		Resource.AOJ,
		userIds.aoj,
	);
	const { submissions: atcoderSubmissions, trigger: atcoderTrigger } =
		useSubmissions(Resource.ATCODER, userIds.atcoder);
	const { submissions: codeforcesSubmissions, trigger: codeforcesTrigger } =
		useSubmissions(Resource.CODEFORCES, userIds.codeforces);
	const { submissions: yukicoderSubmissions, trigger: yukicoderTrigger } =
		useSubmissions(Resource.YUKICODER, userIds.yukicoder);

	const handleFetchSubmissions = async () => {
		aojTrigger(userIds.aoj);
		atcoderTrigger(userIds.atcoder);
		codeforcesTrigger(userIds.codeforces);
		yukicoderTrigger(userIds.yukicoder);
	};

	useEffect(() => {
		const submissions = [
			aojSubmissions || [],
			atcoderSubmissions || [],
			codeforcesSubmissions || [],
			yukicoderSubmissions || [],
		].flat();
		const acSet = new Set<ProblemKey>(
			submissions.map((submission) => submission.ProblemKey()),
		);
		setAcProblems(acSet);
	}, [
		atcoderSubmissions,
		aojSubmissions,
		yukicoderSubmissions,
		codeforcesSubmissions,
	]);

	return (
		<div className="space-y-4">
			<div className="mb-4 flex flex-wrap gap-4">
				<div className="flex flex-col">
					<label
						htmlFor="aoj-id"
						className="text-sm font-medium text-gray-700 mb-1"
					>
						AOJ ID
					</label>
					<input
						id="aoj-id"
						type="text"
						placeholder="Enter AOJ ID"
						value={userIds.aoj}
						onChange={(e) => setUserIds({ ...userIds, aoj: e.target.value })}
						className="border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>

				<div className="flex flex-col">
					<label
						htmlFor="atcoder-id"
						className="text-sm font-medium text-gray-700 mb-1"
					>
						AtCoder ID
					</label>
					<input
						id="atcoder-id"
						type="text"
						placeholder="Enter AtCoder ID"
						value={userIds.atcoder}
						onChange={(e) =>
							setUserIds({ ...userIds, atcoder: e.target.value })
						}
						className="border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>

				<div className="flex flex-col">
					<label
						htmlFor="codeforces-id"
						className="text-sm font-medium text-gray-700 mb-1"
					>
						Codeforces ID
					</label>
					<input
						id="codeforces-id"
						type="text"
						placeholder="Enter Codeforces ID"
						value={userIds.codeforces}
						onChange={(e) =>
							setUserIds({ ...userIds, codeforces: e.target.value })
						}
						className="border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>

				<div className="flex flex-col">
					<label
						htmlFor="yukicoder-id"
						className="text-sm font-medium text-gray-700 mb-1"
					>
						yukicoder ID
					</label>
					<input
						id="yukicoder-id"
						type="text"
						placeholder="Enter yukicoder ID"
						value={userIds.yukicoder}
						onChange={(e) =>
							setUserIds({ ...userIds, yukicoder: e.target.value })
						}
						className="border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>

				<button
					type="button"
					onClick={handleFetchSubmissions}
					className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
				>
					Check Submissions
				</button>
			</div>
			<ProblemList
				problemListRecords={problemListRecords.map((problemListRecord) => ({
					...problemListRecord,
					isSolved: acProblems.has(problemListRecord.problem.ProblemKey()),
				}))}
			/>
		</div>
	);
}
