import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { ObjectId } from "mongoose";
import { useEffect, useState } from "react";
import WorkModal from "../profile_modals/WorkModal";

interface Work {
  job_title: string;
  company_name: string;
  employment_type: string;
  city: string;
  country: string;
  start_year: string;
  start_month: string;
  end_year: string;
  end_month: string;
  description: string;
  _id: ObjectId;
}

interface Other_User_Props {
  other_user?: any;
}


export default function ExperienceSection({ other_user }: Other_User_Props) {
  const { user: contextUser } = useUser();
    const [user, setUser] = useState<any>(other_user ?? contextUser ?? null);
  
    // if `other_user` changes, update
    useEffect(() => {
      if (other_user) {
        setUser(other_user);
      } else if (contextUser) {
        setUser(contextUser);
      }
    }, [other_user, contextUser]);
    
  const work: Work[] | undefined = user?.work;

  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [job_title, setJob_title] = useState("");
  const [company_name, setCompany_name] = useState("");
  const [employment_type, setEmployment_type] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [start_month, setStart_month] = useState("");
  const [start_year, setStart_year] = useState("");
  const [end_month, setEnd_month] = useState("");
  const [end_year, setEnd_year] = useState("");
  const [description, setDescription] = useState("");
  const [targetId, setTargetId] = useState("");


  const getTimePassed = (month: string, year: string): string => {
    const start = new Date(`${month} 1, ${year}`);
    const now = new Date();
    const diffMonths =
      (now.getFullYear() - start.getFullYear()) * 12 +
      (now.getMonth() - start.getMonth());
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;

    return `${years} year${years !== 1 ? "s" : ""} ${months} month${
      months !== 1 ? "s" : ""
    }`;
  };

  const getDurationBetweenDates = (
    startMonth: string,
    startYear: string,
    endMonth: string,
    endYear: string
  ): string => {
    const start = new Date(`${startMonth} 1, ${startYear}`);
    const end = new Date(`${endMonth} 1, ${endYear}`);
    const diffMonths =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());

    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;

    return `${years} year${years !== 1 ? "s" : ""} ${months} month${
      months !== 1 ? "s" : ""
    }`;
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Experience</h2>
        <div className="flex gap-2">
          {!other_user && <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => {
              setJob_title("");
              setCompany_name("");
              setEmployment_type("");
              setCountry("");
              setCity("");
              setStart_month("");
              setStart_year("");
              setEnd_month("");
              setEnd_year("");
              setDescription("");
              setIsOpen(true);
              setEditing(false);
            }}
          >
            <PlusIcon className="h-5 w-5" />
          </Button>}
        </div>
      </div>

      {(work ?? []).map(
        (item, index) =>
          item.job_title && (
            <div
              className="flex flex-col sm:flex-row gap-4 mb-6 pb-6 border-b"
              key={index}
            >
              {/* <div className="flex-shrink-0 mb-2 sm:mb-0">
            <Image
            src="/placeholder.svg?height=64&width=64"
            alt="Company Logo"
            className="rounded object-contain"
            width={64}
            height={64}
          />
          </div> */}
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{item.job_title}</h3>
                  {!other_user && <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => {
                      setJob_title(item.job_title);
                      setCompany_name(item.company_name);
                      setEmployment_type(item.employment_type);
                      setCountry(item.country);
                      setCity(item.city);
                      setStart_month(item.start_month);
                      setStart_year(item.start_year);
                      setEnd_month(item.end_month);
                      setEnd_year(item.end_year);
                      setDescription(item.description);
                      setTargetId(item._id.toString());
                      setIsOpen(true);
                      setEditing(true);
                    }}
                  >
                    <PencilIcon className="h-5 w-5" />
                  </Button>}
                </div>
                {item.company_name && (
                  <p className="text-gray-700">{item.company_name}</p>
                )}
                {item.start_month && item.start_year && (
                  <p className="text-sm text-gray-500">
                    {item.start_month} {item.start_year} - {" "}
                    {item.end_month === "working"
                      ? "Present"
                      : `${item.end_month} ${item.end_year}`}{" "}
                    ·{" "}
                    {item.end_month === "working"
                      ? getTimePassed(item.start_month, item.start_year)
                      : getDurationBetweenDates(
                          item.start_month,
                          item.start_year,
                          item.end_month,
                          item.end_year
                        )}
                  </p>
                )}
                {item.country && (
                  <p className="text-sm text-gray-500">
                    {item.city && `${item.city},`} {item.country}
                  </p>
                )}
                {item.description && (
                  <div className="mt-2 text-gray-700">
                    <p>{item.description}</p>
                  </div>
                )}
              </div>
            </div>
          )
      )}

<WorkModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={job_title}
        company={company_name}
        work_type={employment_type}
        work_city={city}
        work_country={country}
        s_month={start_month}
        s_year={start_year}
        e_month={end_month}
        e_year={end_year}
        desc={description}
        edit={editing}
        targetId={targetId}
      />
    </div>
  );
}
