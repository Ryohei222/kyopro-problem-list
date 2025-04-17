import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import type React from "react";

export default function ProblemListDescriptionInput({
	description,
	handleDescriptionChange,
}: {
	description: string;
	handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
	return (
		<div className="space-y-2 mt-6">
			<Label htmlFor="description">概要</Label>
			<Textarea
				id="description"
				value={description}
				onChange={handleDescriptionChange}
				placeholder="この問題リストの内容や目的について説明してください"
				className="min-h-[120px]"
			/>
		</div>
	);
}
