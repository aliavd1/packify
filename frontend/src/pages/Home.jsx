import { useEffect, useState } from "react";
import Stepper from "../components/Stepper";
import ToggleButton from "../components/ToggleButton";

const Home = () => {
  const steps = ["شروع", "اطلاعات", "تأیید", "پایان"];
  const [currentStep, setCurrentStep] = useState(0);
  const [isDark, setIsDark] = useState(() => {
    return JSON.parse(localStorage.getItem("isDark") || false);
  });

  useEffect(() => {
    localStorage.setItem("isDark", isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="page p-6">
      <ToggleButton
        open={isDark}
        btnClasses={`relative w-14 h-14 bg-neutral-100 rounded-full shadow-lg 
                  hover:bg-neutral-200 transition-all duration-200 flex justify-center items-center 
                  dark:bg-neutral-700 dark:hover:bg-neutral-600 cursor-pointer
                ${
                  open
                    ? "opacity-100 transform translate-y-0 active:scale-90 will-change-transform visible"
                    : "opacity-0 transform translate-y-4 invisible"
                }`}
        firstIcon="fa-sun-bright"
        firstIconColor="black"
        secondIcon="fa-moon"
        secondIconColor="white"
        duration={300}
        onClick={() => setIsDark((value) => !value)}
      />

      <Stepper steps={steps} currentStep={currentStep} />

      <div className="mt-8">
        <p>مرحله فعلی: {steps[currentStep]}</p>

        <div className="mt-4 space-x-2">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            قبلی
          </button>
          <button
            onClick={() =>
              setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            بعدی
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
