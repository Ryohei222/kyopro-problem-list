"use client";

import useSWR from 'swr';
import { Problem } from '../types/Problem';

async function fetcher(key: string) {
    return fetch(key).then((res) => res.json() as Promise<Problem[] | null>);
}

export const useProblems = () => {
    const { data, error, isLoading } = useSWR(`/api/problems`, fetcher);
    return {
        problems: data,
        isLoading,
        error,
    }
}