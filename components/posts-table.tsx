"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoreVertical, Edit, Trash2, Eye } from "lucide-react"
import { formatDate } from "@/lib/utils/post-utils"
import Link from "next/link"

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  status: string
  views: number
  reading_time: number | null
  published_at: string | null
  created_at: string
  post_categories: {
    name: string
    slug: string
  } | null
}

interface PostsTableProps {
  posts: Post[]
}

export default function PostsTable({ posts: initialPosts }: PostsTableProps) {
  const router = useRouter()
  const [posts, setPosts] = useState(initialPosts)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    setDeletingId(postId)
    const supabase = createClient()

    try {
      const { error } = await supabase.from("posts").delete().eq("id", postId)

      if (error) throw error

      setPosts(posts.filter((post) => post.id !== postId))
      router.refresh()
    } catch (error) {
      console.error("Error deleting post:", error)
      alert("Failed to delete post")
    } finally {
      setDeletingId(null)
    }
  }

  const filterPosts = (status: string) => {
    if (status === "all") return posts
    return posts.filter((post) => post.status === status)
  }

  const PostCard = ({ post }: { post: Post }) => (
    <Card className="border-charcoal/10 transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-xl text-charcoal">{post.title}</h3>
              <Badge
                variant={post.status === "published" ? "default" : "secondary"}
                className={
                  post.status === "published"
                    ? "bg-amber/20 text-amber-900 hover:bg-amber/30"
                    : "bg-charcoal/10 text-charcoal/60"
                }
              >
                {post.status}
              </Badge>
            </div>

            {post.excerpt && <p className="text-sm text-charcoal/60 line-clamp-2">{post.excerpt}</p>}

            <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal/50">
              {post.post_categories && (
                <span className="rounded-full bg-charcoal/5 px-2 py-1">{post.post_categories.name}</span>
              )}
              {post.reading_time && <span>{post.reading_time} min read</span>}
              <span>{post.views} views</span>
              <span>
                {post.status === "published" && post.published_at
                  ? `Published ${formatDate(post.published_at)}`
                  : `Created ${formatDate(post.created_at)}`}
              </span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/admin/posts/${post.id}/edit`} className="flex items-center">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              {post.status === "published" && (
                <DropdownMenuItem asChild>
                  <Link href={`/blog/${post.slug}`} className="flex items-center">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => handleDelete(post.id)}
                disabled={deletingId === post.id}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {deletingId === post.id ? "Deleting..." : "Delete"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="bg-white border border-charcoal/10">
        <TabsTrigger value="all">All ({posts.length})</TabsTrigger>
        <TabsTrigger value="published">Published ({filterPosts("published").length})</TabsTrigger>
        <TabsTrigger value="draft">Drafts ({filterPosts("draft").length})</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-6 space-y-4">
        {posts.length === 0 ? (
          <Card className="border-charcoal/10">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-charcoal/60">No posts yet. Create your first post to get started!</p>
              <Link href="/admin/posts/new">
                <Button className="mt-4 bg-amber text-charcoal hover:bg-amber/90">Create Post</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </TabsContent>

      <TabsContent value="published" className="mt-6 space-y-4">
        {filterPosts("published").length === 0 ? (
          <Card className="border-charcoal/10">
            <CardContent className="py-12 text-center text-charcoal/60">No published posts yet.</CardContent>
          </Card>
        ) : (
          filterPosts("published").map((post) => <PostCard key={post.id} post={post} />)
        )}
      </TabsContent>

      <TabsContent value="draft" className="mt-6 space-y-4">
        {filterPosts("draft").length === 0 ? (
          <Card className="border-charcoal/10">
            <CardContent className="py-12 text-center text-charcoal/60">No draft posts.</CardContent>
          </Card>
        ) : (
          filterPosts("draft").map((post) => <PostCard key={post.id} post={post} />)
        )}
      </TabsContent>
    </Tabs>
  )
}
