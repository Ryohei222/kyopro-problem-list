export type PUTRequestBody = {
    id: number;
    name: string;
    description: string;
    isPublic: boolean;
    problemSetProblems:
    {
        problemId: string;
        memo: string;
        hint: string;
        order: number;
    }[]
}

export type PUTResponseBody = {
    success: boolean;
}