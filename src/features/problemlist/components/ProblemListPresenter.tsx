import { ProblemListStarButton } from "@/features/problemlist/components/ProblemListStarButton";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ProblemListRecordTable } from "./ProblemListRecordTable";
import { formatDate } from "@/utils/formatDate";
import { UserCircle, Link, Calendar, Share2, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProblemListResponse } from "../types/ProblemLists";

export async function ProblemListPresenter({
    problemList,
    logined,
    isAuthor,
}: {
    problemList: NonNullable<ProblemListResponse>;
    logined: boolean;
    isAuthor: boolean;
}) {
    return (
        <Card>
            <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl font-bold">{problemList.name}</CardTitle>
                        <CardDescription className="flex items-center mt-2 space-x-4">
                            <span className="flex items-center">
                                <UserCircle className="h-4 w-4 mr-1" />
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
                        {logined && <ProblemListStarButton problemList={problemList} />}

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

            <CardContent>
                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">概要</h3>
                    <p className="text-gray-700 whitespace-pre-line">{problemList.description}</p>
                </div>
                <ProblemListRecordTable problemListRecords={problemList.problemListRecords} />
            </CardContent>
        </Card>
    );
}
