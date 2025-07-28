import { useState, useRef, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const Select = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const options = ["amd64", "arm64", "x86"];
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex justify-between items-center cursor-pointer border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
      >
        {value || "Select architecture"}
        <ChevronUp
          className={`w-5 h-5 ml-2 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute mt-2 w-full rounded-lg bg-white dark:bg-gray-700 shadow-lg z-10 origin-top transform opacity-0 animate-dropdown">
          {options.map((option, index) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`cursor-pointer px-4 py-2 m-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 ${
                value === option
                  ? "bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                  : "text-gray-700 dark:text-gray-100"
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
