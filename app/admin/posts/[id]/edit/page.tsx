import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import PostEditor from "@/components/post-editor"

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch the post
  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .eq("author_id", user.id)
    .single()

  if (postError || !post) {
    redirect("/admin/posts")
  }

  // Fetch categories and tags
  const { data: categories } = await supabase.from("post_categories").select("*").order("name")

  const { data: tags } = await supabase.from("post_tags").select("*").order("name")

  // Fetch post tags
  const { data: postTags } = await supabase.from("post_tag_relations").select("tag_id").eq("post_id", id)

  return (
    <div className="min-h-screen bg-cream">
      <PostEditor
        categories={categories || []}
        tags={tags || []}
        userId={user.id}
        post={post}
        initialTags={postTags?.map((pt) => pt.tag_id) || []}
      />
    </div>
  )
}
