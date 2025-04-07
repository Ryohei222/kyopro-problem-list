import { Checkbox, CheckedState } from "@radix-ui/react-checkbox";
import { Label } from "@radix-ui/react-label";
import React from "react";

export default function ProblemSetIsPublicInput({
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
                className="border border-gray-300 rounded-sm w-4 h-4"
            />
            <Label htmlFor="isPublic" className="text-sm text-gray-700">
                公開する
            </Label>
        </div>
    );
}
