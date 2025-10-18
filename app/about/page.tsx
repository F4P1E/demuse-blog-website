import { NewsletterSignup } from "@/components/newsletter-signup"
import Image from "next/image"

export const metadata = {
  title: "About - Demuse Daily",
  description: "Learn about Demuse Daily, our mission, and the team behind the publication.",
}

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center space-y-6">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-balance">
              Exploring Ideas in Motion
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Demuse Daily is a publication dedicated to exploring the intersection of creativity, technology, and
              culture through thoughtful storytelling.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl sm:text-4xl tracking-tight">Our Mission</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We believe that the most interesting ideas emerge at the boundaries—where technology meets art, where
                  tradition intersects with innovation, and where individual creativity sparks collective progress.
                </p>
                <p>
                  Every day, we curate and create content that challenges conventional thinking, celebrates creative
                  excellence, and explores the forces shaping our digital and physical worlds.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/modern-creative-technology-workspace.jpg"
                alt="Creative workspace"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-center mb-12">What We Value</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="font-serif text-xl">Thoughtful Curation</h3>
              <p className="text-muted-foreground leading-relaxed">
                We carefully select stories that matter, filtering signal from noise to bring you content worth your
                time.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-serif text-xl">Creative Excellence</h3>
              <p className="text-muted-foreground leading-relaxed">
                We celebrate work that pushes boundaries and sets new standards in design, technology, and storytelling.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-serif text-xl">Intellectual Curiosity</h3>
              <p className="text-muted-foreground leading-relaxed">
                We ask questions, explore nuance, and dive deep into topics that shape our understanding of the world.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-serif text-xl">Diverse Perspectives</h3>
              <p className="text-muted-foreground leading-relaxed">
                We amplify voices from different backgrounds, disciplines, and viewpoints to enrich the conversation.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-serif text-xl">Accessible Depth</h3>
              <p className="text-muted-foreground leading-relaxed">
                We make complex ideas approachable without sacrificing substance or nuance.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-serif text-xl">Community Focus</h3>
              <p className="text-muted-foreground leading-relaxed">
                We foster meaningful connections between readers, creators, and thinkers who share our curiosity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-center mb-12">Our Team</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="text-center space-y-4">
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden">
                <Image src="/professional-woman-portrait.jpg" alt="Sarah Chen" fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-serif text-xl">Sarah Chen</h3>
                <p className="text-sm text-muted-foreground">Editor-in-Chief</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Former tech journalist with a passion for design thinking and creative culture.
                </p>
              </div>
            </div>
            <div className="text-center space-y-4">
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-muted flex items-center justify-center">
                <span className="font-serif text-4xl text-muted-foreground">M</span>
              </div>
              <div>
                <h3 className="font-serif text-xl">Marcus Rodriguez</h3>
                <p className="text-sm text-muted-foreground">Creative Director</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Designer and strategist exploring the future of digital experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl tracking-tight">Get in Touch</h2>
          <p className="text-muted-foreground leading-relaxed">
            Have a story idea, feedback, or just want to say hello? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="mailto:hello@demusedaily.com" className="text-accent hover:underline">
              hello@demusedaily.com
            </a>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <a href="https://twitter.com/demusedaily" className="text-accent hover:underline">
              @demusedaily
            </a>
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </main>
  )
}
