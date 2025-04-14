import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useUser } from "@/context/UserContext";
import EducationModal from "../profile_modals/EducationModal";
import { useState } from "react";

interface Education {
  institute: string;
  degree_type: string;
  subject: string;
  start_year: string;
  end_year: string;
  description: string;
}

type User = {
  education: Education[];
};

export default function EducationSection() {
  const { user } = useUser() as { user: User | null };
  const education = user?.education ?? [];

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
 
    <div className="bg-white rounded-xl shadow p-6">
    <EducationModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Education</h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-full"
          onClick={() => setIsOpen(true)}
          >
            <PlusIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <PencilIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {education.map((item, index) => (
       item.institute && <div
          className="flex flex-col sm:flex-row gap-4 mb-6 pb-6 border-b"
          key={index}
        >
          {/* <div className="flex-shrink-0 mb-2 sm:mb-0">
            <Image
              src="/placeholder.svg?height=64&width=64"
              alt="University Logo"
              className="rounded object-contain"
              width={64}
              height={64}
            />
          </div> */}
          <div>
            <h3 className="font-semibold">{item.institute}</h3>
           {item.degree_type && item.subject && <p className="text-gray-700">
              {item.degree_type}, {item.subject}
            </p>}
           {item.start_year && item.end_year &&  <p className="text-sm text-gray-500">
              {item.start_year} - {item.end_year}
            </p>}
           {item.description &&  <div className="mt-2 text-gray-700">
              <p>{item.description}</p>
            </div>}
          </div>
        </div>
      ))}
     
    </div>
    
    </>
  );
}
