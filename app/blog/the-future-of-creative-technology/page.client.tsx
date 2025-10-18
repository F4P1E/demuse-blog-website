"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Calendar, Twitter, Facebook, Linkedin, Link2 } from "lucide-react"

export function BlogPostClient() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm text-muted-foreground mb-8">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/" className="hover:text-foreground transition-colors">
                Articles
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Technology</span>
            </nav>

            {/* Category Badge */}
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-6">
              Technology
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl mb-6 text-balance leading-tight">
              The Future of Creative Technology: Where Art Meets Innovation
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 text-pretty">
              Exploring the intersection of artificial intelligence, design, and human creativity in the modern digital
              landscape.
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>March 15, 2024</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>8 min read</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-12">
              <Image
                src="/modern-creative-technology-workspace.jpg"
                alt="Modern creative technology workspace"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-foreground mb-6">
                The landscape of creative technology is evolving at an unprecedented pace. As we stand at the
                intersection of art and innovation, we're witnessing a transformation that challenges our understanding
                of creativity itself.
              </p>

              <h2 className="font-serif text-3xl mt-12 mb-6 font-normal">The Digital Renaissance</h2>
              <p className="leading-relaxed text-foreground mb-6">
                We're living through what many are calling a digital renaissance—a period where technology doesn't just
                support creativity but actively participates in it. Artificial intelligence, machine learning, and
                advanced computational tools are no longer just instruments; they're collaborators in the creative
                process.
              </p>

              <p className="leading-relaxed text-foreground mb-6">
                This shift raises profound questions about authorship, originality, and the nature of human creativity.
                When an AI can generate art, compose music, or write poetry, what does it mean to be creative? The
                answer, I believe, lies not in competition but in collaboration.
              </p>

              <h2 className="font-serif text-3xl mt-12 mb-6 font-normal">Human-AI Collaboration</h2>
              <p className="leading-relaxed text-foreground mb-6">
                The most exciting developments aren't happening when AI replaces human creativity, but when it augments
                it. Designers are using AI to explore thousands of variations in seconds, musicians are collaborating
                with algorithms to discover new sonic territories, and writers are using language models as creative
                sparring partners.
              </p>

              <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground my-8">
                <p>"Technology is best when it brings people together." — Matt Mullenweg</p>
              </blockquote>

              <p className="leading-relaxed text-foreground mb-6">
                This collaboration model respects both the computational power of machines and the intuitive, emotional
                intelligence of humans. It's a partnership that leverages the strengths of both.
              </p>

              <h2 className="font-serif text-3xl mt-12 mb-6 font-normal">The Ethics of Creative AI</h2>
              <p className="leading-relaxed text-foreground mb-6">
                As we embrace these tools, we must also grapple with their implications. Questions of copyright,
                attribution, and the environmental impact of training large models demand our attention. The creative
                community has a responsibility to shape how these technologies develop and are deployed.
              </p>

              <p className="leading-relaxed text-foreground mb-6">
                We need frameworks that protect artists' rights while fostering innovation. We need transparency about
                how AI systems are trained and what data they use. And we need to ensure that these powerful tools
                remain accessible, not just to large corporations but to individual creators and small studios.
              </p>

              <h2 className="font-serif text-3xl mt-12 mb-6 font-normal">Looking Forward</h2>
              <p className="leading-relaxed text-foreground mb-6">
                The future of creative technology isn't predetermined. It's being written right now by designers,
                artists, engineers, and thinkers who are willing to experiment, question, and push boundaries. The tools
                we build today will shape the creative landscape for generations to come.
              </p>

              <p className="leading-relaxed text-foreground mb-6">
                As we move forward, let's embrace the possibilities while remaining thoughtful about the implications.
                Let's build technology that enhances human creativity rather than replacing it. And let's ensure that
                the future of creative technology is as diverse, inclusive, and inspiring as the human imagination
                itself.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
              <Link
                href="/tags/ai"
                className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full hover:bg-secondary/80 transition-colors"
              >
                #AI
              </Link>
              <Link
                href="/tags/design"
                className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full hover:bg-secondary/80 transition-colors"
              >
                #Design
              </Link>
              <Link
                href="/tags/innovation"
                className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full hover:bg-secondary/80 transition-colors"
              >
                #Innovation
              </Link>
              <Link
                href="/tags/creativity"
                className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full hover:bg-secondary/80 transition-colors"
              >
                #Creativity
              </Link>
            </div>

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
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Copy link"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                  }}
                >
                  <Link2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 p-6 bg-card rounded-lg border border-border">
              <div className="flex gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/professional-woman-portrait.png" alt="Sarah Chen" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">Written by Sarah Chen</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    Technology writer and creative director exploring the intersection of design, AI, and human
                    experience.
                  </p>
                  <a
                    href="https://twitter.com/sarahchen"
                    className="text-sm text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @sarahchen
                  </a>
                </div>
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
