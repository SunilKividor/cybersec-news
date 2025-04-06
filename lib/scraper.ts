import type { Article } from "@/types/article"
import { v4 as uuidv4 } from "uuid"

// This function will be called by the server to get articles
export async function getArticles(): Promise<Article[]> {
  try {
    // In production, this would call the scraping function
    // For now, we'll return mock data to avoid Puppeteer issues in the browser
    return getMockArticles()
  } catch (error) {
    console.error("Error fetching articles:", error)
    return []
  }
}

// The actual scraping function that would be used in production
// This would be called by a server-side process, not directly from the browser
export async function scrapeHackerNews(): Promise<Article[]> {
  // In a real production environment, this would be:
  // 1. Either run as a separate Node.js process
  // 2. Or run as a serverless function/API route with proper Puppeteer setup

  // For demonstration, we're returning mock data
  console.log("Scraping would happen here in production")
  return getMockArticles()
}

// Mock data for development
function getMockArticles(): Article[] {
  return [
    {
      id: uuidv4(),
      title: "Microsoft Credits EncryptHub, Hacker Behind 618+ Breaches, for Disclosing Windows Flaws",
      summary:
        "A likely lone wolf actor behind the EncryptHub persona was acknowledged by Microsoft for discovering and reporting two security flaws in Windows last month.",
      content:
        "A likely lone wolf actor behind the EncryptHub persona was acknowledged by Microsoft for discovering and reporting two security flaws in Windows last month. The vulnerabilities, tracked as CVE-2023-36563 and CVE-2023-36563, could allow attackers to bypass security features and execute arbitrary code.",
      imageUrl: "/placeholder.svg?height=600&width=800",
      url: "#",
      date: "Apr 05, 2023",
      category: "Malware",
    },
    {
      id: uuidv4(),
      title: "Protect Your Organization's use of GenAI and Guard Against AI-Powered Threats",
      summary:
        "AI drives innovation and efficiency—but also helps bad actors deliver more relentless and effective attacks.",
      content:
        "AI drives innovation and efficiency—but also helps bad actors deliver more relentless and effective attacks. Organizations must implement robust security measures to protect against these emerging threats while still leveraging the benefits of generative AI technologies.",
      imageUrl: "/placeholder.svg?height=600&width=800",
      url: "#",
      date: "Apr 05, 2023",
      category: "AI Security",
    },
    {
      id: uuidv4(),
      title: "North Korean Hackers Deploy BeaverTail Malware via 11 Malicious npm Packages",
      summary:
        "The North Korean threat actors behind the ongoing Contagious Interview campaign are spreading their tentacles on the npm ecosystem by publishing more malicious packages.",
      content:
        "The North Korean threat actors behind the ongoing Contagious Interview campaign are spreading their tentacles on the npm ecosystem by publishing more malicious packages. These packages contain the BeaverTail malware, which can steal sensitive information and provide backdoor access to compromised systems.",
      imageUrl: "/placeholder.svg?height=600&width=800",
      url: "#",
      date: "Apr 05, 2023",
      category: "Supply Chain Attack",
    },
    {
      id: uuidv4(),
      title: "Malicious Python Packages on PyPI Downloaded 39,000+ Times, Steal Sensitive Data",
      summary:
        "Cybersecurity researchers have uncovered malicious libraries in the Python Package Index (PyPI) repository that are designed to steal sensitive information.",
      content:
        "Cybersecurity researchers have uncovered malicious libraries in the Python Package Index (PyPI) repository that are designed to steal sensitive information. These packages have been downloaded over 39,000 times, potentially compromising thousands of development environments and production systems.",
      imageUrl: "/placeholder.svg?height=600&width=800",
      url: "#",
      date: "Apr 05, 2023",
      category: "Supply Chain Attack",
    },
    {
      id: uuidv4(),
      title: "SpotBugs Access Token Theft Identified as Root Cause of GitHub Supply Chain Attack",
      summary:
        'The cascading supply chain attack that initially targeted Coinbase before becoming more widespread to single out users of the "tj-actions/changed-files".',
      content:
        'The cascading supply chain attack that initially targeted Coinbase before becoming more widespread to single out users of the "tj-actions/changed-files". Investigators have identified the theft of SpotBugs access tokens as the initial entry point that allowed attackers to compromise the software supply chain.',
      imageUrl: "/placeholder.svg?height=600&width=800",
      url: "#",
      date: "Apr 04, 2023",
      category: "Vulnerability",
    },
    {
      id: uuidv4(),
      title: "Have We Reached a Distroless Tipping Point?",
      summary:
        "There's a virtuous cycle in technology that pushes the boundaries of what's being built and how it's being used. A new technology development emerges and spreads.",
      content:
        "There's a virtuous cycle in technology that pushes the boundaries of what's being built and how it's being used. A new technology development emerges and spreads. Distroless containers, which contain only the application and its runtime dependencies without a package manager or shell, are gaining popularity for their security benefits and reduced attack surface.",
      imageUrl: "/placeholder.svg?height=600&width=800",
      url: "#",
      date: "Apr 04, 2023",
      category: "Application Security",
    },
    {
      id: uuidv4(),
      title: "Weekly Recap: Chrome 0-Day, IngressNightmare, Solar Bugs, DNS Tactics, and More",
      summary:
        "This week's cybersecurity news roundup covers critical vulnerabilities in Google Chrome, a new attack vector called IngressNightmare, security flaws in solar power systems, and DNS-based attack techniques.",
      content:
        "This week's cybersecurity news roundup covers critical vulnerabilities in Google Chrome, a new attack vector called IngressNightmare, security flaws in solar power systems, and DNS-based attack techniques. Security researchers continue to discover new threats across multiple technology domains.",
      imageUrl: "/placeholder.svg?height=600&width=800",
      url: "#",
      date: "Apr 03, 2023",
      category: "Weekly Recap",
    },
    {
      id: uuidv4(),
      title: "Top 3 MS Office Exploits Hackers Use in 2023 – Stay Alert!",
      summary:
        "Microsoft Office remains a prime target for attackers, with three major exploit types dominating the threat landscape in 2023. Organizations must stay vigilant against these evolving threats.",
      content:
        "Microsoft Office remains a prime target for attackers, with three major exploit types dominating the threat landscape in 2023. Organizations must stay vigilant against these evolving threats. The exploits leverage macros, template injection, and DDE (Dynamic Data Exchange) to compromise systems and steal sensitive information.",
      imageUrl: "/placeholder.svg?height=600&width=800",
      url: "#",
      date: "Apr 03, 2023",
      category: "Exploits",
    },
    {
      id: uuidv4(),
      title: "10 Critical Network Pentest Findings IT Teams Overlook",
      summary:
        "Network penetration testing often reveals security gaps that IT teams miss during routine maintenance and monitoring. These ten critical findings are commonly overlooked but pose significant risks.",
      content:
        "Network penetration testing often reveals security gaps that IT teams miss during routine maintenance and monitoring. These ten critical findings are commonly overlooked but pose significant risks. From misconfigured firewalls to unpatched network devices, these vulnerabilities can provide attackers with entry points into otherwise secure networks.",
      imageUrl: "/placeholder.svg?height=600&width=800",
      url: "#",
      date: "Apr 02, 2023",
      category: "Network Security",
    },
    {
      id: uuidv4(),
      title: "AI Adoption in the Enterprise: Breaking Through the Security and Compliance Gridlock",
      summary:
        "Enterprises face significant challenges when adopting AI technologies, particularly around security and compliance requirements. Breaking through this gridlock requires a strategic approach.",
      content:
        "Enterprises face significant challenges when adopting AI technologies, particularly around security and compliance requirements. Breaking through this gridlock requires a strategic approach. Organizations must balance innovation with risk management to successfully implement AI while maintaining security posture and regulatory compliance.",
      imageUrl: "/placeholder.svg?height=600&width=800",
      url: "#",
      date: "Apr 02, 2023",
      category: "AI Security",
    },
  ]
}

