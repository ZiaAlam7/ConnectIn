"use client";

import { useState, useRef, useEffect } from "react";

interface DropdownProps {
  options: string[];
  label: string;
  local: string;
  onSelect: (selected: string) => void;
}

export default function Dropdown({ options, label, onSelect, local }: DropdownProps) {
  const [selected, setSelected] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown

  // Filter options based on search input
  const filteredOptions = options.filter((option: string) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label>{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 text-nowrap bg-white border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primaryGreen"
      >
        {selected ? selected : local || `Select ${label}`}
      </button>
      {isOpen && (
        <div className="absolute left-0 w-full mt-2 bg-white border rounded-lg shadow-md max-h-48 overflow-y-auto z-[100]">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border-b outline-none"
          />
          <ul>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option}
                  onClick={() => {
                    setSelected(option);
                    setIsOpen(false);
                    setSearchTerm("");
                    onSelect(option);
                  }}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
