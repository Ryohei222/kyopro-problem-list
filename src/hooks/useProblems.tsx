"use client";

import { fetchProblems } from "@/features/onlinejudge/fetchProblems";
import useSWR from "swr";

export default function useProblems() {
	const { data, error, isLoading } = useSWR("/problems", fetchProblems);

	return { problems: data, isLoading, error };
}
