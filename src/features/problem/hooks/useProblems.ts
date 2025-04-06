"use client";

import { useContext } from "react";
import { ProblemsContext } from "../components/problems-provider";

export default function useProblems() {
  return useContext(ProblemsContext);
}
