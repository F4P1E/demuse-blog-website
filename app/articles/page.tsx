import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export const metadata = {
  title: "All Articles - Demuse Daily",
  description: "Browse all articles from Demuse Daily - exploring ideas in motion.",
}

export default async function ArticlesPage() {
  const supabase = await createClient()

  // Fetch all published posts with their categories
  const { data: posts, error } = await supabase
    .from("posts")
    .select(`
      *,
      post_categories (
        id,
        name,
        slug
      )
    `)
    .eq("status", "published")
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Error fetching posts:", error)
  }

  const publishedPosts = posts || []

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">All Articles</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore our complete collection of articles on creative culture, technology, and ideas in motion.
            </p>
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{publishedPosts.length}</span>
              <span>articles published</span>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {publishedPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No articles published yet.</p>
            <p className="text-sm text-muted-foreground mt-2">Check back soon for new content.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="group overflow-hidden border-border hover:border-foreground/20 transition-all duration-300 h-full">
                  <div className="aspect-[16/10] relative overflow-hidden bg-muted">
                    {post.cover_image ? (
                      <Image
                        src={post.cover_image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <span className="text-muted-foreground text-sm">No image</span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    {post.post_categories && (
                      <Badge variant="secondary" className="mb-3 bg-accent/10 text-accent hover:bg-accent/20">
                        {post.post_categories.name}
                      </Badge>
                    )}
                    <h3 className="font-serif text-xl md:text-2xl tracking-tight mb-3 group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <time dateTime={post.published_at}>
                          {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
                        </time>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{post.reading_time} min read</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
