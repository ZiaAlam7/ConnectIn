"use client";

import { useEffect, useMemo, useState } from "react";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/ui/dropdown";
import { useParams } from "next/navigation";
import axios from "axios";

const employmentType: string[] = [
  "Full-time",
  "Part-time",
  "Self-employed",
  "Freelance",
  "Contract",
  "Internship",
  "Apprenticeship",
  "Seasonal",
];

const companies: string[] = [
  "Apple",
  "Microsoft",
  "Amazon",
  "Google (Alphabet)",
  "Meta (Facebook)",
  "Tesla",
  "Samsung",
  "IBM",
  "Intel",
  "Nvidia",
  "Adobe",
  "Oracle",
  "Netflix",
  "Uber",
  "Airbnb",
  "Coca-Cola",
  "PepsiCo",
  "Nike",
  "Adidas",
  "McDonald's",
  "Starbucks",
  "Toyota",
  "Volkswagen",
  "Mercedes-Benz",
  "BMW",
  "Ford",
  "General Motors",
  "ExxonMobil",
  "Shell",
  "BP",
  "Johnson & Johnson",
  "Pfizer",
  "Moderna",
  "Goldman Sachs",
  "JPMorgan Chase",
  "Bank of America",
  "Walmart",
  "Costco",
  "Alibaba",
  "Tencent",
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

const Work = () => {
  const years = useMemo(
    () =>
      Array.from({ length: 101 }, (_, i) =>
        (new Date().getFullYear() - 95 + i).toString()
      ),
    []
  );

  const { toast } = useToast();
  const router = useRouter();

  const [work, setWork] = useState({
    job_title: "",
    company_name: "",
    employment_type: "",
    start_month: "",
    start_year: "",
    end_year: "",
    end_month: "",
  });
  const [skip, setSkip] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const isFormComplete = Object.values(work).every(
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
      JSON.stringify({ ...existingData, work })
    );

    const allData = localStorage.getItem("userDetail");
    let parsedData = allData ? JSON.parse(allData) : {};
    console.log("this is the data");
    console.log(parsedData);

    try {
      const response = await axios.post("/api/update", parsedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("User details saved successfully:", response.data);
      router.push(`/profile`);
    } catch (error: any) {
      console.error(
        "Error saving user details:",
        error.response?.data || error.message
      );
    }
  };

  const handleSkip = async () => {
    const storedUserDetail = localStorage.getItem("userDetail");

    if (storedUserDetail) {
      const removeUserDetail = JSON.parse(storedUserDetail);
      removeUserDetail.work = [];
      localStorage.setItem("userDetail", JSON.stringify(removeUserDetail));

      const parsedData = removeUserDetail;

      try {
        const response = await axios.post("/api/update", parsedData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("User Skipped:", response.data);
        router.push(`/profile`);
      } catch (error: any) {
        console.error(
          "Error while skipping:",
          error.response?.data || error.message
        );
      }
    }
    else{
      router.push(`/profile`);
    }
  };

  const handleCheck = () => {
    setIsChecked((prev) => !prev);
  };

  useEffect(() => {
    setWork((prev) => ({
      ...prev,
      end_month: isChecked ? "working" : "",
      end_year: isChecked ? "working" : "",
    }));
  }, [isChecked]);

  return (
    <>
      <div className="bg-[#F4F2F0] h-[92vh] max-h-auto flex flex-col items-center pt-[1rem] pb-16">
        <h1 className="sm:text-4xl text-2xl mb-7 text-black font-sans font-thin text-center">
          Add a recent company you worked at
        </h1>
        <div className="w-[80%] md:w-[40%]  p-6">
          <form onSubmit={handleSubmit}>
            <div className="flex  flex-col gap-5">
              <div>
                <label>Most Recent Job Title</label>
                <input
                  type="text"
                  name="first_name"
                  value={work.job_title}
                  onChange={(e) =>
                    setWork({ ...work, job_title: e.target.value })
                  }
                  className="w-full p-2 border text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryGreen"
                  required
                />
              </div>
              <div>
                <Dropdown
                  options={employmentType}
                  label={"Employment Type"}
                  local={work.employment_type}
                  onSelect={(selected) =>
                    setWork({ ...work, employment_type: selected })
                  }
                />
              </div>
              <div>
                <Dropdown
                  options={companies}
                  label={"Most Recent Company"}
                  local={work.company_name}
                  onSelect={(selected) =>
                    setWork({ ...work, company_name: selected })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-8 mt-5">
                <div>
                  <Dropdown
                    options={months}
                    label={"Starting Month"}
                    local={work.start_month}
                    onSelect={(selected) =>
                      setWork({ ...work, start_month: selected })
                    }
                  />
                </div>
                <div>
                  <Dropdown
                    options={years}
                    label={"Starting Year"}
                    local={work.start_year}
                    onSelect={(selected) =>
                      setWork({ ...work, start_year: selected })
                    }
                  />
                </div>
              </div>
              <div className="flex items-center space-x-3 my-4">
                <input
                  id="checkbox"
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheck}
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="checkbox"
                  className="text-sm font-medium text-gray-700"
                >
                  I currently work here
                </label>
              </div>
              {!isChecked && (
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <Dropdown
                      options={months}
                      label={"Ending Month"}
                      local=""
                      onSelect={(selected) =>
                        setWork({ ...work, end_month: selected })
                      }
                    />
                  </div>
                  <div>
                    <Dropdown
                      options={years}
                      label={"Ending Year"}
                      local=""
                      onSelect={(selected) =>
                        setWork({ ...work, end_year: selected })
                      }
                    />
                  </div>
                </div>
              )}
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

export default Work;
