"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProblemTable } from "./problem-table"
import { Share2, Edit, UserCircle, Calendar } from "lucide-react"
import { queryProblemSetDetail } from "@/db/types"
import { ProblemSetStarButton } from "@/components/star-button"
import React from 'react';
import { useSession } from "next-auth/react"

export function ProblemSetDetail({ problemset }: { problemset: NonNullable<queryProblemSetDetail> }) {

    const session = useSession();
    const logined = session.status === "authenticated";
    const isAuthor = session.data?.user?.id === problemset.author.id;
    const problems = problemset.problemSetProblems;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    return (
        <Card>
            <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl font-bold">{problemset.name}</CardTitle>
                        <CardDescription className="flex items-center mt-2 space-x-4">

                            <span className="flex items-center">
                                <UserCircle className="h-4 w-4 mr-1" />
                                <Link href={`/user/${problemset.author.id}`} className="text-blue-600 hover:underline">
                                    {problemset.author.name}
                                </Link>
                            </span>

                            <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {formatDate(problemset.createdAt)}
                            </span>

                            <Badge variant={problemset.isPublic ? "default" : "outline"}>
                                {problemset.isPublic ? "公開" : "非公開"}
                            </Badge>

                        </CardDescription>
                    </div>

                    <div className="flex space-x-2">
                        {logined && <ProblemSetStarButton problemSet={problemset} />}

                        <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4 mr-1" />
                            <span>共有</span>
                        </Button>

                        {isAuthor && (
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`/problemset/edit/${problemset.id}`}>
                                    <Edit className="h-4 w-4 mr-1" />
                                    <span>編集</span>
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">概要</h3>
                    <p className="text-gray-700 whitespace-pre-line">{problemset.description}</p>
                </div>

                <ProblemTable problems={problems} />
            </CardContent>
        </Card>
    )
}

