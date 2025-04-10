import { getUserById } from "@/features/user/db/getUser";
import { getProblemList } from "../db/getProblemList";
import { ProblemListPresenter } from "./ProblemListPresenter";
import { auth } from "@/auth";

export async function ProblemListContainer({ problemListId }: { problemListId: string }) {
    const session = await auth();
    const problemList = await getProblemList(problemListId);
    if (!problemList) {
        throw new Error("Problem list not found");
    }
    const user = session?.user?.id ? await getUserById(session.user.id) : null;
    return <ProblemListPresenter problemList={problemList} user={user} />;
}
