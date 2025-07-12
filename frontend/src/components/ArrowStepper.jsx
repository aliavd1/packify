import { useState } from "react";

const ArrowStepper = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="">
      <ul className="stepper">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`stepper__item 
              ${index === currentStep ? "current" : ""}
              ${index < currentStep ? "complete" : ""}`}
          >
            {step}
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <p className="text-lg font-semibold dark:text-white">
          Current step: {steps[currentStep]}
        </p>
        <div className="mt-4 space-x-2">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded cursor-pointer"
          >
            Prev
          </button>
          <button
            onClick={() =>
              setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArrowStepper;
