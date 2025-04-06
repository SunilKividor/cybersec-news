import NewsCard from "./news-card"
import type { Article } from "@/types/article"

interface NewsGridProps {
  articles: Article[]
}

export default function NewsGrid({ articles }: NewsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  )
}

