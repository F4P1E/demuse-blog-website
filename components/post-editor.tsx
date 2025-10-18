"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateSlug, calculateReadingTime } from "@/lib/utils/post-utils"
import { ArrowLeft, Save, Eye } from "lucide-react"
import Link from "next/link"

interface Category {
  id: string
  name: string
  slug: string
}

interface Tag {
  id: string
  name: string
  slug: string
}

interface PostEditorProps {
  categories: Category[]
  tags: Tag[]
  userId: string
  post?: {
    id: string
    title: string
    slug: string
    content: string
    excerpt: string
    cover_image: string | null
    category_id: string | null
    status: string
  }
  initialTags?: string[]
}

export default function PostEditor({ categories, tags, userId, post, initialTags = [] }: PostEditorProps) {
  const router = useRouter()
  const [title, setTitle] = useState(post?.title || "")
  const [slug, setSlug] = useState(post?.slug || "")
  const [content, setContent] = useState(post?.content || "")
  const [excerpt, setExcerpt] = useState(post?.excerpt || "")
  const [coverImage, setCoverImage] = useState(post?.cover_image || "")
  const [categoryId, setCategoryId] = useState(post?.category_id || "")
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!post) {
      // Auto-generate slug only for new posts
      setSlug(generateSlug(value))
    }
  }

  const handleSave = async (status: "draft" | "published") => {
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const readingTime = calculateReadingTime(content)

      const postData = {
        title,
        slug,
        content,
        excerpt,
        cover_image: coverImage || null,
        category_id: categoryId || null,
        author_id: userId,
        status,
        reading_time: readingTime,
        published_at:
          status === "published" && !post?.status
            ? new Date().toISOString()
            : post?.status === "published"
              ? post.published_at
              : null,
      }

      let postId = post?.id

      if (post) {
        // Update existing post
        const { error: updateError } = await supabase.from("posts").update(postData).eq("id", post.id)

        if (updateError) throw updateError
      } else {
        // Create new post
        const { data, error: insertError } = await supabase.from("posts").insert(postData).select().single()

        if (insertError) throw insertError
        postId = data.id
      }

      // Handle tags
      if (postId) {
        // Delete existing tag relations
        await supabase.from("post_tag_relations").delete().eq("post_id", postId)

        // Insert new tag relations
        if (selectedTags.length > 0) {
          const tagRelations = selectedTags.map((tagId) => ({
            post_id: postId,
            tag_id: tagId,
          }))

          await supabase.from("post_tag_relations").insert(tagRelations)
        }
      }

      router.push("/admin/posts")
      router.refresh()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/admin/posts" className="flex items-center gap-2 text-sm text-charcoal/60 hover:text-charcoal">
          <ArrowLeft className="h-4 w-4" />
          Back to posts
        </Link>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleSave("draft")}
            disabled={isLoading || !title || !content}
            className="border-charcoal/20"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button
            onClick={() => handleSave("published")}
            disabled={isLoading || !title || !content}
            className="bg-amber text-charcoal hover:bg-amber/90"
          >
            <Eye className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      {error && <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-charcoal/10">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-charcoal">Post Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-charcoal">
                  Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter post title..."
                  className="border-charcoal/20 bg-white text-lg font-serif"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug" className="text-charcoal">
                  Slug
                </Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="post-url-slug"
                  className="border-charcoal/20 bg-white font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt" className="text-charcoal">
                  Excerpt
                </Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description of your post..."
                  rows={3}
                  className="border-charcoal/20 bg-white resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-charcoal">
                  Content
                </Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post content here... (Markdown supported)"
                  rows={20}
                  className="border-charcoal/20 bg-white font-mono text-sm resize-none"
                />
                <p className="text-xs text-charcoal/50">
                  {calculateReadingTime(content)} min read • {content.trim().split(/\s+/).length} words
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-charcoal/10">
            <CardHeader>
              <CardTitle className="text-lg text-charcoal">Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="coverImage" className="text-charcoal">
                  Cover Image URL
                </Label>
                <Input
                  id="coverImage"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://..."
                  className="border-charcoal/20 bg-white text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-charcoal">
                  Category
                </Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger className="border-charcoal/20 bg-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-charcoal">Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => {
                        setSelectedTags((prev) =>
                          prev.includes(tag.id) ? prev.filter((id) => id !== tag.id) : [...prev, tag.id],
                        )
                      }}
                      className={`rounded-full px-3 py-1 text-xs transition-colors ${
                        selectedTags.includes(tag.id)
                          ? "bg-amber text-charcoal"
                          : "bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10"
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
