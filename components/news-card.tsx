import Image from "next/image"
import Link from "next/link"
import { Calendar, Tag } from "lucide-react"
import type { Article } from "@/types/article"

interface NewsCardProps {
  article: Article
}

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg bg-gray-800 transition-all hover:shadow-lg hover:shadow-purple-500/20">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={article.imageUrl || "/placeholder.svg?height=400&width=600"}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-3">
          <span className="flex items-center text-xs text-gray-400">
            <Calendar className="mr-1 h-3 w-3" />
            {article.date}
          </span>
          <span className="flex items-center rounded-full bg-purple-500/20 px-2 py-1 text-xs text-purple-300">
            <Tag className="mr-1 h-3 w-3" />
            {article.category}
          </span>
        </div>

        <Link href={`/article/${slugify(article.title)}`}>
          <h2 className="mb-2 text-lg font-bold leading-tight text-white transition-colors group-hover:text-purple-400">
            {article.title}
          </h2>
        </Link>

        <p className="line-clamp-2 text-sm text-gray-400 mb-4">{article.summary}</p>

        <Link href={`/article/${slugify(article.title)}`}
          className="mt-auto inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300"
        >
          Read more
          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

