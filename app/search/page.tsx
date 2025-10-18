import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils/post-utils"
import { Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q: query } = await searchParams
  const supabase = await createClient()

  let posts: any[] = []
  let searchPerformed = false

  if (query && query.trim()) {
    searchPerformed = true
    const searchTerm = `%${query.trim()}%`

    // Search in title, excerpt, and content
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        *,
        post_categories (
          name,
          slug
        )
      `,
      )
      .eq("status", "published")
      .or(`title.ilike.${searchTerm},excerpt.ilike.${searchTerm},content.ilike.${searchTerm}`)
      .order("published_at", { ascending: false })
      .limit(20)

    if (!error && data) {
      posts = data
    }
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-serif text-4xl text-charcoal">Search Results</h1>
          {searchPerformed && (
            <p className="mt-2 text-charcoal/60">
              {posts.length > 0 ? (
                <>
                  Found {posts.length} {posts.length === 1 ? "article" : "articles"} for "{query}"
                </>
              ) : (
                <>No articles found for "{query}"</>
              )}
            </p>
          )}
        </div>

        {!searchPerformed ? (
          <Card className="border-charcoal/10">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Search className="mb-4 h-12 w-12 text-charcoal/20" />
              <p className="text-charcoal/60">Enter a search term to find articles</p>
            </CardContent>
          </Card>
        ) : posts.length === 0 ? (
          <Card className="border-charcoal/10">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Search className="mb-4 h-12 w-12 text-charcoal/20" />
              <p className="text-charcoal/60">No articles found matching your search</p>
              <p className="mt-2 text-sm text-charcoal/40">Try different keywords or browse all articles</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="border-charcoal/10 transition-shadow hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {post.cover_image && (
                        <div className="relative h-32 w-48 flex-shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={post.cover_image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 192px"
                          />
                        </div>
                      )}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <h2 className="font-serif text-2xl text-charcoal hover:text-amber transition-colors">
                            {post.title}
                          </h2>
                        </div>

                        {post.excerpt && <p className="text-charcoal/70 line-clamp-2">{post.excerpt}</p>}

                        <div className="flex flex-wrap items-center gap-3 text-sm text-charcoal/50">
                          {post.post_categories && (
                            <Badge className="bg-amber/20 text-amber-900 hover:bg-amber/30">
                              {post.post_categories.name}
                            </Badge>
                          )}
                          {post.reading_time && <span>{post.reading_time} min read</span>}
                          {post.published_at && <span>{formatDate(post.published_at)}</span>}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
