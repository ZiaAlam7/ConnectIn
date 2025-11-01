// components/LanguageModal.tsx
"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useState } from "react";
import axios from "axios";

interface SkillModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  name?: string;
  edit?: boolean;
  skillIndex?: number;
}

const SkillModal: React.FC<SkillModalProps> = ({
  isOpen = false,
  onClose = () => {},
  name = "",
  edit = false,
  skillIndex,
}) => {
  const [skill, setSkill] = useState(name);



  const onAdd = async (shouldRemove = false) => {
   

    const values = skill
    const target = "skill";

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
        console.log("Skill save:", response.data);
      } catch (error: any) {
        console.error(
          "Error while saving skill:",
          error.response?.data || error.message
        );
      }
    }

    if (edit) {
      try {
        const response = await axios.post(
          "/api/skill-edit",
          { target, values ,skillIndex , remove:shouldRemove},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Skill save:", response.data);
      } catch (error: any) {
        console.error(
          "Error while saving skill:",
          error.response?.data || error.message
        );
      }
    }
  };

  

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    setSkill(name);
  }, [name]);



  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-xl max-w-xl sm:w-full w-[90vw] p-6 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            {edit ? "Edit Skill" : "Add Skill"}
          </h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600 hover:text-black" />
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Skill <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--mainGreen)]"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              required
            />
          </div>


          <div className="flex justify-between pt-2">
            {edit && (
              <button
                type="submit"
                className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition"
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

export default SkillModal;
