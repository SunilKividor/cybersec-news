import Link from "next/link"
import Image from "next/image"
import type { Article } from "@/types/article"

interface TrendingNewsProps {
  articles: Article[]
}

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
}

export default function TrendingNews({ articles }: TrendingNewsProps) {
  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <div key={article.id} className="group flex gap-4">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
            <Image
              src={article.imageUrl || "/placeholder.svg?height=200&width=200"}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col">
            <Link href={`/article/${slugify(article.title)}`}>
              <h3 className="text-sm font-medium leading-tight text-white transition-colors group-hover:text-purple-400">
                {article.title}
              </h3>
            </Link>

            <span className="mt-1 text-xs text-gray-400">{article.date}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

