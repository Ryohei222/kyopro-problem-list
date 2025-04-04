import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, LogIn, Plus } from "lucide-react"
import UserButton from "./login-button"

export function Toolbar() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-green-600">AtCoder Problemset</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center space-x-1">
                <Home className="h-4 w-4" />
                <span>問題リスト</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/problemset/create" className="flex items-center space-x-1">
                <Plus className="h-4 w-4" />
                <span>新規作成</span>
              </Link>
            </Button>
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <UserButton />
          {/* <Button variant="outline" size="sm" asChild>
            <Link href="/login" className="flex items-center space-x-1">
              <LogIn className="h-4 w-4" />
              <span>ログイン</span>
            </Link>
          </Button> */}
        </div>
      </div>
    </header>
  )
}