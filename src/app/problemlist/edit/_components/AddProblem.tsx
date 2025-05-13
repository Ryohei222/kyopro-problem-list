import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { ProblemListItem } from "@/features/problemlist/types/ProblemListItemSchema";
import useProblems from "@/hooks/useProblems";
import type { CommonProblem } from "@/types/CommonProblem";
import { createProblemKey } from "@/types/CommonProblem";
import extractProblemFromUrl from "@/utils/extractProblemFromUrl";
import getResourceName from "@/utils/getResourceName";
import { Label } from "@radix-ui/react-label";
import getUrls from "get-urls";
import { Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";

function searchProblemFromUrl(
	url: string,
	problems: CommonProblem[],
): CommonProblem | null {
	const extractedProblem = extractProblemFromUrl(url);
	if (!extractedProblem) {
		return null;
	}
	if (!problems) {
		return null;
	}
	const ret =
		problems.find(
			(p) => p.ProblemKey() === createProblemKey(extractedProblem),
		) || null;
	return ret;
}

function ProblemUrlErrorHelpComponent() {
	return (
		<>
			<pre className="text-sm text-gray-700 whitespace-pre-wrap">
				次の形式で URL を入力してください:
				{"\n"}AOJ: https://onlinejudge.u-aizu.ac.jp/problems/0123 (URL
				の末尾に問題 ID が存在すれば可)
				{"\n"}AtCoder: https://atcoder.jp/contests/abc123/tasks/abc123_a
				{"\n"}Codeforces: https://codeforces.com/contest/123/problem/A
				{"\n"}MOFE: https://mofecoder.com/contests/tea001/tasks/tea001_a
				{"\n"}yukicoder: https://yukicoder.me/problems/no/123
			</pre>
		</>
	);
}

export default function AddProblemForm({
	onAddProblem,
	existingProblems,
}: {
	onAddProblem: (problem: ProblemListItem) => void;
	existingProblems: ProblemListItem[];
}) {
	const { problems, isLoading: isProblemsLoading } = useProblems();
	const [urlsText, setUrlsText] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [showForm, setShowForm] = useState(false);

	const [previewProblems, setPreviewProblems] = useState<CommonProblem[]>([]);

	const resetForm = () => {
		setUrlsText("");
		setError(null);
		setPreviewProblems([]);
	};

	function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
		setUrlsText(e.target.value);
		const newUrlsText = e.target.value;

		if (newUrlsText.trim() === "") {
			setPreviewProblems([]);
			setError(null);
			return;
		}

		if (!problems) {
			setPreviewProblems([]);
			setError("問題のリストが読み込まれていません");
			return;
		}

		const urls = Array.from(getUrls(newUrlsText));

		const extractedProblems = urls
			.map((url) => {
				return searchProblemFromUrl(url, problems);
			})
			.filter((problem): problem is CommonProblem => problem !== null);

		if (extractedProblems.length === 0) {
			setPreviewProblems([]);
			setError("指定されたURLから問題を見つけることができませんでした\n");
			return;
		}

		const existingProblemKeys = new Set(
			existingProblems.map((problem) => problem.problem.ProblemKey()),
		);

		const newProblems = extractedProblems.filter(
			(problem) => !existingProblemKeys.has(problem.ProblemKey()),
		);

		setError(null);
		setPreviewProblems(newProblems);
	}

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation(); // 親フォームへのイベントの伝播を防止
		setError(null);

		if (!problems) {
			setPreviewProblems([]);
			setError("問題のリストが読み込まれていません");
			return;
		}

		if (previewProblems.length === 0) {
			setError("新しい問題が見つかりませんでした");
			return;
		}

		let indexToInsert = existingProblems.length + 1;

		for (const problem of previewProblems) {
			onAddProblem({
				problem,
				memo: "",
				hint: "",
				order: indexToInsert++,
			});
		}

		resetForm();
	};

	if (!showForm) {
		return (
			<Button
				type="button"
				onClick={() => setShowForm(true)}
				variant="outline"
				size="sm"
				className="flex items-center gap-1"
			>
				<Plus className="h-4 w-4" />
				問題を追加
			</Button>
		);
	}

	return (
		<>
			{isProblemsLoading ? (
				<span>Loading...</span>
			) : (
				<Card className="p-4 border rounded-md shadow-sm w-full">
					<div className="space-y-4">
						<h4 className="font-medium">新しい問題を追加</h4>

						{error && (
							<div className="p-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
								<ProblemUrlErrorHelpComponent />
								<p className="mt-2">{error}</p>
							</div>
						)}

						<div className="space-y-2">
							<Label htmlFor="url">問題URL</Label>
							<Input
								id="url"
								value={urlsText}
								onChange={handleUrlChange}
								placeholder="https://atcoder.jp/contests/abc123/tasks/abc123_a"
								required
							/>
							<p className="text-xs text-gray-500">
								AOJ / AtCoder / Codeforces / MOFE / yukicoder の問題 URL
								が含まれる文字列を入力してください。スペースや改行、日本語などで区切られている場合、複数の問題
								URL を一度に入力することができます。
							</p>
						</div>

						{previewProblems.length > 0 && (
							<div className="p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-md space-y-2">
								<h5 className="font-medium">検出された新しい問題:</h5>
								<ul className="list-disc list-inside text-sm">
									{previewProblems.map((problem) => (
										<li key={problem.ProblemKey()}>
											{problem.Title()} - {getResourceName(problem.resource)}
										</li>
									))}
								</ul>
							</div>
						)}

						<div className="flex justify-end gap-2 pt-2">
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => setShowForm(false)}
							>
								キャンセル
							</Button>
							<Button
								type="button"
								size="sm"
								onClick={handleSubmit}
								disabled={!previewProblems}
							>
								追加
							</Button>
						</div>
					</div>
				</Card>
			)}
		</>
	);
}
