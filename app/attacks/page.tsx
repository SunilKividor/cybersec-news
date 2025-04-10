import NewsGrid from "@/components/news-grid"
import { scrapeHackerNewsServer } from "@/lib/server-scraper"

export default async function Home() {
  const articles = await scrapeHackerNewsServer("Cyber%20Attack")

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 border-b border-purple-500 pb-2">Attacks</h2>
            <NewsGrid articles={articles} />
          </div>
        </div>
      </div>
    </main>
  )
}
