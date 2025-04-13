import { CommonProblem } from "@/types/CommonProblem";
import { Resource } from "@prisma/client";

function getAtcoderDifficultyColor(difficulty: number) {
    if (difficulty < 400) return "#808080";
    if (difficulty < 800) return "#804000";
    if (difficulty < 1200) return "#008000";
    if (difficulty < 1600) return "#00C0C0";
    if (difficulty < 2000) return "#0000FF";
    if (difficulty < 2400) return "#C0C000";
    if (difficulty < 2800) return "#FF8000";
    if (difficulty < 3200) return "#FF0000";
    return "#FF0000";
}

function getCodeforcesDifficultyColor(difficulty: number) {
    if (difficulty < 1200) return "#808080";
    if (difficulty < 1400) return "#008000";
    if (difficulty < 1600) return "#03A89E";
    if (difficulty < 1900) return "#0000FF";
    if (difficulty < 2100) return "#AA00AA";
    if (difficulty < 2400) return "#FF8C00";
    return "#FF0000";
}

export function getProblemDifficultyColor(problem: CommonProblem): string {
    const difficulty = problem.difficulty || 0;
    if (problem.resource === Resource.ATCODER) {
        return getAtcoderDifficultyColor(difficulty);
    }
    if (problem.resource === Resource.CODEFORCES) {
        return getCodeforcesDifficultyColor(difficulty);
    }
    return "#808080"; // Default color for unknown resources
}
