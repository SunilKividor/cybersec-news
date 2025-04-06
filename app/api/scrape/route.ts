import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

// This would be a server-side only import
import { scrapeHackerNewsServer } from "@/lib/server-scraper"

// This is a server-side API route that can be called to trigger scraping
export async function GET() {
  try {
    // Only run this in production or when explicitly enabled
    if (process.env.NODE_ENV !== "production" && !process.env.ENABLE_SCRAPING) {
      return NextResponse.json({
        message: "Scraping is disabled in development. Set ENABLE_SCRAPING=true to enable.",
        mockData: true,
        articles: [],
      })
    }

    // Perform the scraping
    const articles = await scrapeHackerNewsServer()

    // Save the articles to the data directory
    const dataDir = path.join(process.cwd(), "data")
    await fs.mkdir(dataDir, { recursive: true })

    const timestamp = new Date().toISOString().replace(/:/g, "-")
    const filePath = path.join(dataDir, `articles-${timestamp}.json`)

    await fs.writeFile(filePath, JSON.stringify(articles, null, 2))

    // Also update the latest.json file
    const latestPath = path.join(dataDir, "latest.json")
    await fs.writeFile(latestPath, JSON.stringify(articles, null, 2))

    return NextResponse.json({
      success: true,
      message: "Scraping completed successfully",
      count: articles.length,
    })
  } catch (error) {
    console.error("Error in scrape API route:", error)
    return NextResponse.json({ success: false, message: "Scraping failed", error: String(error) }, { status: 500 })
  }
}

