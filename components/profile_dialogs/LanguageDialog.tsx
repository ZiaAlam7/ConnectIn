// components/LanguageModal.tsx
"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useState } from "react";

interface LanguageModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen = false,
  onClose = () => {},
}) => {
  const [language, setLanguage] = useState("");
  const [proficiency, setProficiency] = useState("");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

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
          <h2 className="text-2xl font-semibold">Add language</h2>
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
              className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
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

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LanguageModal;
