import { useState } from "react";
import Stepper from "../components/Stepper";

const Home = () => {
  const steps = ["شروع", "اطلاعات", "تأیید", "پایان"];
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div>
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
