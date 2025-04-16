// app/article/[slug]/page.tsx
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Tag, ArrowLeft } from "lucide-react"
import { scrapeHackerNewsServer } from "@/lib/server-scraper"

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
}

export default async function ArticlePage(props: {
  params: { slug: string }
})  {
  // ✅ params is safe to use here
  const { slug } = await props.params;

  const articles = await scrapeHackerNewsServer("")
  const article = articles.find((a) => slugify(a.title) === slug)

  if (!article) return notFound()

    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      console.log("runnning")
      console.log(article.title);
    }
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <article className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
            <span className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {article.date}
            </span>
            <span className="flex items-center rounded-full bg-purple-500/20 px-3 py-1 text-purple-300">
              <Tag className="mr-1 h-4 w-4" />
              {article.category}
            </span>
          </div>

          <div className="relative h-80 w-full overflow-hidden rounded-xl mb-8">
            <Image
              src={article.imageUrl || "/placeholder.svg?height=600&width=800"}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-invert prose-purple max-w-none">
            <p className="text-xl font-medium mb-6">{article.summary}</p>
            {article.content.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </main>
  )
}
