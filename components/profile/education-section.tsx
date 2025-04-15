import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useUser } from "@/context/UserContext";
import EducationModal from "../profile_modals/EducationModal";
import { useState } from "react";
import { ObjectId } from "mongoose";


interface Education {
  institute: string;
  degree_type: string;
  subject: string;
  start_month: string;
  start_year: string;
  end_year: string;
  end_month: string;
  description: string;
    _id: ObjectId
}



export default function EducationSection() {
  const { user }: any = useUser();
  const education: Education[] | undefined = user?.education;

  const [isOpen, setIsOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [institute, setInstitute] = useState("")
  const [degree_type, setDegree_type] = useState("")
  const [subject, setSubject] = useState("")
  const [start_month, setStart_month] = useState("")
  const [start_year, setStart_year] = useState("")
  const [end_month, setEnd_month] = useState("")
  const [end_year, setEnd_year] = useState("")
  const [description, setDescription] = useState("")
  const [targetId, setTargetId] = useState("")

  return (
    <>
 
    <div className="bg-white rounded-xl shadow p-6">
    
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Education</h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-full"
          onClick={() => {
            setInstitute("")
              setDegree_type("")
              setSubject("")
              setStart_month("")
              setStart_year("")
              setEnd_month("")
              setEnd_year("")
              setDescription("")
              setIsOpen(true)
              setEditing(false)
          }}
          >
            <PlusIcon className="h-5 w-5" />
          </Button>
          {/* <Button variant="ghost" size="icon" className="rounded-full">
            <PencilIcon className="h-5 w-5" />
          </Button> */}
        </div>
      </div>

      {(education ?? []).map((item, index) => (
       item.institute && <div
          className="flex flex-col sm:flex-row gap-4 mb-6 pb-6 border-b "
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
          <div className=" w-full">
            <div className="flex items-center justify-between">
            <h3 className="font-semibold">{item.institute}</h3>
            <Button variant="ghost" size="icon" className="rounded-full"
            onClick={() => {
              setInstitute(item.institute)
              setDegree_type(item.degree_type)
              setSubject(item.subject)
              setStart_month(item.start_month)
              setStart_year(item.start_year)
              setEnd_month(item.end_month)
              setEnd_year(item.end_year)
              setDescription(item.description)
              setTargetId(item._id.toString())
              setIsOpen(true)
              setEditing(true)
            }}

            >
            <PencilIcon className="h-5 w-5" />
          </Button>
            </div>
           {item.degree_type && item.subject && <p className="text-gray-700">
              {item.degree_type}, {item.subject}
            </p>}
           {item.start_year && item.end_year &&  <p className="text-sm text-gray-500">
            {item.start_month} {item.start_year} - {item.end_month} {item.end_year}
            </p>}
           {item.description &&  <div className="mt-2 text-gray-700">
              <p>{item.description}</p>
            </div>}
          </div>
        </div>
      ))}
     <EducationModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  school={institute}
  degree={degree_type}
  field={subject}
  s_month={start_month}
  s_year={start_year}
  e_month={end_month}
  e_year={end_year}
  desc={description}
  edit={editing}
  targetId={targetId}
  />
    </div>
    
    </>
  );
}
