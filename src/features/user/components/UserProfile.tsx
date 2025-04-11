"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Github, ExternalLink, X, Globe, FileText } from "lucide-react";
import { Prisma } from "@prisma/client";
import { getUser } from "@/features/user/db/getUser";
import { formatDate } from "@/utils/formatDate";
import { Separator } from "@/components/ui/separator";

export function UserProfile({
    user,
    yukicoderUrl,
}: {
    user: NonNullable<Prisma.PromiseReturnType<typeof getUser>>;
    yukicoderUrl: string;
}) {
    return (
        <div className="space-y-6">
            <Card className="overflow-hidden border-none shadow-lg">
                <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600" />
                <CardHeader className="relative pb-2 pt-0">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0 -mt-12 md:-mt-16 ml-6">
                            <Image
                                src={user.image || "/placeholder.svg"}
                                alt={`${user.name}のプロフィール画像`}
                                width={130}
                                height={130}
                                className="rounded-full border-4 border-white shadow-md bg-white"
                            />
                        </div>
                        <div className="flex-grow md:pt-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                <CardTitle className="text-2xl md:text-3xl font-bold">
                                    {user.name}
                                </CardTitle>
                                <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                    {formatDate(user.createdAt)}に登録
                                </div>
                            </div>

                            {/* ブログURL */}
                            {user.blogURL && (
                                <div className="mt-3">
                                    <a
                                        href={user.blogURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                        <Globe className="h-4 w-4 mr-1.5 text-blue-500" />
                                        <span>{user.blogURL}</span>
                                        <ExternalLink className="h-3 w-3 ml-1.5 opacity-70" />
                                    </a>
                                </div>
                            )}

                            {/* 自己紹介文 */}
                            {user.bio && (
                                <div className="mt-4">
                                    <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                        <FileText className="h-4 w-4 mr-1.5 text-gray-500" />
                                        <span>自己紹介</span>
                                    </div>
                                    <p className="text-sm text-gray-600 whitespace-pre-line">
                                        {user.bio}
                                    </p>
                                </div>
                            )}

                            {/* ソーシャルリンク */}
                            {hasAnySocialLinks(user) && (
                                <div className="mt-4">
                                    {(user.bio || user.blogURL) && <Separator className="my-4" />}
                                    <p className="text-sm font-medium text-gray-500 mb-2">
                                        プロフィールリンク
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {user.aojId && (
                                            <a
                                                href={`https://onlinejudge.u-aizu.ac.jp/status/users/${user.aojId}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-sm hover:text-orange-600 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-full transition-colors"
                                            >
                                                <Image
                                                    src="/aoj-logo.ico"
                                                    alt="Aizu Online Judge Logo"
                                                    width={16}
                                                    height={16}
                                                    className="mr-1.5"
                                                />
                                                <span className="ml-0.5">{user.aojId}</span>
                                                <ExternalLink className="h-3 w-3 ml-1.5 opacity-70" />
                                            </a>
                                        )}

                                        {user.atcoderId && (
                                            <a
                                                href={`https://atcoder.jp/users/${user.atcoderId}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-sm hover:text-orange-600 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-full transition-colors"
                                            >
                                                <Image
                                                    src="/atcoder-logo.png"
                                                    alt="AtCoder Logo"
                                                    width={16}
                                                    height={16}
                                                    className="mr-1.5"
                                                />
                                                <span className="ml-0.5">{user.atcoderId}</span>
                                                <ExternalLink className="h-3 w-3 ml-1.5 opacity-70" />
                                            </a>
                                        )}

                                        {user.codeforcesId && (
                                            <a
                                                href={`https://codeforces.com/profile/${user.codeforcesId}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-sm hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors"
                                            >
                                                <Image
                                                    src="/codeforces-logo.png"
                                                    alt="Codeforces Logo"
                                                    width={16}
                                                    height={16}
                                                    className="mr-1.5"
                                                />
                                                <span className="ml-0.5">{user.codeforcesId}</span>
                                                <ExternalLink className="h-3 w-3 ml-1.5 opacity-70" />
                                            </a>
                                        )}

                                        {user.yukicoderId && (
                                            <a
                                                href={yukicoderUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-sm hover:text-green-600 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-full transition-colors"
                                            >
                                                <Image
                                                    src="/yukicoder-logo.png"
                                                    alt="Yukicoder Logo"
                                                    width={16}
                                                    height={16}
                                                    className="mr-1.5"
                                                />
                                                <span className="ml-0.5">{user.yukicoderId}</span>
                                                <ExternalLink className="h-3 w-3 ml-1.5 opacity-70" />
                                            </a>
                                        )}

                                        {user.mofeId && (
                                            <div className="inline-flex items-center text-sm hover:text-purple-600 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-full transition-colors">
                                                <Image
                                                    src="/mofe-logo.jpg"
                                                    alt="MoFe Logo"
                                                    width={16}
                                                    height={16}
                                                    className="mr-1.5 rounded-full"
                                                />
                                                <span className="ml-0.5">{user.mofeId}</span>
                                            </div>
                                        )}

                                        {user.githubId && (
                                            <a
                                                href={`https://github.com/${user.githubId}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-sm hover:text-gray-800 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors"
                                            >
                                                <Github className="h-4 w-4 mr-1.5 text-gray-700" />
                                                <span className="ml-0.5">{user.githubId}</span>
                                                <ExternalLink className="h-3 w-3 ml-1.5 opacity-70" />
                                            </a>
                                        )}

                                        {user.xId && (
                                            <a
                                                href={`https://x.com/${user.xId}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-sm hover:text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors"
                                            >
                                                <X className="h-4 w-4 mr-1.5 text-blue-500" />
                                                <span className="ml-0.5">{user.xId}</span>
                                                <ExternalLink className="h-3 w-3 ml-1.5 opacity-70" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
}

// ユーザーが何かしらのソーシャルリンクを持っているかチェックする関数
function hasAnySocialLinks(user: NonNullable<Prisma.PromiseReturnType<typeof getUser>>): boolean {
    return Boolean(
        user.aojId ||
            user.atcoderId ||
            user.codeforcesId ||
            user.yukicoderId ||
            user.mofeId ||
            user.githubId ||
            user.xId,
    );
}
