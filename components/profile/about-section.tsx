import { Button } from "@/components/ui/button"
import { PencilIcon } from "lucide-react"

export default function AboutSection() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">About</h2>
        <Button variant="ghost" size="icon" className="rounded-full">
          <PencilIcon className="h-5 w-5" />
        </Button>
      </div>

      <p className="text-gray-700 whitespace-pre-line">
        Passionate software engineer with 8+ years of experience building scalable web applications and leading
        engineering teams. Specialized in React, Node.js, and cloud architecture. I thrive in collaborative environments
        and enjoy mentoring junior developers. Currently focused on improving performance optimization techniques and
        exploring machine learning applications in web development.
      </p>
    </div>
  )
}

