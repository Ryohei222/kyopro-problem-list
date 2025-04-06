import { UserProfile } from "@/features/user/components/user-profile";
import { notFound } from "next/navigation";
import { getUserById } from "@/features/user/db/getUser";
import { getUserProblemSets } from "@/features/problemset/db/getUserProblemSets";
import { ProblemListTable } from "@/features/problemset/components/problem-list-table";

export default async function UserPage({ params }: { params: { id: string } }) {
  const userId = params.id;
  const user = await getUserById(userId);
  const usersProblemSets = await getUserProblemSets(userId, true);
  console.log(usersProblemSets);
  if (!user) {
    notFound();
  }
  return (
    <>
      <UserProfile user={user} />
      <ProblemListTable problemLists={usersProblemSets} />
    </>
  );
}
