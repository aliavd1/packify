import { useState, useRef } from "react";
import { UploadCloud } from "lucide-react";

const ChooseFile = ({ onChange, multi = false }) => {
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const processFiles = (files) => {
    const fileArray = Array.from(files);
    const selectedFiles = multi ? fileArray : [fileArray[0]];

    setDroppedFiles(selectedFiles);

    const paths = selectedFiles.map((file) => file.path);

    if (multi) {
      onChange(paths);
    } else {
      onChange(paths[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (e) => {
    processFiles(e.target.files);
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        multiple={multi}
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
      />

      <div
        onClick={openFilePicker}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-[300px] flex flex-col items-center justify-center border-2 border-dashed 
            rounded-2xl p-8 cursor-pointer transition-all duration-300
          ${
            isDragging
              ? "border-blue-900 bg-blue-100 dark:bg-blue-900/20"
              : "border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
          }
        `}
      >
        <UploadCloud className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-2" />
        <p className="text-center text-gray-600 dark:text-gray-300">
          Drag & drop your files here or click to select
        </p>

        {droppedFiles.length > 0 && (
          <ul className="mt-4 w-full max-w-md text-center text-sm text-gray-700 dark:text-gray-300 space-y-1">
            {droppedFiles.map((file, idx) => (
              <li key={idx} className="truncate">
                {file.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ChooseFile;
