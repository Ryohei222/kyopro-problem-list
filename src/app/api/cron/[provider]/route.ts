import { updateProblems } from "@/features/problem/db/updateProblems";
import { prisma } from "@/prisma";
import { ProblemProvider } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { provider: string } },
): Promise<NextResponse> {
  // const authHeader = request.headers.get('authorization');
  // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //     return new NextResponse('Unauthorized', {
  //         status: 401,
  //     });
  // }
  const { provider } = await params;

  if (provider === "all") {
    await prisma.problemSetProblem.deleteMany({});
    await prisma.problem.deleteMany({});
    const atcoder = await updateProblems(ProblemProvider.ATCODER);
    const codeforces = await updateProblems(ProblemProvider.CODEFORCES);
    const yukicoder = await updateProblems(ProblemProvider.YUKICODER);
    const aoj = await updateProblems(ProblemProvider.AOJ);
    return NextResponse.json({
      success: true,
      atcoder: atcoder.length,
      codeforces: codeforces.length,
      yukicoder: yukicoder.length,
      aoj: aoj.length,
    });
  }

  if (!(provider.toUpperCase() in ProblemProvider)) {
    return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
  }

  const refinedProvider = provider.toUpperCase() as ProblemProvider;

  await prisma.problem
    .deleteMany({
      where: {
        provider: refinedProvider,
      },
    })
    .catch((error) => {
      console.error("Error deleting problems:", error);
      return NextResponse.json(
        { error: "Failed to delete problems" },
        { status: 500 },
      );
    });

  const createdProblems = await updateProblems(refinedProvider);
  return NextResponse.json({ success: true, createdProblems });
}
