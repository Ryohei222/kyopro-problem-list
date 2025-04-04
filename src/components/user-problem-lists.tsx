import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star, FileText, Calendar, User } from "lucide-react"

type ProblemListSummary = {
    id: string
    name: string
    description: string
    stars: number
    createdAt: string
    problemCount: number
    author?: string
    authorId?: string
}

type UserProblemListsProps = {
    lists: ProblemListSummary[]
    emptyMessage: string
    showAuthor: boolean
}

export function UserProblemLists({ lists, emptyMessage, showAuthor }: UserProblemListsProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    if (lists.length === 0) {
        return <div className="text-center py-12 text-gray-500">{emptyMessage}</div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lists.map((list) => (
                <Card key={list.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                        <Link href={`/list/${list.id}`} className="block">
                            <h3 className="text-lg font-bold hover:text-blue-600 transition-colors line-clamp-2">{list.name}</h3>
                        </Link>

                        <p className="text-gray-600 text-sm mt-2 line-clamp-3">{list.description}</p>
                    </CardContent>

                    <CardFooter className="border-t pt-4 pb-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                        <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                            {list.stars}
                        </div>

                        <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-1" />
                            {list.problemCount}問
                        </div>

                        <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(list.createdAt)}
                        </div>

                        {showAuthor && list.author && (
                            <div className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                <Link href={`/user/${list.authorId}`} className="hover:text-blue-600 hover:underline">
                                    {list.author}
                                </Link>
                            </div>
                        )}
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

