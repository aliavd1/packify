import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

const Select = ({ options, value, onChange, multi = false }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = (option) => {
    if (multi) {
      let newValue = Array.isArray(value) ? [...value] : [];
      if (newValue.includes(option)) {
        newValue = newValue.filter((v) => v !== option);
      } else {
        newValue.push(option);
      }
      onChange(newValue);
    } else {
      onChange(option);
      setOpen(false);
    }
  };

  const handleRemove = (option) => {
    if (multi) {
      onChange(value.filter((v) => v !== option));
    }
  };

  const renderValue = () => {
    if (multi) {
      return (
        <div className="flex flex-wrap gap-2">
          {Array.isArray(value) && value.length > 0 ? (
            value.map((v) => (
              <span
                key={v}
                className="flex items-center gap-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 px-2 py-1 rounded-md text-sm"
              >
                {v}
                <X
                  size={14}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(v);
                  }}
                />
              </span>
            ))
          ) : (
            <span className="text-gray-500">Select architecture</span>
          )}
        </div>
      );
    }
    return value || "Select architecture";
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex justify-between items-center cursor-pointer border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
      >
        {renderValue()}
        <ChevronDown
          className={`w-5 h-5 ml-2 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute mt-2 w-full rounded-lg bg-white dark:bg-gray-700 shadow-lg z-10 origin-top transform opacity-0 animate-dropdown">
          {options.map((option) => {
            const isSelected = multi
              ? Array.isArray(value) && value.includes(option)
              : value === option;
            return (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                className={`cursor-pointer px-4 py-2 m-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 ${
                  isSelected
                    ? "bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                    : "text-gray-700 dark:text-gray-100"
                }`}
              >
                {option}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
