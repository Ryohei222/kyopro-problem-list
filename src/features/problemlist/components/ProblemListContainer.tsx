import { getProblemList } from "../db/getProblemList";
import { ProblemListPresenter } from "./ProblemListPresenter";
import { auth } from "@/lib/auth";

export async function ProblemListContainer({ problemListId }: { problemListId: string }) {
    const problemList = await getProblemList(problemListId);
    if (!problemList) {
        throw new Error("Problem list not found");
    }
    const session = await auth();
    const logined = session?.user?.id ? true : false;
    const isAuthor = logined && session?.user?.id === problemList.author.id;
    return <ProblemListPresenter problemList={problemList} logined={logined} isAuthor={isAuthor} />;
}
