"use client";

import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ProblemListResponse } from "../../../../features/problemlist/types/ProblemLists";
import { CardHeaderButton } from "./CardHeaderButton";

type EditButtonProps = {
  problemList: NonNullable<ProblemListResponse>;
};

export function EditButton(props: EditButtonProps) {
  const router = useRouter();
  return (
    <CardHeaderButton
      label="編集"
      lucideIcon={Edit}
      variant="outline"
      onClick={() => router.push(`/problemlist/edit/${props.problemList.id}`)}
    />
  );
}
