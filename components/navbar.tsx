"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Shield, AlertTriangle, Terminal, Search, Zap } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-black border-b border-purple-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Shield className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                CyberPulse
              </span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-300 hover:text-purple-400 flex items-center">
              <Zap className="mr-1 h-4 w-4" />
              <span>Latest</span>
            </Link>
            <Link href="/vulnerabilities" className="text-gray-300 hover:text-purple-400 flex items-center">
              <AlertTriangle className="mr-1 h-4 w-4" />
              <span>Vulnerabilities</span>
            </Link>
            <Link href="/attacks" className="text-gray-300 hover:text-purple-400 flex items-center">
              <Terminal className="mr-1 h-4 w-4" />
              <span>Attacks</span>
            </Link>
          </div>

          <div className="flex items-center">
            <div className="hidden md:flex items-center bg-gray-800 rounded-full px-3 py-1">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none focus:outline-none text-white ml-2 w-32"
              />
            </div>

            <button className="md:hidden text-gray-300 hover:text-white focus:outline-none" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 py-4">
          <div className="container mx-auto px-4 space-y-4">
            <Link href="/" className="block text-gray-300 hover:text-purple-400" onClick={() => setIsMenuOpen(false)}>
              Latest
            </Link>
            <Link
              href="/vulnerabilities"
              className="block text-gray-300 hover:text-purple-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Vulnerabilities
            </Link>
            <Link
              href="/attacks"
              className="block text-gray-300 hover:text-purple-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Attacks
            </Link>
            <div className="flex items-center bg-gray-800 rounded-full px-3 py-1">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none focus:outline-none text-white ml-2 w-full"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

