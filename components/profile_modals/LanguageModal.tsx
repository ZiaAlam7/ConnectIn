// components/LanguageModal.tsx
"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useState } from "react";
import axios from "axios";

interface LanguageModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  name?: string;
  level?: string;
  targetId?: string;
  edit?: boolean;
}

const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen = false,
  onClose = () => {},
  name = "",
  level = "",
  targetId = "",
  edit = false,
}) => {
  const [language, setLanguage] = useState(name);
  const [proficiency, setProficiency] = useState(level);


  const onAdd = async (shouldRemove = false) => {
   

    const values = {
      name: language.charAt(0).toUpperCase() + language.slice(1),
      proficiency: proficiency,
    };
    const target = "language";

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
        console.log("Language save:", response.data);
      } catch (error: any) {
        console.error(
          "Error while saving language:",
          error.response?.data || error.message
        );
      }
    }

    if (edit) {
      try {
        const response = await axios.post(
          "/api/profile-edit",
          { target, values, targetId, remove:shouldRemove},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Language save:", response.data);
      } catch (error: any) {
        console.error(
          "Error while saving language:",
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
    setLanguage(name);
  }, [name]);

  useEffect(() => {
    setProficiency(level);
  }, [level]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-xl max-w-xl w-full p-6 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            {edit ? "Edit Langauge" : "Add Language"}
          </h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600 hover:text-black" />
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Language <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--mainGreen)]"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Proficiency
            </label>
            <select
              className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--mainGreen)]"
              value={proficiency}
              onChange={(e) => setProficiency(e.target.value)}
            >
              <option value="">Please select</option>
              <option value="Elementary">Elementary</option>
              <option value="Limited Working">Limited Working</option>
              <option value="Professional Working">Professional Working</option>
              <option value="Full Professional">Full Professional</option>
              <option value="Native or Bilingual">Native or Bilingual</option>
            </select>
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

export default LanguageModal;
