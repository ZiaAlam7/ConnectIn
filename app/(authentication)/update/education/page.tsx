"use client";

import { useMemo, useState } from "react";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/ui/dropdown";
import { useParams } from "next/navigation";

const universities: string[] = [
  "Abasyn University",
  "Abbottabad University of Science and Technology",
  "Abdul Wali Khan University Mardan",
  "Aga Khan University",
  "Air University",
  "Al-Ghazali University",
  "Al-Hamd Islamic University",
  "Ali Institute of Education",
  "Al-Karam International Institute",
  "Al-Kawthar University",
  "Al-Khair University",
  "Aror University of Art, Architecture, Design and Heritage",
  "Baba Guru Nanak University",
  "Bacha Khan University",
  "Bahauddin Zakariya University",
  "Bahria University",
  "Balochistan University of Engineering and Technology",
  "Balochistan University of Information Technology, Engineering and Management Sciences",
  "Baqai Medical University",
  "Beaconhouse National University",
  "Begum Nustrat Bhutto Women University",
  "Benazir Bhutto Shaheed University Lyari",
  "Benazir Bhutto Shaheed University of Technology and Skill Development",
  "Bolan University of Medical and Health Sciences",
  "Capital University of Science and Technology",
  "CECOS University",
  "Cholistan University of Veterinary and Animal Sciences",
  "City University of Science and Information Technology",
  "Commecs Institute of Business and Emerging Sciences",
  "COMSATS University Islamabad",
  "Dadabhoy Institute of Higher Education",
  "Dar-ul-Madina International University",
  "Dawood University of Engineering and Technology",
  "DHA Suffa University",
  "DOW University of Health Sciences",
  "Emaan Institute of Management and Sciences",
  "Emerson University, Multan",
  "Faisalabad Medical University",
  "FATA University",
  "Fatima Jinnah Medical University",
  "Fatima Jinnah Women University",
  "Federal Urdu University of Arts, Sciences and Technology",
  "Forman Christian College",
  "Foundation University Islamabad",
  "Gambat Institute of Medical Sciences",
  "Gandhara University",
  "Ghazi National Institute of Engineering and Sciences",
  "Ghazi University",
  "Ghulam Ishaq Khan Institute of Engineering Sciences and Technology",
  "GIFT University",
  "Gomal University",
  "Government College University, Faisalabad",
  "Government College University, Hyderabad",
  "Government College University, Lahore",
  "Government College Women University, Faisalabad",
  "Government College Women University, Sialkot",
  "Greenwich University",
  "Habib University",
  "Hajvery University",
  "Hamdard University",
  "Hands-Institute of Development Studies",
  "Hazara University",
  "HITEC University",
  "Ibadat International University",
  "Ibn-e-Sina University",
  "ILMA University",
  "Imperial College of Business Studies",
  "Indus University, Pakistan",
  "Indus Valley School of Art and Architecture",
  "Information Technology University",
  "Institute for Art and Culture",
  "Institute of Business Administration",
  "Institute of Business Management",
  "Institute of Management Sciences",
  "Institute of Southern Punjab",
  "Institute of Space Technology",
  "International Institute of Science, Arts and Technology",
  "International Islamic University, Islamabad",
  "Iqra National University",
  "Iqra University",
  "Islamia College Peshawar",
  "Isra University",
  "Jinnah Sindh Medical University",
  "Jinnah University for Women",
  "Karachi Institute of Economics and Technology",
  "Karachi Institute of Technology and Entrepreneurship",
  "Karachi School for Business and Leadership",
  "Karakurum International University",
  "KASB Institute of Technology",
  "Khushal Khan Khattak University",
  "Khwaja Fareed University of Engineering & Information Technology",
  "Khyber Medical University",
  "King Edward Medical University",
  "Kinnaird College for Women",
  "Kohat University of Science and Technology",
  "Kohsar University Murree",
  "Lahore College for Women University",
  "Lahore Garrison University",
  "Lahore Institute of Science and Technology",
  "Lahore Leads University",
  "Lahore School of Economics",
  "Lahore University of Biological and Applied Sciences",
  "Lahore University of Management Sciences",
  "Lasbela University of Agriculture, Water and Marine Sciences",
  "Liaquat University of Medical and Health Sciences",
  "Malir University of Science and Technology",
  "Mehran University of Engineering and Technology",
  "Metropolitan University Karachi",
  "Millennium Institute of Technology and Entrepreneurship",
  "Minhaj University",
  "Mirpur University of Science and Technology",
  "Mohammad Ali Jinnah University",
  "Mohi-ud-Din Islamic University",
  "Muhammad Nawaz Shareef University of Agriculture",
  "Muhammad Nawaz Sharif University of Engineering and Technology",
  "Multan University of Science and Technology",
  "Muslim Youth University",
  "Namal University",
  "National College of Arts",
  "National College of Business Administration and Economics",
  "National Defence University",
  "National Skills University",
  "National Textile University",
  "National University of Computer and Emerging Sciences",
  "National University of Medical Sciences",
  "National University of Modern Languages",
  "National University of Pakistan",
  "National University of Sciences and Technology",
  "National University of Technology",
  "Nazeer Hussain University",
  "NED University of Engineering and Technology",
  "Newports Institute of Communications and Economics",
  "NFC Institute of Engineering and Technology",
  "Nishtar Medical University",
  "Northern University",
  "Nur International University",
  "Pak-Austria Fachhochschule Institute of Applied Sciences and Technology",
  "Pakistan Global Institute",
  "Pakistan Institute of Development Economics",
  "Pakistan Institute of Engineering and Applied Sciences",
  "Pakistan Institute of Fashion and Design",
  "Peoples University of Medical and Health Sciences for Women",
  "Pir Mehr Ali Shah Arid Agriculture University",
  "Preston University",
  "Punjab Tianjin University of Technology",
  "Punjab University of Technology",
  "Qarshi University",
  "Quaid-e-Awam University of Engineering, Science and Technology",
  "Quaid-i-Azam University",
  "Qurtuba University of Science and Information Technology",
  "Rashid Latif Khan University",
  "Rawalpindi Medical University",
  "Rawalpindi Women University",
  "Riphah International University",
  "Saifee Burhani University",
  "Salim Habib University",
  "Sardar Bahadur Khan Women's University",
  "Sarhad University of Science and Information Technology",
  "Shah Abdul Latif University",
  "Shaheed Allah Buksh Soomro University of Arts, Design and Heritages",
  "Shaheed Benazir Bhutto City University",
  "Shaheed Benazir Bhutto Dewan University",
  "Shaheed Benazir Bhutto University",
  "Shaheed Benazir Bhutto University of Veterinary and Animal Sciences",
  "Shaheed Benazir Bhutto University Shaheed Benazirabad",
  "Shaheed Benazir Bhutto Women University",
  "Shaheed Mohtarma Benazir Bhutto Medical University",
  "Shaheed Zulfiqar Ali Bhutto Institute of Science and Technology",
  "Shaheed Zulfiqar Ali Bhutto Medical University",
  "Shaheed Zulfiqar Ali Bhutto University of Law",
  "Shifa Tameer-e-Millat University",
  "Sindh Agriculture University",
  "Sindh Institute of Management and Technology",
  "Sindh Institute of Medical Sciences",
  "Sindh Madresatul Islam University",
  "Sir Syed CASE Institute of Technology",
  "Sir Syed University of Engineering and Technology",
  "Sohail University",
  "Sukkur Institute of Business Administration",
  "Superior University",
  "Textile Institute of Pakistan",
  "Thal University",
  "The Government Sadiq College Women University",
  "The Grand Asian University",
  "The Green International University",
  "The Institute of Management Sciences",
  "The Islamia University of Bahawalpur",
  "The University of Agriculture, D. I. Khan",
  "University of Karachi",
  "University of Punjab",
  "Ziauddin University",
];
const degreeTypes: string[] = [
  "High School Diploma",
  "Associate Degree (AA, AS, AAS)",
  "Bachelor of Arts (BA)",
  "Bachelor of Science (BS)",
  "Bachelor of Business Administration (BBA)",
  "Bachelor of Fine Arts (BFA)",
  "Bachelor of Engineering (BE, BEng)",
  "Bachelor of Technology (BTech)",
  "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
  "Master of Arts (MA)",
  "Master of Science (MS, MSc)",
  "Master of Business Administration (MBA)",
  "Master of Fine Arts (MFA)",
  "Master of Engineering (ME, MEng)",
  "Master of Technology (MTech)",
  "Doctor of Philosophy (PhD)",
  "Doctor of Medicine (MD)",
  "Juris Doctor (JD)",
  "Doctor of Education (EdD)",
  "Doctor of Business Administration (DBA)",
  "Doctor of Engineering (DEng, DScEng)",
  "Diploma",
  "Certificate",
  "Postgraduate Diploma (PGDip)",
  "Postgraduate Certificate (PGCert)",
  "Executive Master (EMBA, Exec. MSc)",
  "Fellowship",
  "Honorary Doctorate",
];
const subjects: string[] = [
  "Accounting",
  "Architecture",
  "Artificial Intelligence",
  "Biology",
  "Business Administration",
  "Chemistry",
  "Civil Engineering",
  "Computer Science",
  "Data Science",
  "Design",
  "Economics",
  "Education",
  "Electrical Engineering",
  "Environmental Science",
  "Finance",
  "Fine Arts",
  "Health Sciences",
  "History",
  "Information Technology",
  "Law",
  "Linguistics",
  "Management",
  "Marketing",
  "Mathematics",
  "Mechanical Engineering",
  "Medicine",
  "Pharmacy",
  "Physics",
  "Political Science",
  "Psychology",
  "Public Administration",
  "Robotics",
  "Social Work",
  "Software Engineering",
  "Statistics",
  "Sociology",
  "Supply Chain Management",
  "Telecommunications",
  "Zoology",
];
const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const EducationPage = () => {
  const years = useMemo(
    () =>
      Array.from({ length: 101 }, (_, i) =>
        (new Date().getFullYear() - 95 + i).toString()
      ),
    []
  );

  const { toast } = useToast();
  const router = useRouter();

  const [education, setEducation] = useState({
    institute: "",
    degree_type: "",
    subject: "",
    start_month: "",
    start_year: "",
    end_month: "",
    end_year: "",
  });

  const isFormComplete = Object.values(education).every(
    (value) => value.trim() !== ""
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormComplete) {
      toast({
        description: "Please fill all fields before continuing.",
      });
      return;
    }

    const savedUserDetail = localStorage.getItem("userDetail");
    let existingData = savedUserDetail ? JSON.parse(savedUserDetail) : {};
    localStorage.setItem(
      "userDetail",
      JSON.stringify({ ...existingData, education })
    );

    router.push(`/update/work`);
  };

  const handleSkip = () => {
    const storedUserDetail = localStorage.getItem("userDetail");

    if (storedUserDetail) {
      const removeUserDetail = JSON.parse(storedUserDetail);
      removeUserDetail.education = [];
      localStorage.setItem("userDetail", JSON.stringify(removeUserDetail));
      router.push(`/update/work`);
    }
  };

  return (
    <>
      <div className="bg-[#F4F2F0] h-[92vh] flex flex-col items-center pt-[1rem]">
        <h1 className="text-4xl mb-8 text-black font-sans font-thin">
          Your profile helps you discover new people and opportunities
        </h1>
        <div className="w-[80%] md:w-[40%]  p-6">
          <form onSubmit={handleSubmit}>
            <div>
              <Dropdown
                options={universities}
                label={"School or College/University"}
                local={education.institute}
                onSelect={(selected) =>
                  setEducation({ ...education, institute: selected })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-8 mt-5">
              <div>
                <Dropdown
                  options={degreeTypes}
                  label={"Degree Level"}
                  local={education.degree_type}
                  onSelect={(selected) =>
                    setEducation({ ...education, degree_type: selected })
                  }
                />
              </div>
              <div>
                <Dropdown
                  options={subjects}
                  label={"Subject"}
                  local={education.subject}
                  onSelect={(selected) =>
                    setEducation({ ...education, subject: selected })
                  }
                />
              </div>
              <div>
                <Dropdown
                  options={months}
                  label={"Starting Month"}
                  local={education.start_month}
                  onSelect={(selected) =>
                    setEducation({ ...education, start_month: selected })
                  }
                />
              </div>
              <div>
                <Dropdown
                  options={years}
                  label={"Starting Year"}
                  local={education.start_year}
                  onSelect={(selected) =>
                    setEducation({ ...education, start_year: selected })
                  }
                />
              </div>
              <div>
                <Dropdown
                  options={months}
                  label={"Ending Month"}
                  local={education.end_month}
                  onSelect={(selected) =>
                    setEducation({ ...education, end_month: selected })
                  }
                />
              </div>
              <div>
                <Dropdown
                  options={years}
                  label={"Ending Year"}
                  local={education.end_year}
                  onSelect={(selected) =>
                    setEducation({ ...education, end_year: selected })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <button
                type="button"
                className="w-[5rem] font-bold mt-[2rem] py-2 rounded-md hover:bg-gray-300 transition"
                onClick={handleSkip}
              >
                Skip
              </button>
              <button
                type="submit"
                className="w-full text-lg font-bold mt-2 bg-primaryGreen text-white py-3 rounded-full hover:bg-primaryDark transition"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EducationPage;
