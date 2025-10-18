import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export const metadata = {
  title: "Categories - Demuse Daily",
  description: "Browse articles by category on Demuse Daily.",
}

export default async function CategoriesPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase.from("post_categories").select("*").order("name")

  // Get post counts for each category
  const categoriesWithCounts = await Promise.all(
    (categories || []).map(async (category) => {
      const { count } = await supabase
        .from("posts")
        .select("*", { count: "exact", head: true })
        .eq("category_id", category.id)
        .eq("status", "published")

      return {
        ...category,
        count: count || 0,
      }
    }),
  )

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center space-y-6">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-balance">
              Browse by Category
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Explore our curated collection of articles organized by topic and theme.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {categoriesWithCounts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoriesWithCounts.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="group block p-8 rounded-lg border border-border bg-card hover:border-accent/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent-foreground">
                        {category.name}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </div>
                    <h2 className="font-serif text-2xl tracking-tight group-hover:text-accent transition-colors">
                      {category.name}
                    </h2>
                    {category.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed">{category.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {category.count} {category.count === 1 ? "article" : "articles"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No categories available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Topics */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight">Can't find what you're looking for?</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Use our search feature to find specific topics, or browse our latest articles to discover something new.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
              >
                View Latest Articles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
