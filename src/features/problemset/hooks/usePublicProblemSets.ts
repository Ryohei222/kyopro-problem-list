"use client";

import useSWR from "swr";
import { getPublicProblemSets } from "../db/ProblemSet";
import { Prisma } from "@prisma/client";

type PublicProblemSets = Prisma.PromiseReturnType<typeof getPublicProblemSets>;

async function fetcher(key: string) {
  return fetch(key).then(
    (res) => res.json() as Promise<PublicProblemSets | null>,
  );
}

export const usePublicProblemSets = () => {
  const { data, error, isLoading } = useSWR(`/api/problemset`, fetcher);
  return {
    problemSets: data,
    isLoading,
    error,
  };
};
