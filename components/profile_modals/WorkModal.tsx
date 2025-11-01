"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";
import TypeaheadInput from "./TypeaheadInputModal";
import Dropdown from "./DropdownModal";
import { countries } from "@/constants/countriesConstants";
import { dateConstants } from "@/constants/dateConstants";

type WorkModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  company?: string;
  work_type?: string;
  work_city?: string;
  work_country?: string;
  s_year?: string;
  s_month?: string;
  e_year?: string;
  e_month?: string;
  desc?: string;
  targetId?: string;
  edit?: boolean;
};

const WorkModal: React.FC<WorkModalProps> = ({
  isOpen = false,
  onClose = () => {},
  title = "",
  company = "",
  work_type = "",
  work_city = "",
  work_country = "",
  s_year = "",
  s_month = "",
  e_year = "",
  e_month = "",
  desc = "",
  targetId = "",
  edit = false,
}) => {
  const [job_title, setJob_title] = useState(title);
  const [company_name, setCompany_name] = useState(company);
  const [employment_type, setEmployment_type] = useState(work_type);
  const [city, setCity] = useState(work_city);
  const [country, setCountry] = useState(work_country);
  const [start_year, setStart_year] = useState(s_year);
  const [start_month, setStart_month] = useState(s_month);
  const [end_year, setEnd_year] = useState(e_year);
  const [end_month, setEnd_month] = useState(e_month);
  const [description, setDescription] = useState(desc);



  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
  console.log("company_name passed to TypeaheadInput:", title);

    setJob_title(title);
    setCompany_name(company);
    setEmployment_type(work_type);
    setCity(work_city);
    setCountry(work_country);
    setStart_year(s_year);
    setStart_month(s_month);
    setEnd_year(e_year);
    setEnd_month(e_month);
    setDescription(desc);
  }, [
    title,
    company,
    company,
    work_city,
    work_country,
    s_year,
    s_month,
    e_year,
    e_month,
    desc,
  ]);

  const [isChecked, setIsChecked] = useState<boolean>(true);

 ;

  const handleCheck = () => {
    setIsChecked((prev) => !prev);
  };

  useEffect(() => {
   setEnd_month(isChecked ? "working" : "")
   setEnd_year(isChecked ? "working" : "")
  }, [isChecked]);

  const onAdd = async (shouldRemove = false) => {
    const values = {
      job_title: job_title,
      company_name: company_name,
      employment_type: employment_type,
      city: city,
      country: country,
      start_year: start_year,
      start_month: start_month,
      end_year: end_year,
      end_month: end_month,
      description: description,
    };
    const target = "work";

    if (!edit) {
      try {
        const response = await axios.post(
          "/api/user-add",
          { target, values },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        onClose();
        console.log("Education Save:", response.data);
      } catch (error: any) {
        console.error(
          "Error while saving Education:",
          error.response?.data || error.message
        );
      }
    }

    if (edit) {
      try {
        const response = await axios.post(
          "/api/profile-edit",
          { target, values, targetId, remove: shouldRemove },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        onClose();
        console.log("Education save:", response.data);
      } catch (error: any) {
        console.error(
          "Error while saving Education:",
          error.response?.data || error.message
        );
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 "
      onClick={onClose}
    >
      <div
        className="sm:w-full  w-[90vw] max-w-xl rounded-lg bg-white p-6 shadow-lg max-h-[80vh]  overflow-hidden overflow-y-auto "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4  z-50  ">
          <h2 className="text-xl font-semibold">Add experience</h2>
          <button
            className="text-xl font-bold text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            <X className="w-6 h-6 text-gray-600 hover:text-black" />
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <TypeaheadInput
              label={"Title "}
              placeholder={"Ex: Retail Sale Manager"}
              options={[]}
              required={true}
              onSelect={(value) => setJob_title(value)}
              values={job_title}
            />
          </div>

          <div>
            <TypeaheadInput
              label={"Employment type"}
              placeholder={"Ex: Part Time"}
              options={[
                "Full-time",
                "Part-time",
                "Self-employed",
                "Freelance",
                "Contract",
                "Internship",
                "Apprenticeship",
                "Seasonal",
              ]}
              onSelect={(value) => setEmployment_type(value)}
              values={employment_type}
            />
          </div>

          <div>
            <TypeaheadInput
              label={"Company or organization "}
              placeholder={"Ex: Samsung"}
              options={[]}
              onSelect={(value) => setCompany_name(value)}
              values={company_name}
            />
          </div>
          <div>
            <div className="flex items-center space-x-3 my-8">
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
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">Start date</label>
              <div className="flex gap-2">
                <Dropdown
                  options={dateConstants.months}
                  selected={start_month}
                  onChange={(value) => setStart_month(value)}
                  placeholder="Month"
                />

                <Dropdown
                  options={dateConstants.years}
                  selected={start_year}
                  onChange={(value) => setStart_year(value)}
                  placeholder="Year"
                />
              </div>
            </div>
          </div>
          {!isChecked && (
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium">
                  End date (or expected)
                </label>
                <div className="flex gap-2">
                  <Dropdown
                    options={dateConstants.months}
                    selected={end_month}
                    onChange={(value) => setEnd_month(value) }
                    // onChange={(value) => value !== "" ? setEnd_month(value) : setEnd_month("working")}
                    placeholder="Month"
                  />
                  <Dropdown
                    options={dateConstants.years}
                    selected={end_year}
                    onChange={(value) => setEnd_year(value)}
                    // onChange={(value) => value !== "" ? setEnd_year(value) : setEnd_year("working")}
                    placeholder="Year"
                  />
                </div>
              </div>
            </div>
          )}
          <div>
            <TypeaheadInput
              label={"Country"}
              placeholder={"Ex: Pakistan"}
              options={countries}
              onSelect={(value) => setCountry(value)}
              values={country}
            />
          </div>
          <div>
            <TypeaheadInput
              label={"City"}
              placeholder={"Ex: Dera Ismail Khan"}
              options={[]}
              onSelect={(value) => setCity(value)}
              values={city}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="w-full border rounded-md p-2 resize-none focus:outline-none focus:ring-1 focus:ring-[var(--mainGreen)] focus:border-[var(--mainGreen)]"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-between">
            {edit && (
              <button
                type="submit"
                className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition "
                onClick={() => {
                  onAdd(true);
                }}
              >
                Delete
              </button>
            )}
            <button
              type="submit"
              className="bg-[var(--mainGreen)] text-white px-5 py-2 rounded-lg hover:bg-[var(--mainGreenDark)] transition"
              onClick={() => {
                onAdd(false);
              }}
            >
              {edit ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkModal;
