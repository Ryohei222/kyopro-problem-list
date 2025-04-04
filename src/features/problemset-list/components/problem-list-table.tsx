"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Star, Search, ChevronDown, ChevronUp } from "lucide-react"
import { getPublicProblemSets } from "@/features/problemset-list/db/getPublicProblemSets"

import { Resolve, ReturnType } from "@/lib/utils"

type SortField = "name" | "author" | "stars" | "createdAt"
type SortDirection = "asc" | "desc"

export function ProblemListTable({ problemLists }: { problemLists: Resolve<ReturnType<typeof getPublicProblemSets>> }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>("stars")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const filteredLists = problemLists
    .filter(
      (list) =>
        list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        list.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        list.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortField === "createdAt") {
        return sortDirection === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else {
        const aValue = a[sortField].toLowerCase()
        const bValue = b[sortField].toLowerCase()
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }
    })

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="問題リストを検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="default">新規リスト作成</Button>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px] cursor-pointer" onClick={() => handleSort("name")}>
                <div className="flex items-center">
                  リスト名
                  <SortIcon field="name" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("author")}>
                <div className="flex items-center">
                  作成者
                  <SortIcon field="author" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("stars")}>
                <div className="flex items-center">
                  スター数
                  <SortIcon field="stars" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("createdAt")}>
                <div className="flex items-center">
                  作成日
                  <SortIcon field="createdAt" />
                </div>
              </TableHead>
              <TableHead className="hidden md:table-cell">概要</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLists.map((list) => (
              <TableRow key={list.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  <a href={`/problemset/show/${list.id}`} className="text-blue-600 hover:underline">
                    {list.name}
                  </a>
                </TableCell>
                <TableCell>{list.author.name}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                    {list._count.stars}
                  </div>
                </TableCell>
                <TableCell>{list.createdAt}</TableCell>
                <TableCell className="hidden md:table-cell max-w-xs truncate">{list.description}</TableCell>
              </TableRow>
            ))}
            {filteredLists.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  検索条件に一致する問題リストが見つかりませんでした。
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

