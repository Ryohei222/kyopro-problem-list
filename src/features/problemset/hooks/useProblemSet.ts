"use client";

import useSWR from 'swr';
import { getProblemSetById } from '../db/ProblemSet';
import { Prisma } from '@prisma/client';

type ProblemSet = Prisma.PromiseReturnType<typeof getProblemSetById>;

async function fetcher(key: string) {
    return fetch(key).then((res) => res.json() as Promise<ProblemSet | null>);
}

export const useProblemSet = (id: number) => {
    const { data, error, isLoading } = useSWR(`/api/problemset/${id}`, fetcher);
    return {
        problemSet: data,
        isLoading,
        error,
    }
}