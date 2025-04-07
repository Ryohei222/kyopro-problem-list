"use client";

import useSWR from "swr";
import { API_URLS } from "../constants/api-urls";
import AOJProblemsFetcher from "../utils/fetchers/AOJProblemsFetcher";
import AtCoderProblemsFetcher from "../utils/fetchers/AtCoderProblemsFetcher";
import CodeforcesProblemsFetcher from "../utils/fetchers/CodeforcesProblemsFetcher";
import YukicoderProblemsFetcher from "../utils/fetchers/YukicoderProblemsFetcher";

export default function useProblems() {
    const {
        data: atcoderData,
        error: atcoderError,
        isLoading: atcoderIsLoading,
    } = useSWR(API_URLS.ATCODER, AtCoderProblemsFetcher);
    const {
        data: codeforcesData,
        error: codeforcesError,
        isLoading: codeforcesIsLoading,
    } = useSWR(API_URLS.CODEFORCES, CodeforcesProblemsFetcher);
    const {
        data: aojData,
        error: aojError,
        isLoading: aojIsLoading,
    } = useSWR(API_URLS.AOJ, AOJProblemsFetcher);
    const {
        data: yukicoderData,
        error: yukicoderError,
        isLoading: yukicoderIsLoading,
    } = useSWR(API_URLS.YUKICODER, YukicoderProblemsFetcher);

    return {
        problems: [
            ...(atcoderData || []),
            ...(codeforcesData || []),
            ...(aojData || []),
            ...(yukicoderData || []),
        ],
        isLoading: atcoderIsLoading || codeforcesIsLoading || aojIsLoading || yukicoderIsLoading,
        error: atcoderError || codeforcesError || aojError || yukicoderError,
    };
}
