'use client';

import React from 'react';

type DropdownProps = {
  label?: string;
  options: string[];
  selected: string;
  placeholder: string;
  onChange: (value: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ label, options, selected, onChange,placeholder }) => {
  return (
    <div className="w-full max-w-xs">
      {label && <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>}
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full  mt-1 text-sm  bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-[var(--mainGreen)] focus:border-[var(--mainGreen)] rounded-md p-2"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
