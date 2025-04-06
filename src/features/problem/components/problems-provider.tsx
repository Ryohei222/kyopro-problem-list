"use client";

import { createContext, useContext, ReactNode } from "react";
import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

type Problems = Prisma.PromiseReturnType<typeof prisma.problem.findMany>;

export const ProblemsContext = createContext({
    problems: [] as Problems,
});

type Props = {
    problems: Problems;
    children: ReactNode;
};

export function ProblemsProvider({ children, problems }: Props) {
    return <ProblemsContext.Provider value={{ problems }}>{children}</ProblemsContext.Provider>;
}
