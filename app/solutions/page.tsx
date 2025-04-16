import NewsGrid from "@/components/news-grid";
import { scrapeHackerNewsServer } from "@/lib/server-scraper";

// PDF files list
const pdfFiles = [
  {
    title: "Appendix A - Common DDoS Attacks",
    filename: "appendix-a---common-ddos-attacks.pdf",
    videoUrl: "https://www.youtube.com/watch?app=desktop&v=SOaKed3T6yE",
  },
  {
    title: "Appendix B - Best Practices from People Process Technology (PPT) Perspective",
    filename: "appendix-b---best-practices-from-people-process-technology-(ppt)-perspective.pdf",
    videoUrl: "https://www.youtube.com/watch?v=SblHtU5zTuA",
  },
  {
    title: "Cloud Incident Response Playbook",
    filename: "aws-cloud-ir-playbook.pdf",
    videoUrl: "https://www.youtube.com/watch?v=RmwGQw9GxBw",
  },
  {
    title: "DDoS Mitigation Advisory",
    filename: "dos-mitigation-advisory-infographic.pdf",
    videoUrl: "https://www.youtube.com/watch?v=FIQUUFVE6tU",
  },
  {
    title: "Protecting Your Organisation From Distributed DDoS Attacks",
    filename: "download-infographic.pdf",
    videoUrl: "https://www.youtube.com/watch?v=FIQUUFVE6tU",
  },
  {
    title: "Federal Government Cybersecurity Incident & Vulnerability Response Playbooks",
    filename: "Federal_Government_Cybersecurity_Incident_and_Vulnerability_Response_Playbooks_508C.pdf",
    videoUrl: "https://www.youtube.com/watch?v=PCbtJ-GudLk&list=PLqyUgadpThTIv0J4QVxyXWjpEs22rc0Y_",
  },
  {
    title: "Ransomware Playbook",
    filename: "itsm00099-ransomware-playbook-2021-final3-en.pdf",
    videoUrl: "https://www.youtube.com/watch?v=nhb_GEagMUk",
  },
  {
    title: "Joint Cyber Defense Collaborative Cybersecurity and Infrastructure Security Agency ",
    filename: "JCDC AI Playbook_1.pdf",
    videoUrl: "https://www.youtube.com/watch?v=hzG03JMBKf8",
  },
  {
    title: "MICROSOFT EXPANDED CLOUD LOGS IMPLEMENTATION PLAYBOOK",
    filename: "microsoft-expanded-cloud-logs-implementation-playbook-508c.pdf",
    videoUrl: "https://www.youtube.com/watch?v=3UOdIDhpmoM",
  },
  {
    title: "THE OPEN SOURCE CYBERSECURITY PLAYBOOK",
    filename: "Open-Source-Cybersecurity-Playbook.pdf",
    videoUrl: "https://www.youtube.com/watch?v=52HA_Y8A1Zs",
  },
  {
    title: "Business Email Compromise (BEC) Playbook",
    filename: "Playbook-for-Business-Email-Compromise.pdf",
    videoUrl: "https://www.youtube.com/watch?v=L0s2O0lDBW0",
  },
  {
    title: "Distributed Denial-of-Service Playbook",
    filename: "Playbook-for-DDoS.pdf",
    videoUrl: "https://www.youtube.com/watch?v=MUVFMF9DgM0",
  },
  {
    title: "Malware Infection Playbook",
    filename: "Playbook-for-Malware-Infection.pdf",
    videoUrl: "https://www.youtube.com/watch?v=DPBncJ2a57o",
  },
  {
    title: "Ransomware Response Checklist",
    filename: "Ransomware-Response-Checklist.pdf",
    videoUrl: "https://www.youtube.com/watch?v=w9BOJyNBMfA",
  },
  {
    title: "Ransomware Playbook",
    filename: "rapid7-insightidr-ransomware-playbook.pdf",
    videoUrl: "https://www.youtube.com/watch?v=0M55onu7mVI",
  },


  // Add the rest of your files similarly...
];

export default async function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-start justify-evenly px-4 pb-20">
      <div className="w-full max-w-3xl text-left space-y-6">
        <h2 className=" mt-16 text-3xl font-bold">
          📄 Cybersecurity Playbooks
        </h2>
        <p className="text-gray-400 mt-2 max-w-3xl mx-auto text-left font-bold border-b border-purple-500 pb-2">
        This page provides a collection of cybersecurity playbooks covering various types of threats, attacks, and vulnerabilities. Each playbook offers step-by-step guidance on how to detect, respond to, and recover from specific incidents such as DDoS attacks, ransomware, phishing, and more. These resources are designed to support security teams, students, and professionals in understanding practical response strategies and improving their overall incident handling capabilities.
        </p>
        {/* Loop through PDF files */}
        <div className="space-y-8">
          {pdfFiles.map((file, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-xl font-semibold">{file.title}</h3>
              <div className="flex items-center gap-4">
              <a
                href={`/solutions/playbooks/${file.filename}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition"
              >
                View PDF
              </a>

              <a
                href={file.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition"
              >
                Watch Video
              </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}