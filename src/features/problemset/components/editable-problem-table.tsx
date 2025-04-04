"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, GripVertical, ExternalLink, Search, Plus } from "lucide-react"
import { ProblemSetProblem } from "../types/ProblemSetProblem"
import { buildProblemUrl } from "@/utils/buildProblemUrl"
import { getDifficultyColor } from "@/utils/getDifficultyColor"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { toast } from "sonner"

type Problem = {
    id: string;
    contestId: string;
    problemId: string;
    name: string;
    difficulty?: number;
    order?: number;
}

interface EditableProblemTableProps {
    problems: Problem[];
    onProblemAdd: (contestId: string, problemId: string) => void;
    onProblemRemove: (problemId: string) => void;
    onProblemsReorder: (problems: Problem[]) => void;
}

export function EditableProblemTable({
    problems,
    onProblemAdd,
    onProblemRemove,
    onProblemsReorder
}: EditableProblemTableProps) {
    const [contestId, setContestId] = useState("");
    const [problemId, setProblemId] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 問題の追加処理
    const handleAddProblem = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!contestId || !problemId) {
            toast.error("コンテストIDと問題IDを入力してください");
            return;
        }

        setIsSubmitting(true);
        try {
            onProblemAdd(contestId, problemId);
            setContestId("");
            setProblemId("");
        } catch (error) {
            toast.error("問題の追加に失敗しました");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // 問題の並べ替え処理
    const handleDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(problems);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // 並べ替え後にorder値を更新
        const updatedItems = items.map((item, index) => ({
            ...item,
            order: index
        }));

        onProblemsReorder(updatedItems);
    };

    return (
        <div className="space-y-4">
            {/* 問題追加フォーム */}
            <div className="bg-white p-4 rounded-md border">
                <h3 className="text-md font-medium mb-3">問題を追加</h3>
                <form onSubmit={handleAddProblem} className="flex items-end gap-2">
                    <div className="flex-1 space-y-1">
                        <label htmlFor="contestId" className="text-sm font-medium">
                            コンテストID
                        </label>
                        <Input
                            id="contestId"
                            value={contestId}
                            onChange={(e) => setContestId(e.target.value)}
                            placeholder="例: abc001"
                            className="max-w-xs"
                        />
                    </div>
                    <div className="flex-1 space-y-1">
                        <label htmlFor="problemId" className="text-sm font-medium">
                            問題ID
                        </label>
                        <Input
                            id="problemId"
                            value={problemId}
                            onChange={(e) => setProblemId(e.target.value)}
                            placeholder="例: a"
                            className="max-w-xs"
                        />
                    </div>
                    <Button type="submit" disabled={isSubmitting}>
                        <Plus className="h-4 w-4 mr-1" />
                        追加
                    </Button>
                </form>
            </div>

            {/* 問題テーブル */}
            <div className="rounded-md border bg-white">
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead style={{ width: "40px" }}></TableHead>
                                <TableHead style={{ width: "120px" }}>問題ID</TableHead>
                                <TableHead>問題名</TableHead>
                                <TableHead className="w-24 text-right">難易度</TableHead>
                                <TableHead className="w-24 text-right">操作</TableHead>
                            </TableRow>
                        </TableHeader>
                        <Droppable droppableId="problems">
                            {(provided) => (
                                <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                                    {problems.map((problem, index) => (
                                        <Draggable key={problem.id} draggableId={problem.id} index={index}>
                                            {(provided) => (
                                                <TableRow
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    className="cursor-grab"
                                                >
                                                    <TableCell {...provided.dragHandleProps}>
                                                        <GripVertical className="h-4 w-4 text-gray-400" />
                                                    </TableCell>
                                                    <TableCell>
                                                        {problem.contestId}{problem.problemId}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="font-medium">{problem.name}</div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {problem.difficulty ? (
                                                            <span className="px-2 py-1 rounded text-white text-xs"
                                                                style={{ backgroundColor: getDifficultyColor(problem.difficulty) }}>
                                                                {problem.difficulty}
                                                            </span>
                                                        ) : (
                                                            <span className="text-gray-500">-</span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end space-x-1">
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                asChild
                                                            >
                                                                <a
                                                                    href={buildProblemUrl(problem.contestId, problem.problemId)}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    <ExternalLink className="h-4 w-4" />
                                                                </a>
                                                            </Button>
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => onProblemRemove(problem.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4 text-red-500" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </TableBody>
                            )}
                        </Droppable>
                    </Table>
                </DragDropContext>
                {problems.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        問題が追加されていません。上のフォームから問題を追加してください。
                    </div>
                )}
            </div>
        </div>
    );
}