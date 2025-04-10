import NewsGrid from "@/components/news-grid"
import { scrapeHackerNewsServer } from "@/lib/server-scraper"

export default async function Home() {

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold border-b border-purple-500 pb-2">Adding Soon</h2>
      </div>
    </main>
  )
}
