import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, Twitter, Facebook, Linkedin, Link2 } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { formatDate } from "@/lib/utils/post-utils"
import { notFound } from "next/navigation"

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
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
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (!post) {
    notFound()
  }

  // Fetch tags for this post
  const { data: postTags } = await supabase
    .from("post_tag_relations")
    .select(
      `
      post_tags (
        id,
        name,
        slug
      )
    `,
    )
    .eq("post_id", post.id)

  const tags = postTags?.map((pt: any) => pt.post_tags).filter(Boolean) || []

  // Increment view count
  await supabase
    .from("posts")
    .update({ views: (post.views || 0) + 1 })
    .eq("id", post.id)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Article Header */}
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm text-muted-foreground mb-8">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/articles" className="hover:text-foreground transition-colors">
                Articles
              </Link>
              {post.post_categories && (
                <>
                  <span className="mx-2">/</span>
                  <Link
                    href={`/category/${post.post_categories.slug}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {post.post_categories.name}
                  </Link>
                </>
              )}
            </nav>

            {/* Category Badge */}
            {post.post_categories && (
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-6">
                {post.post_categories.name}
              </div>
            )}

            {/* Title */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl mb-6 text-balance leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 text-pretty">{post.excerpt}</p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
              {post.published_at && (
                <>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.published_at)}</span>
                  </div>
                  <span>•</span>
                </>
              )}
              {post.reading_time && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.reading_time} min read</span>
                </div>
              )}
            </div>

            {/* Featured Image */}
            {post.cover_image && (
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-12">
                <Image
                  src={post.cover_image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-serif prose-headings:font-normal
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:leading-relaxed prose-p:text-foreground prose-p:mb-6
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground
                prose-strong:text-foreground prose-strong:font-semibold
                prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-img:rounded-lg"
            >
              {post.content.split("\n").map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
                {tags.map((tag: any) => (
                  <Link
                    key={tag.id}
                    href={`/tag/${tag.slug}`}
                    className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full hover:bg-secondary/80 transition-colors"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Share Buttons */}
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="text-sm font-medium mb-4">Share this article</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" aria-label="Share on Twitter">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Share on Facebook">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Share on LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Copy link">
                  <Link2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </article>

        {/* Newsletter Signup */}
        <NewsletterSignup />
      </main>

      <Footer />
    </div>
  )
}
