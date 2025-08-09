import { useEffect, useState } from "react";
import { UploadCloud } from "lucide-react";
import {
  OpenMultiFile,
  OpenSingleFile,
  FileDrop,
  FileDropOff,
} from "../../wailsjs/go/core/FilePicker";
import { EventsOn } from "../../../../exam-result/frontend/wailsjs/runtime/runtime";

const ChooseFile = ({
  title,
  displayName,
  pattern,
  onChange,
  multi = false,
}) => {
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const processFiles = (filesPath) => {
    const fileArray = Array.from(filesPath);
    setDroppedFiles(fileArray);

    if (multi) {
      onChange(fileArray);
    } else {
      onChange(fileArray[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const openFilePicker = async () => {
    let filesPath = [];

    if (multi) {
      filesPath = await OpenMultiFile(title, displayName, pattern);
    } else {
      filesPath = [await OpenSingleFile(title, displayName, pattern)];
    }
    processFiles(filesPath);
  };

  useEffect(() => {
    FileDrop();

    const eventOff = EventsOn("fileDropEvent", (paths) => {
      processFiles(paths);
    });
    return () => {
      eventOff();
      FileDropOff();
    };
  }, []);

  return (
    <div
      onClick={openFilePicker}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`h-[300px] my-5 flex flex-col items-center justify-center border-2 border-dashed 
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
          {droppedFiles.map((filePath, idx) => (
            <li key={idx} className="truncate">
              {filePath}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChooseFile;
