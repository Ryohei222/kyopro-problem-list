"use client";

import useProblems from "@/hooks/useProblems";

export default function Page() {
	const { problems, isLoading, error } = useProblems();
	if (isLoading) {
		return <div>Loading...</div>;
	}
	return <>{problems[0].Url()}</>;
}
