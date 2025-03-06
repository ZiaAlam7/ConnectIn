import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PencilIcon, CameraIcon, PlusIcon } from "lucide-react"

export default function ProfileHeader() {
  return (
    <div className="bg-white shadow rounded-b-xl w-full max-w-[75%] mx-auto">
      {/* Cover Image */}
      <div className="relative h-60 w-full">
        <Image
          src="/placeholder.svg?height=400&width=1200"
          alt="Cover Image"
          className="object-cover w-full h-full rounded-t-xl"
          width={1200}
          height={400}
        />
        <button className="absolute right-4 bottom-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
          <CameraIcon className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-6 relative">
        {/* Profile Picture */}
        <div className="absolute -top-20 left-6 border-4 border-white rounded-full shadow-xl sm:left-8">
          <div className="relative">
            <Image
              src="/placeholder.svg?height=160&width=160"
              alt="Profile Picture"
              className="rounded-full object-cover"
              width={160}
              height={160}
            />
            <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
              <CameraIcon className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mb-4 pt-4">
          <Button variant="outline" size="sm" className="rounded-full">
            <PlusIcon className="h-4 w-4 mr-1" />
            Add profile section
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            More
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <PencilIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* User Info */}
        <div className="mt-16">
          <h1 className="text-2xl font-bold">Alex Johnson</h1>
          <h2 className="text-lg text-gray-700">Senior Software Engineer at TechCorp</h2>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <span>San Francisco, California</span>
            <span className="mx-1">•</span>
            <span className="text-blue-600 font-medium">500+ connections</span>
            <span className="mx-1">•</span>
            <span className="text-blue-600 font-medium">Contact info</span>
          </div>

          <div className="flex gap-2 mt-4">
            <Button className="rounded-full bg-blue-600 hover:bg-blue-700">Message</Button>
            <Button variant="outline" className="rounded-full">
              Connect
            </Button>
            <Button variant="outline" className="rounded-full">
              More
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

