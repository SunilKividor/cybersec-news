// This file would only be imported on the server side
import type { Article } from "@/types/article"
import { v4 as uuidv4 } from "uuid"
import puppeteer from "puppeteer"

// This function would be used in a real production environment
// It would be called by a server-side process or API route
export async function scrapeHackerNewsServer(category_path: string): Promise<Article[]> {
  try {
    // In a real production environment, we would dynamically import puppeteer-core here
    // to ensure it only runs on the server
    console.log("Entering scrapeHackerNewsServer()")
    // const puppeteer = await import("puppeteer-core")

    console.log('Using executable path:', process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium');
    
    // const browser = await puppeteer.launch({
    //   executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
    //   headless: true,
    //   args: [
    //     '--no-sandbox',
    //     '--disable-setuid-sandbox',
    //     '--disable-dev-shm-usage',
    //     '--disable-gpu',
    //     '--no-zygote',
    //     '--single-process',
    //   ],
    // });    

    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    let path = "https://thehackernews.com/";

    if (category_path !== "") {
      path = `https://thehackernews.com/search/label/${category_path}`;
    }

    try {
      const page = await browser.newPage()
      await page.goto(path, {
        waitUntil: "networkidle2",
      })

      // Extract articles
      const articles = await page.evaluate(() => {
        const articleElements = document.querySelectorAll(".body-post")

        return Array.from(articleElements).map((article) => {
          // Extract article data
          const titleElement = article.querySelector(".home-title")
          const title = titleElement ? titleElement.textContent?.trim() : ""

          const linkElement = article.querySelector("a")
          const url = linkElement ? linkElement.href : ""

          const imageElement = article.querySelector("img")
          const imageUrl = imageElement ? imageElement.src : ""

          const dateElement = article.querySelector(".item-label")
          const date = dateElement ? dateElement.textContent?.trim() : ""

          const categoryElement = article.querySelector(".h-category")
          const category = categoryElement ? categoryElement.textContent?.trim() : "Cybersecurity"

          const summaryElement = article.querySelector(".home-desc")
          const summary = summaryElement ? summaryElement.textContent?.trim() : ""

          return {
            title,
            url,
            imageUrl,
            date,
            category,
            summary,
            content: summary, // Full content would be scraped from the article page
          }
        })
      })

      // Format the articles
      return articles.map((article) => ({
        id: uuidv4(),
        title: article.title || "Untitled Article",
        summary: article.summary || "No summary available",
        content: article.content || "No content available",
        imageUrl: article.imageUrl || "",
        url: article.url || "#",
        date: article.date || new Date().toLocaleDateString(),
        category: article.category || "Cybersecurity",
      }))
    } finally {
      await browser.close()
    }
  } catch (error) {
    console.error("Error in server-side scraper:", error)
    // Return mock data as fallback
    return getMockArticles()
  }
}

// Mock data for development or fallback
function getMockArticles(): Article[] {
  return [
    {
      id: uuidv4(),
      title: "EncryptHub, Hacker Behind 618+ Breaches, for Disclosing Windows Flaws",
      summary:
        "A likely lone wolf actor behind the EncryptHub persona was acknowledged by Microsoft for discovering and reporting two security flaws in Windows last month.",
      content:
        "A likely lone wolf actor behind the EncryptHub persona was acknowledged by Microsoft for discovering and reporting two security flaws in Windows last month. The vulnerabilities, tracked as CVE-2023-36563 and CVE-2023-36563, could allow attackers to bypass security features and execute arbitrary code.",
      imageUrl: "/placeholder.svg?height=600&width=800",
      url: "#",
      date: "Apr 05, 2023",
      category: "Malware",
    },
    // Other mock articles...
  ]
}

