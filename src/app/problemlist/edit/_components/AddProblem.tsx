import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { AojProblem } from "@/features/onlinejudge/aoj/Problem";
import type { AtcoderProblem } from "@/features/onlinejudge/atcoder/Problem";
import type { CodeforcesProblem } from "@/features/onlinejudge/codeforces/Problem";
import type { MofeProblem } from "@/features/onlinejudge/mofe/Problem";
import type { YukicoderProblem } from "@/features/onlinejudge/yukicoder/Problem";
import type { ProblemListItem } from "@/features/problemlist/types/ProblemListItemSchema";
import useProblems from "@/hooks/useProblems";
import type { CommonProblem, OnlineJudgeProblem } from "@/types/CommonProblem";
import { createProblemKey } from "@/types/CommonProblem";
import extractProblemFromUrl from "@/utils/extractProblemFromUrl";
import getResourceName from "@/utils/getResourceName";
import { Label } from "@radix-ui/react-label";
import { Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import type { ProblemListRecordResponse } from "../../../../features/problemlist/types/ProblemLists";

type Problem =
	| AojProblem
	| AtcoderProblem
	| CodeforcesProblem
	| MofeProblem
	| YukicoderProblem;

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
				{"\n"}AOJ: https://onlinejudge.u-aizu.ac.jp/problems/0123
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
	const [url, setUrl] = useState("");
	const [memo, setMemo] = useState("");
	const [hint, setHint] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [showForm, setShowForm] = useState(false);

	const [previewProblem, setPreviewProblem] = useState<CommonProblem | null>(
		null,
	);

	const resetForm = () => {
		setUrl("");
		setMemo("");
		setHint("");
		setError(null);
		setPreviewProblem(null);
	};

	function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
		setUrl(e.target.value);
		const newUrl = e.target.value;

		if (newUrl.trim() === "") {
			setPreviewProblem(null);
			setError(null);
			return;
		}

		if (!problems) {
			setPreviewProblem(null);
			setError("問題のリストが読み込まれていません");
			return;
		}

		const problem = searchProblemFromUrl(newUrl, problems);

		if (!problem) {
			setPreviewProblem(null);
			setError("指定されたURLから問題を見つけることができませんでした\n");
			return;
		}

		const isDuplicate = existingProblems.some(
			(p) => p.problem.ProblemKey() === problem.ProblemKey(),
		);
		if (isDuplicate) {
			setPreviewProblem(null);
			setError("この問題は既にリストに追加されています");
			return;
		}

		setError(null);
		setPreviewProblem(problem);
	}

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation(); // 親フォームへのイベントの伝播を防止
		setError(null);

		if (!problems) {
			setPreviewProblem(null);
			setError("問題のリストが読み込まれていません");
			return;
		}

		const problem = searchProblemFromUrl(url, problems);
		if (!problem) {
			setError("指定されたURLから問題を見つけることができませんでした");
			return;
		}

		const isDuplicate = existingProblems.some(
			(p) => p.problem.ProblemKey() === problem.ProblemKey(),
		);
		if (isDuplicate) {
			setError("この問題は既にリストに追加されています");
			return;
		}

		// 新しい問題の順序は既存の問題の最大順序+1
		const newProblemOrder = existingProblems.length + 1;
		onAddProblem({
			problem,
			memo,
			hint,
			order: newProblemOrder,
		});

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
								value={url}
								onChange={handleUrlChange}
								placeholder="https://atcoder.jp/contests/abc123/tasks/abc123_a"
								required
							/>
							<p className="text-xs text-gray-500">
								AOJ / AtCoder / Codeforces / MOFE / yukicoder
								の問題URLを入力してください
							</p>
						</div>

						{previewProblem && (
							<div className="p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-md space-y-2">
								<h5 className="font-medium">追加する問題:</h5>
								<div className="text-sm">
									<div>
										<span className="font-semibold">タイトル:</span>{" "}
										{previewProblem.Title()}
									</div>
									<div>
										<span className="font-semibold">出典:</span>{" "}
										{getResourceName(previewProblem.resource)}
									</div>
								</div>
							</div>
						)}

						<div className="space-y-2">
							<Label htmlFor="memo">メモ</Label>
							<Textarea
								id="memo"
								value={memo}
								onChange={(e) => setMemo(e.target.value)}
								className="min-h-[120px]"
								placeholder="問題に関するメモ"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="hint">ヒント</Label>
							<Textarea
								id="hint"
								value={hint}
								onChange={(e) => setHint(e.target.value)}
								className="min-h-[120px]"
								placeholder="解法のヒント"
							/>
						</div>

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
								disabled={!previewProblem}
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
