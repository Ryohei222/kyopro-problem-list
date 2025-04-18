import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import type React from "react";

export default function ProblemListNameInput({
	name,
	handleNameChange,
}: {
	name: string;
	handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
	return (
		<div className="space-y-2">
			<Label htmlFor="name">リスト名</Label>
			<Input
				id="name"
				value={name}
				onChange={handleNameChange}
				placeholder="例: 初心者向けグラフアルゴリズム集"
				required
			/>
		</div>
	);
}
