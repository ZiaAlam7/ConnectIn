import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PencilIcon, PlusIcon } from "lucide-react"

export default function EducationSection() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Education</h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <PlusIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <PencilIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Education Item 1 */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 pb-6 border-b">
        <div className="flex-shrink-0 mb-2 sm:mb-0">
          <Image
            src="/placeholder.svg?height=64&width=64"
            alt="University Logo"
            className="rounded object-contain"
            width={64}
            height={64}
          />
        </div>
        <div>
          <h3 className="font-semibold">Stanford University</h3>
          <p className="text-gray-700">Master of Science - MS, Computer Science</p>
          <p className="text-sm text-gray-500">2013 - 2015</p>
          <div className="mt-2 text-gray-700">
            <p>• Specialized in Artificial Intelligence and Machine Learning</p>
            <p>• GPA: 3.9/4.0</p>
            <p>• Research Assistant in the Natural Language Processing Lab</p>
          </div>
        </div>
      </div>

      {/* Education Item 2 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-shrink-0 mb-2 sm:mb-0">
          <Image
            src="/placeholder.svg?height=64&width=64"
            alt="University Logo"
            className="rounded object-contain"
            width={64}
            height={64}
          />
        </div>
        <div>
          <h3 className="font-semibold">University of Washington</h3>
          <p className="text-gray-700">Bachelor of Science - BS, Computer Science</p>
          <p className="text-sm text-gray-500">2009 - 2013</p>
          <div className="mt-2 text-gray-700">
            <p>• Minor in Mathematics</p>
            <p>• Dean's List: 7 semesters</p>
            <p>• President of the Computer Science Club</p>
          </div>
        </div>
      </div>
    </div>
  )
}

