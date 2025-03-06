import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PencilIcon, PlusIcon } from "lucide-react"

export default function ExperienceSection() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Experience</h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <PlusIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <PencilIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Experience Item 1 */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 pb-6 border-b">
        <div className="flex-shrink-0 mb-2 sm:mb-0">
          <Image
            src="/placeholder.svg?height=64&width=64"
            alt="Company Logo"
            className="rounded object-contain"
            width={64}
            height={64}
          />
        </div>
        <div>
          <h3 className="font-semibold">Senior Software Engineer</h3>
          <p className="text-gray-700">TechCorp</p>
          <p className="text-sm text-gray-500">Jan 2020 - Present · 3 yrs 8 mos</p>
          <p className="text-sm text-gray-500">San Francisco, California</p>
          <div className="mt-2 text-gray-700">
            <p>• Led the frontend development team for the company's flagship product</p>
            <p>• Improved application performance by 40% through code optimization</p>
            <p>• Mentored junior developers and conducted technical interviews</p>
          </div>
        </div>
      </div>

      {/* Experience Item 2 */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 pb-6 border-b">
        <div className="flex-shrink-0 mb-2 sm:mb-0">
          <Image
            src="/placeholder.svg?height=64&width=64"
            alt="Company Logo"
            className="rounded object-contain"
            width={64}
            height={64}
          />
        </div>
        <div>
          <h3 className="font-semibold">Software Engineer</h3>
          <p className="text-gray-700">InnovateTech</p>
          <p className="text-sm text-gray-500">Mar 2017 - Dec 2019 · 2 yrs 10 mos</p>
          <p className="text-sm text-gray-500">Austin, Texas</p>
          <div className="mt-2 text-gray-700">
            <p>• Developed and maintained multiple client-facing web applications</p>
            <p>• Implemented CI/CD pipelines that reduced deployment time by 60%</p>
            <p>• Collaborated with design and product teams to deliver high-quality features</p>
          </div>
        </div>
      </div>

      {/* Experience Item 3 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-shrink-0 mb-2 sm:mb-0">
          <Image
            src="/placeholder.svg?height=64&width=64"
            alt="Company Logo"
            className="rounded object-contain"
            width={64}
            height={64}
          />
        </div>
        <div>
          <h3 className="font-semibold">Junior Developer</h3>
          <p className="text-gray-700">StartupHub</p>
          <p className="text-sm text-gray-500">Jun 2015 - Feb 2017 · 1 yr 9 mos</p>
          <p className="text-sm text-gray-500">Seattle, Washington</p>
          <div className="mt-2 text-gray-700">
            <p>• Built responsive web interfaces using React and Redux</p>
            <p>• Participated in agile development processes and sprint planning</p>
            <p>• Contributed to open-source projects and internal libraries</p>
          </div>
        </div>
      </div>
    </div>
  )
}

