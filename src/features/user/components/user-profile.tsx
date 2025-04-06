"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { UserProblemLists } from "@/features/user/components/user-problem-lists"
import { Calendar, Twitter, Github, ExternalLink } from "lucide-react"
import { Prisma } from "@prisma/client"
import { getUserById } from "@/features/user/db/getUser"
import { formatDate } from "@/utils/formatDate"


export function UserProfile({ user }: { user: NonNullable<Prisma.PromiseReturnType<typeof getUserById>> }) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="flex-shrink-0">
                            {/* <Image
                                src={user.image || "/placeholder.svg"}
                                alt={`${user.name}のプロフィール画像`}
                                width={120}
                                height={120}
                                className="rounded-full border-4 border-white shadow-md"
                            /> */}
                        </div>
                        <div className="flex-grow">
                            <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>

                            <div className="mt-3 text-sm text-gray-600">
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    {formatDate(user.createdAt)}に登録
                                </div>
                            </div>

                            {/* <div className="mt-3 flex flex-wrap gap-2">
                                {user. && (
                                    <a
                                        href={`https://atcoder.jp/users/${user.atcoderId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full"
                                    >
                                        <span className="font-bold mr-1">AtCoder:</span> {user.atcoderId}
                                        <ExternalLink className="h-3 w-3 ml-1" />
                                    </a>
                                )}

                                {user.twitterId && (
                                    <a
                                        href={`https://twitter.com/${user.twitterId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-sm text-gray-600 hover:text-blue-500 bg-gray-100 hover:bg-blue-50 px-3 py-1 rounded-full"
                                    >
                                        <Twitter className="h-3 w-3 mr-1" />
                                        {user.twitterId}
                                    </a>
                                )}

                                {user.githubId && (
                                    <a
                                        href={`https://github.com/${user.githubId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full"
                                    >
                                        <Github className="h-3 w-3 mr-1" />
                                        {user.githubId}
                                    </a>
                                )}
                            </div> */}
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    {/* <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-500">自己紹介</h3>
                        <p className="mt-1 text-gray-700 whitespace-pre-line">{user.bio}</p>
                    </div> */}

                    {/* <div className="mt-6 flex flex-wrap gap-4">
                        <div className="bg-white border rounded-lg px-4 py-2 min-w-[120px]">
                            <div className="text-2xl font-bold">{user.createdLists.length}</div>
                            <div className="text-xs text-gray-500">作成したリスト</div>
                        </div>
                        <div className="bg-white border rounded-lg px-4 py-2 min-w-[120px]">
                            <div className="text-2xl font-bold">{user.starredLists.length}</div>
                            <div className="text-xs text-gray-500">スターしたリスト</div>
                        </div>
                        <div className="bg-white border rounded-lg px-4 py-2 min-w-[120px]">
                            <div className="text-2xl font-bold">{user.createdLists.reduce((sum, list) => sum + list.stars, 0)}</div>
                            <div className="text-xs text-gray-500">獲得スター</div>
                        </div>
                    </div> */}
                </CardContent>
            </Card>

            {/* <Tabs defaultValue="created" onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="created">作成したリスト ({user.createdLists.length})</TabsTrigger>
                    <TabsTrigger value="starred">スターしたリスト ({user.starredLists.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="created">
                    <UserProblemLists
                        lists={user.createdLists}
                        emptyMessage="作成した問題リストはありません。"
                        showAuthor={false}
                    />
                </TabsContent>

                <TabsContent value="starred">
                    <UserProblemLists
                        lists={user.starredLists}
                        emptyMessage="スターした問題リストはありません。"
                        showAuthor={true}
                    />
                </TabsContent> */}
            {/* </Tabs> */}
        </div >
    )
}

