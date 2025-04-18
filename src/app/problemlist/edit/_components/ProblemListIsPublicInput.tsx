import { Checkbox, type CheckedState } from "@radix-ui/react-checkbox";
import { Label } from "@radix-ui/react-label";
import React from "react";

export default function ProblemListIsPublicInput({
	isPublic,
	handleIsPublicChange,
}: {
	isPublic: boolean;
	handleIsPublicChange: (checked: CheckedState) => void;
}) {
	return (
		<div className="flex items-center space-x-2 mt-6 mb-8">
			<Checkbox
				id="isPublic"
				checked={isPublic}
				onCheckedChange={handleIsPublicChange}
				className={`border rounded-md w-5 h-5 flex items-center justify-center transition-colors duration-200  ${
					isPublic
						? "border-green-500 bg-green-100 text-green-700"
						: "border-gray-300 bg-white text-gray-500"
				}`}
			>
				{isPublic && (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<title>label for public</title>
						<path
							fillRule="evenodd"
							d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				)}
			</Checkbox>
			<Label htmlFor="isPublic" className="text-sm text-gray-700">
				公開する
			</Label>
		</div>
	);
}
