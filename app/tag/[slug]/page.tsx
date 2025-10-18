import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import Link from "next/link"
import Image from "next/image"
import { Clock, Tag } from "lucide-react"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { formatDate } from "@/lib/utils/post-utils"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: tag } = await supabase.from("post_tags").select("*").eq("slug", slug).single()

  if (!tag) {
    return {
      title: "Tag Not Found - Demuse Daily",
    }
  }

  return {
    title: `#${tag.name} - Demuse Daily`,
    description: `Articles tagged with ${tag.name}`,
  }
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch tag
  const { data: tag } = await supabase.from("post_tags").select("*").eq("slug", slug).single()

  if (!tag) {
    notFound()
  }

  // Fetch posts with this tag
  const { data: postTagRelations } = await supabase
    .from("post_tag_relations")
    .select(
      `
      posts (
        *,
        post_categories (
          name,
          slug
        )
      )
    `,
    )
    .eq("tag_id", tag.id)

  const posts =
    postTagRelations
      ?.map((ptr: any) => ptr.posts)
      .filter((post: any) => post && post.status === "published")
      .sort((a: any, b: any) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()) || []

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Tag Header */}
        <section className="py-16 sm:py-24 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Tag className="h-6 w-6 text-primary" />
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {tag.name}
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-balance">
                Articles tagged with #{tag.name}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl text-pretty">
                {posts.length} {posts.length === 1 ? "article" : "articles"} found
              </p>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: any) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group block space-y-4">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={post.cover_image || "/placeholder.svg?height=400&width=640"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {post.post_categories && (
                          <>
                            <span className="text-primary">{post.post_categories.name}</span>
                            <span>•</span>
                          </>
                        )}
                        {post.published_at && <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>}
                        {post.reading_time && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.reading_time} min read
                            </span>
                          </>
                        )}
                      </div>
                      <h2 className="font-serif text-2xl tracking-tight group-hover:text-accent transition-colors text-balance">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{post.excerpt}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 space-y-4">
                <p className="text-muted-foreground">No articles found with this tag yet.</p>
                <Link href="/categories" className="inline-flex items-center text-accent hover:underline">
                  Browse all categories
                </Link>
              </div>
            )}
          </div>
        </section>

        <NewsletterSignup />
      </main>

      <Footer />
    </div>
  )
}
