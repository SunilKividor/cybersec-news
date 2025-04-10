import Image from "next/image"
import Link from "next/link"
import { Calendar, Tag } from "lucide-react"
import type { Article } from "@/types/article"

interface FeaturedArticleProps {
  article: Article
}

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gray-800 transition-all hover:shadow-xl hover:shadow-purple-500/20">
      <div className="relative h-80 w-full overflow-hidden">
        <Image
          src={article.imageUrl || "/placeholder.svg?height=600&width=800"}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
      </div>

      <div className="absolute bottom-0 w-full p-6">
        <div className="mb-2 flex items-center gap-3">
          <span className="flex items-center text-xs text-gray-300">
            <Calendar className="mr-1 h-3 w-3" />
            {article.date}
          </span>
          <span className="flex items-center rounded-full bg-purple-500/20 px-2 py-1 text-xs text-purple-300">
            <Tag className="mr-1 h-3 w-3" />
            {article.category}
          </span>
        </div>

        <Link href={`/article/${slugify(article.title)}`}>
          <h1 className="mb-2 text-2xl font-bold leading-tight text-white transition-colors group-hover:text-purple-400 md:text-3xl">
            {article.title}
          </h1>
        </Link>

        <p className="line-clamp-2 text-sm text-gray-300">{article.summary}</p>
      </div>
    </div>
  )
}

