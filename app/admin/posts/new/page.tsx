import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import PostEditor from "@/components/post-editor"

export default async function NewPostPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch categories and tags for the editor
  const { data: categories } = await supabase.from("post_categories").select("*").order("name")

  const { data: tags } = await supabase.from("post_tags").select("*").order("name")

  return (
    <div className="min-h-screen bg-cream">
      <PostEditor categories={categories || []} tags={tags || []} userId={user.id} />
    </div>
  )
}
