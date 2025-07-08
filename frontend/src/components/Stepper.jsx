const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-3xl mx-auto mb-6">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div
            key={index}
            className="flex-1 flex flex-col items-center relative"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white
                ${
                  isCompleted
                    ? "bg-green-500"
                    : isActive
                    ? "bg-blue-600"
                    : "bg-gray-400"
                }`}
            >
              {isCompleted ? "✓" : index + 1}
            </div>
            <span className="text-sm mt-2 text-center">{step}</span>

            {index !== steps.length - 1 && (
              <div
                className={`absolute top-4 left-full w-full h-0.5
                  ${isCompleted ? "bg-green-500" : "bg-gray-300"}`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
