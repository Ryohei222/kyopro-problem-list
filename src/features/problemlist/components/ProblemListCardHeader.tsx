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
        <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="text-2xl font-bold">{problemList.name}</CardTitle>
                    <CardDescription className="flex items-center mt-2 space-x-4">
                        <CardUserInfo
                            id={problemList.id}
                            name={problemList.author.name}
                            image={problemList.author.image}
                        />
                        <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(problemList.createdAt)}
                        </span>
                        <Badge variant={problemList.isPublic ? "default" : "outline"}>
                            {problemList.isPublic ? "公開" : "非公開"}
                        </Badge>
                    </CardDescription>
                </div>
                <div className="flex space-x-2">
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
