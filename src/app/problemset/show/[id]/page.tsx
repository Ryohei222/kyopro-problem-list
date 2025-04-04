import { Toolbar } from "@/components/toolbar"
import { ProblemSetDetail } from "@/components/problemset-detail"
import { notFound } from "next/navigation"

import { getProblemSetById } from "@/controller/ProblemSet"
import ProblemSetPage from "@/features/problemset/pages/problemset";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProblemSetPage id={id} />;
}