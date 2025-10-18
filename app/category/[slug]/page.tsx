import { NewsletterSignup } from "@/components/newsletter-signup"
import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { formatDate } from "@/lib/utils/post-utils"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params
  const supabase = await createClient()

  const { data: category } = await supabase.from("post_categories").select("*").eq("slug", slug).single()

  if (!category) {
    return {
      title: "Category Not Found - Demuse Daily",
    }
  }

  return {
    title: `${category.name} - Demuse Daily`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const supabase = await createClient()

  const { data: category } = await supabase.from("post_categories").select("*").eq("slug", slug).single()

  if (!category) {
    notFound()
  }

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("category_id", category.id)
    .eq("status", "published")
    .order("published_at", { ascending: false })

  return (
    <main className="flex-1">
      {/* Category Header */}
      <section className="py-16 sm:py-24 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent-foreground">
              {category.name}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-balance">{category.name}</h1>
            {category.description && (
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl text-pretty">{category.description}</p>
            )}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {posts && posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
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
              <p className="text-muted-foreground">No articles found in this category yet.</p>
              <Link href="/categories" className="inline-flex items-center text-accent hover:underline">
                Browse all categories
              </Link>
            </div>
          )}
        </div>
      </section>

      <NewsletterSignup />
    </main>
  )
}
