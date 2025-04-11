import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatDate } from "@/utils/formatDate";
import { Calendar, Share2, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProblemListStarButton } from "./ProblemListStarButton";
import { ProblemListResponse } from "../types/ProblemLists";
import Image from "next/image";

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
                        <span className="flex items-center gap-2">
                            <Image
                                src={problemList.author.image}
                                alt={problemList.name}
                                width={100}
                                height={100}
                                className="h-8 w-8 rounded-full border border-gray-300 shadow-sm"
                            />
                            <a
                                href={`/user/${problemList.author.id}`}
                                className="text-blue-600 hover:underline"
                            >
                                {problemList.author.name}
                            </a>
                        </span>
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
                    {isLogined && <ProblemListStarButton problemList={problemList} />}

                    <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-1" />
                        <span>共有</span>
                    </Button>

                    {isAuthor && (
                        <>
                            <a
                                href={`/problemlist/edit/${problemList.id}`}
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                <Edit className="h-4 w-4 mr-1" />
                                <span>編集</span>
                            </a>
                        </>
                    )}
                </div>
            </div>
        </CardHeader>
    );
}
