"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";
import TypeaheadInput from "./TypeaheadInputModal";
import Dropdown from "./DropdownModal";
import { education } from "@/constants/educationConstants";
import { dateConstants } from "@/constants/dateConstants";

type EducationModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  school?: string;
  degree?: string;
  field?: string;
  s_year?: string;
  s_month?: string;
  e_year?: string;
  e_month?: string;
  desc?: string;
  targetId?: string;
  edit?: boolean;
};

const EducationModal: React.FC<EducationModalProps> = ({
  isOpen = false,
  onClose = () => {},
  school = "",
  degree = "",
  field = "",
  s_year = "",
  s_month = "",
  e_year = "",
  e_month = "",
  desc = "",
  targetId = "",
  edit = false,
}) => {
  const [institute, setInstitute] = useState('');
  const [degree_type, setDegree_type] = useState(degree);
  const [subject, setSubject] = useState(field);
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
    setInstitute(school);
    setDegree_type(degree);
    setSubject(field);
    setStart_year(s_year);
    setStart_month(s_month);
    setEnd_year(e_year);
    setEnd_month(e_month);
    setDescription(desc);
  }, [school, degree, field, s_year, s_month, e_year, e_month, desc]);

  
 
  
  const onAdd = async (shouldRemove = false) => {
    const values = {
      institute: institute,
      degree_type: degree_type,
      subject: subject,
      start_year: start_year,
      start_month: start_month,
      end_year: end_year,
      end_month: end_month,
      description: description,
    };
    const target = "education";

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add education</h2>
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
              label={"School*"}
              placeholder={"Ex: Boston University"}
              options={education.institutes}
              required={true}
              onSelect={(value) => setInstitute(value)}
              values={institute}
            />
          </div>

          <div>
            <TypeaheadInput
              label={"Degree"}
              placeholder={"Ex: Bachelor's"}
              options={education.degreeTypes}
              onSelect={(value) => setDegree_type(value)}
              values={degree_type}
            />
          </div>

          <div>
            <TypeaheadInput
              label={"Field of study"}
              placeholder={"Ex: Computer Science"}
              options={education.subjects}
              onSelect={(value) => setSubject(value)}
              values={subject}
            />
          </div>
          <div></div>
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

            <div className="flex-1">
              <label className="block text-sm font-medium">
                End date (or expected)
              </label>
              <div className="flex gap-2">
                <Dropdown
                  options={dateConstants.months}
                  selected={end_month}
                  onChange={(value) => setEnd_month(value)}
                  placeholder="Month"
                />
                <Dropdown
                  options={dateConstants.years}
                  selected={end_year}
                  onChange={(value) => setEnd_year(value)}
                  placeholder="Year"
                />
              </div>
            </div>
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
}


export default EducationModal;
