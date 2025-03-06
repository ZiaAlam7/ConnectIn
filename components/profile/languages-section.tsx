import { Button } from "@/components/ui/button"
import { PencilIcon, PlusIcon } from "lucide-react"

export default function LanguagesSection() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Languages</h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <PlusIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <PencilIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">English</h3>
          <p className="text-sm text-gray-500">Native or bilingual proficiency</p>
        </div>

        <div>
          <h3 className="font-semibold">Spanish</h3>
          <p className="text-sm text-gray-500">Professional working proficiency</p>
        </div>

        <div>
          <h3 className="font-semibold">French</h3>
          <p className="text-sm text-gray-500">Elementary proficiency</p>
        </div>
      </div>
    </div>
  )
}

