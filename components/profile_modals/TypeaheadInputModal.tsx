'use client';

import { useState, useEffect, useRef } from 'react';

interface TypeaheadInputProps {
  label: string;
  placeholder?: string;
  options: string[];
  onSelect?: (value: string) => void;
  required?: boolean;
}

const TypeaheadInput: React.FC<TypeaheadInputProps> = ({
  label,
  placeholder,
  options,
  onSelect,
  required,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [lastArrowKeyPressTime, setLastArrowKeyPressTime] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listItemRefs = useRef<(HTMLLIElement | null)[]>([]); // refs for each list item

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.trim() === '') {
      setFilteredOptions([]);
      setShowDropdown(false);
      setHighlightedIndex(-1);
    } else {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
      setShowDropdown(true);
      setHighlightedIndex(0);
    }
  };

  const handleSelect = (value: string) => {
    setInputValue(value);
    setShowDropdown(false);
    setHighlightedIndex(-1);
    if (onSelect) onSelect(value);
  };

  const ARROW_KEY_DELAY = 100; // ms

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || filteredOptions.length === 0) return;

    const now = Date.now();
    if (now - lastArrowKeyPressTime < ARROW_KEY_DELAY && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      return;
    }
    setLastArrowKeyPressTime(now);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % filteredOptions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll to highlighted item when it changes
  useEffect(() => {
    if (
      highlightedIndex >= 0 &&
      highlightedIndex < listItemRefs.current.length &&
      listItemRefs.current[highlightedIndex]
    ) {
      listItemRefs.current[highlightedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [highlightedIndex]);

  return (
    <div className="w-full mx-auto mt-4 relative" ref={inputRef}>
      <label htmlFor="typeahead-input" className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        id="typeahead-input"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[var(--mainGreen)] focus:border-[var(--mainGreen)] text-gray-700"
        placeholder={placeholder || 'Start typing...'}
        autoComplete="off"
        required={required}
      />

      {showDropdown && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-auto">
          {filteredOptions.map((option, index) => (
            <li
              key={option}
              ref={(el) => {
                listItemRefs.current[index] = el;
              }}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 cursor-pointer ${
                index === highlightedIndex ? 'bg-blue-100' : 'hover:bg-blue-50'
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TypeaheadInput;
