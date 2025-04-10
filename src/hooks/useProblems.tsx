"use client";

import { Resource } from "@prisma/client";
import { getProblems } from "../features/externalapi/getProblems";
import useSWR from "swr";

export default function useProblems() {
    const {
        data: atcoderData,
        error: atcoderError,
        isLoading: atcoderIsLoading,
    } = useSWR(Resource.ATCODER, getProblems);
    const {
        data: codeforcesData,
        error: codeforcesError,
        isLoading: codeforcesIsLoading,
    } = useSWR(Resource.CODEFORCES, getProblems);
    const {
        data: aojData,
        error: aojError,
        isLoading: aojIsLoading,
    } = useSWR(Resource.AOJ, getProblems);
    const {
        data: yukicoderData,
        error: yukicoderError,
        isLoading: yukicoderIsLoading,
    } = useSWR(Resource.YUKICODER, getProblems);

    const {
        data: mofeData,
        error: mofeError,
        isLoading: mofeIsLoading,
    } = useSWR(Resource.MOFE, getProblems);

    return {
        problems: [
            ...(atcoderData || []),
            ...(codeforcesData || []),
            ...(aojData || []),
            ...(yukicoderData || []),
            ...(mofeData || []),
        ],
        isLoading:
            atcoderIsLoading ||
            codeforcesIsLoading ||
            aojIsLoading ||
            yukicoderIsLoading ||
            mofeIsLoading,
        error: atcoderError || codeforcesError || aojError || yukicoderError || mofeError,
    };
}
