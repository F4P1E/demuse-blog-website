import Link from "next/link"
import Image from "next/image"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { formatDate } from "@/lib/utils/post-utils"

export default async function HomePage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
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
    .order("published_at", { ascending: false })
    .limit(5)

  const featuredPost = posts?.[0]
  const latestPosts = posts?.slice(1, 5) || []

  return (
    <main className="flex-1">
      {/* Hero / Featured Article */}
      {featuredPost && (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-4">
                Featured
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl mb-4 text-balance leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6 text-pretty">{featuredPost.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                {featuredPost.post_categories && <span>{featuredPost.post_categories.name}</span>}
                {featuredPost.published_at && (
                  <>
                    <span>•</span>
                    <span>{formatDate(featuredPost.published_at)}</span>
                  </>
                )}
                {featuredPost.reading_time && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.reading_time} min read</span>
                    </div>
                  </>
                )}
              </div>
              <Button asChild>
                <Link href={`/blog/${featuredPost.slug}`}>
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={featuredPost.cover_image || "/placeholder.svg?height=600&width=800"}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest Posts Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl">Latest Articles</h2>
          <Button variant="ghost" asChild>
            <Link href="/articles">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {latestPosts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {latestPosts.map((post) => (
              <article key={post.id} className="group">
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative aspect-[3/2] rounded-lg overflow-hidden mb-4">
                    <Image
                      src={post.cover_image || "/placeholder.svg?height=400&width=600"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2">
                    {post.post_categories && (
                      <div className="text-xs text-primary font-medium uppercase tracking-wide">
                        {post.post_categories.name}
                      </div>
                    )}
                    <h3 className="font-serif text-xl leading-tight group-hover:text-primary transition-colors text-balance">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                      {post.reading_time && <span>{post.reading_time} min read</span>}
                      {post.published_at && (
                        <>
                          <span>•</span>
                          <span>{formatDate(post.published_at)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No articles published yet. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />
    </main>
  )
}
