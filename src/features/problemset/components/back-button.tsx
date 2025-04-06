import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function BackButton() {
  return (
    <div className="flex items-center space-x-2">
      <Link
        href="/"
        className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        問題リスト一覧に戻る
      </Link>
    </div>
  );
}
