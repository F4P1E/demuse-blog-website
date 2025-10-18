import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import PostsTable from "@/components/posts-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default async function PostsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user's posts with category information
  const { data: posts, error } = await supabase
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
    .eq("author_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching posts:", error)
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-4xl text-charcoal">Your Posts</h1>
            <p className="mt-2 text-charcoal/60">Manage and edit your blog articles</p>
          </div>
          <Link href="/admin/posts/new">
            <Button className="bg-amber text-charcoal hover:bg-amber/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </Link>
        </div>

        <PostsTable posts={posts || []} />
      </div>
    </div>
  )
}
