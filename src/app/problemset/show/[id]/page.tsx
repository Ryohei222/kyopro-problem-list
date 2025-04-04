import { Toolbar } from "@/components/toolbar"
import { ProblemSetDetail } from "@/components/problemset-detail"
import { notFound } from "next/navigation"

import { getProblemSetById } from "@/features/problemset/db/ProblemSet"
import ProblemSetShowPage from "@/features/problemset/pages/show";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProblemSetShowPage id={id} />;
}