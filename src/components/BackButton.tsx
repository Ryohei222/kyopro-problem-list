"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="flex items-center space-x-2 h-3">
            <button
                onClick={handleBack}
                className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
            >
                <ArrowLeft className="mr-1 h-4 w-4" />
                戻る
            </button>
        </div>
    );
}
