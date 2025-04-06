import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CyberPulse - Cybersecurity News",
  description: "Stay updated with the latest cybersecurity news and trends",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar />
          {children}
          <footer className="bg-black text-gray-400 py-8 border-t border-purple-800">
            <div className="container mx-auto px-4">
              <div className="text-center">
                <p>© {new Date().getFullYear()} CyberPulse. All rights reserved.</p>
                <p className="text-xs mt-2">
                  News content sourced from The Hacker News. This site is for educational purposes only.
                </p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'