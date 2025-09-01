import { useState } from "react";

const Stepper = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const goNext = () => {
    const currentStepOnChanged = steps[currentStep]?.onChanged;
    if (currentStepOnChanged && !currentStepOnChanged()) {
      return;
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCurrentStep(0);
    }
  };

  const goBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Stepper */}
      <div className="relative flex items-center justify-between my-10">
        {/* Line behind circles */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 -translate-y-1/2 z-0"></div>

        {/* Filled Progress Line */}
        <div
          className="absolute top-1/2 left-0 h-1 bg-blue-700 -translate-y-1/2 z-0 transition-all duration-500"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        ></div>

        {/* Circles */}
        <div className="flex w-full justify-between z-10">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  index === currentStep
                    ? "bg-blue-400 text-white"
                    : index < currentStep
                    ? "bg-blue-700 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Header */}
      <p className="!text-3xl font-semibold dark:text-white">
        {steps[currentStep]?.header}
      </p>

      {/* Step Content */}
      <div className="mb-3">{steps[currentStep]?.content}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={goBack}
          disabled={currentStep === 0}
          className={`px-4 py-2 rounded ${
            currentStep === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-700 text-white cursor-pointer will-change-transform duration-300active:scale-95"
          }`}
        >
          Back
        </button>
        <button
          onClick={goNext}
          className="px-4 py-2 rounded cursor-pointer will-change-transform duration-300 active:scale-95 bg-blue-700 text-white"
        >
          {currentStep < steps.length - 1 ? "Next" : "Create"}
        </button>
      </div>
    </div>
  );
};
export default Stepper;
