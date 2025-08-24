import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { X } from "lucide-react";

const Dialog = forwardRef(
  (
    { children, header, onOpen = null, onClose = null, persistent = false },
    ref
  ) => {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleDialogClick = (e) => {
      e.stopPropagation();
    };

    const open = () => {
      setDialogOpen(true);
      if (onOpen) onOpen();
    };

    const close = () => {
      setDialogOpen(false);
      if (onClose) onClose();
    };

    useImperativeHandle(ref, () => ({
      open,
      close,
    }));

    useEffect(() => {
      const closeDialogWithEsc = (event) => {
        if (event.code === "Escape") {
          close();
        }
      };

      document.addEventListener("keypress", closeDialogWithEsc);

      return () => {
        document.removeEventListener("keypress", closeDialogWithEsc);
      };
    }, []);

    return (
      <div
        onClick={persistent ? null : close}
        className={`h-full fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity z-50 ${
          isDialogOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={handleDialogClick}
          className={`max-w-[400px] md:max-w-[500px] w-full bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg transform transition-transform ${
            isDialogOpen ? "animate-fadeInScale" : "animate-fadeOutScale"
          }`}
        >
          {header && (
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold dark:text-white">{header}</h2>
              <button
                onClick={close}
                className="hover:bg-neutral-200 dark:hover:bg-neutral-700 size-8 rounded-lg flex justify-center items-center 
            transition-all duration-200 active:scale-90 will-change-transform cursor-pointer"
              >
                <X className="text-neutral-700 dark:text-neutral-200" />
              </button>
            </div>
          )}

          {/* Children */}
          {children}
        </div>
      </div>
    );
  }
);

export default Dialog;
