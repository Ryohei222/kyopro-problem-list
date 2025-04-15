import { auth } from "@/auth";
import { getStar } from "@/features/problemlist/db/Star";
import type { ProblemListResponse } from "@/features/problemlist/types/ProblemLists";
import { ClientStarButton } from "./ClientStarButton";

export async function ProblemListStarButton({
  problemList,
}: {
  problemList: NonNullable<ProblemListResponse>;
}) {
  const userId = (await auth())?.user?.id;
  const isStarred = userId && (await getStar(problemList.id, userId));
  if (!userId || !problemList) {
    return <></>;
  }
  return (
    <ClientStarButton
      userId={userId}
      problemList={problemList}
      defaultStarFlag={!!isStarred}
    />
  );
}
