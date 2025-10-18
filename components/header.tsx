import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, PenSquare } from "lucide-react"
import { SearchBar } from "@/components/search-bar"

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>

            <nav className="hidden lg:flex items-center gap-6 text-sm">
              <Link href="/articles" className="text-muted-foreground hover:text-foreground transition-colors">
                Articles
              </Link>
              <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                Categories
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link
                href="/admin/posts/new"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <PenSquare className="h-4 w-4" />
                Write
              </Link>
            </nav>
          </div>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="font-serif text-2xl tracking-tight">demuse.</h1>
          </Link>

          <div className="flex items-center gap-4">
            <SearchBar />
            <Button variant="outline" size="sm" className="hidden sm:inline-flex bg-transparent">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
