import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PencilIcon, PlusIcon } from "lucide-react"

export default function CertificationsSection() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Licenses & Certifications</h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <PlusIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <PencilIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Certification Item 1 */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 pb-6 border-b">
        <div className="flex-shrink-0 mb-2 sm:mb-0">
          <Image
            src="/placeholder.svg?height=64&width=64"
            alt="Certification Logo"
            className="rounded object-contain"
            width={64}
            height={64}
          />
        </div>
        <div>
          <h3 className="font-semibold">AWS Certified Solutions Architect - Professional</h3>
          <p className="text-gray-700">Amazon Web Services (AWS)</p>
          <p className="text-sm text-gray-500">Issued Jan 2022 · Expires Jan 2025</p>
          <p className="text-sm text-gray-500">Credential ID: AWS-PSA-12345</p>
          <Button variant="link" className="px-0 h-auto text-blue-600">
            Show credential
          </Button>
        </div>
      </div>

      {/* Certification Item 2 */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 pb-6 border-b">
        <div className="flex-shrink-0 mb-2 sm:mb-0">
          <Image
            src="/placeholder.svg?height=64&width=64"
            alt="Certification Logo"
            className="rounded object-contain"
            width={64}
            height={64}
          />
        </div>
        <div>
          <h3 className="font-semibold">Google Cloud Professional Cloud Architect</h3>
          <p className="text-gray-700">Google Cloud</p>
          <p className="text-sm text-gray-500">Issued Mar 2021 · Expires Mar 2024</p>
          <p className="text-sm text-gray-500">Credential ID: GCP-PCA-67890</p>
          <Button variant="link" className="px-0 h-auto text-blue-600">
            Show credential
          </Button>
        </div>
      </div>

      {/* Certification Item 3 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-shrink-0 mb-2 sm:mb-0">
          <Image
            src="/placeholder.svg?height=64&width=64"
            alt="Certification Logo"
            className="rounded object-contain"
            width={64}
            height={64}
          />
        </div>
        <div>
          <h3 className="font-semibold">Certified Kubernetes Administrator (CKA)</h3>
          <p className="text-gray-700">Cloud Native Computing Foundation</p>
          <p className="text-sm text-gray-500">Issued Jun 2020 · No Expiration Date</p>
          <p className="text-sm text-gray-500">Credential ID: CKA-2020-06-123456</p>
          <Button variant="link" className="px-0 h-auto text-blue-600">
            Show credential
          </Button>
        </div>
      </div>
    </div>
  )
}

