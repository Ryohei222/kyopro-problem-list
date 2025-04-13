import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatDate } from "@/utils/formatDate";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProblemListStarButton } from "./ProblemListStarButton";
import { ProblemListResponse } from "../types/ProblemLists";
import { EditButton } from "./EditButton";
import { DeleteButton } from "./DeleteButton";
import { ShareButton } from "./ShareButton";
import { CardUserInfo } from "@/components/CardUserInfo";

type ProblemListCardHeaderProps = {
    problemList: NonNullable<ProblemListResponse>;
    isLogined: boolean;
    isAuthor: boolean;
};

export async function ProblemListCardHeader({
    problemList,
    isLogined,
    isAuthor,
}: ProblemListCardHeaderProps) {
    return (
        <CardHeader className="pt-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <CardTitle className="text-2xl font-bold">{problemList.name}</CardTitle>
                    <CardDescription className="flex flex-wrap items-center mt-2 space-x-4">
                        <CardUserInfo
                            id={problemList.author.id}
                            name={problemList.author.name}
                            image={problemList.author.image}
                        />
                        <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">
                                {formatDate(problemList.createdAt)}
                            </span>
                        </span>
                        <Badge variant={problemList.isPublic ? "default" : "outline"}>
                            {problemList.isPublic ? "公開" : "非公開"}
                        </Badge>
                    </CardDescription>
                </div>
                <div className="flex space-x-2 mt-4 md:mt-0">
                    <ShareButton problemList={problemList} />
                    {isLogined && <ProblemListStarButton problemList={problemList} />}
                    {isAuthor && (
                        <>
                            <EditButton problemList={problemList} />
                            <DeleteButton problemList={problemList} />
                        </>
                    )}
                </div>
            </div>
        </CardHeader>
    );
}
