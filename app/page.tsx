import NewsGrid from "@/components/news-grid"
import TrendingNews from "@/components/trending-news"
import FeaturedArticle from "@/components/featured-article"
import { getArticles } from "@/lib/scraper"

export default async function Home() {
  const articles = await getArticles()

  // Separate featured article and trending news
  const featuredArticle = articles[0]
  const trendingArticles = articles.slice(1, 5)
  const regularArticles = articles.slice(5)

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <FeaturedArticle article={featuredArticle} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 border-b border-purple-500 pb-2">Latest News</h2>
            <NewsGrid articles={regularArticles} />
          </div>

          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-6 border-b border-purple-500 pb-2">Trending</h2>
            <TrendingNews articles={trendingArticles} />
          </div>
        </div>
      </div>
    </main>
  )
}

