import { z } from "zod";

const MaintainerInfoForm = ({
  form,
  onChange,
  validationSchema,
  errors,
  setErrors,
}) => {
  const validateField = (fieldName, value) => {
    const result = validationSchema.shape[fieldName].safeParse(value);
    if (!result.success) {
      const formattedErrors = z.treeifyError(result.error);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: formattedErrors.errors[0],
      }));
    } else {
      setErrors((prev) => {
        const newErr = { ...prev };
        delete newErr[fieldName];
        return newErr;
      });
    }
  };

  return (
    <form className="space-y-6 mt-5 p-6 transition">
      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Maintainer first name
          <span aria-hidden="true" className="text-red-500 ms-1">
            *
          </span>
        </label>
        <input
          type="text"
          value={form.maintainerFirstName}
          onChange={(e) => {
            onChange("maintainerFirstName", e.target.value);
            validateField("maintainerFirstName", e.target.value);
          }}
          className={`w-full border ${
            errors.maintainerFirstName
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-700"
          } rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 
          dark:text-gray-100 focus:outline-none transition`}
        />
      </div>
      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Maintainer last name
          <span aria-hidden="true" className="text-red-500 ms-1">
            *
          </span>
        </label>
        <input
          type="text"
          value={form.maintainerLastName}
          onChange={(e) => {
            onChange("maintainerLastName", e.target.value);
            validateField("maintainerLastName", e.target.value);
          }}
          className={`w-full border ${
            errors.maintainerLastName
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-700"
          } rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 
          dark:text-gray-100 focus:outline-none transition`}
        />
      </div>
      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Maintainer email
          <span aria-hidden="true" className="text-red-500 ms-1">
            *
          </span>
        </label>
        <input
          type="text"
          value={form.maintainerEmail}
          onChange={(e) => {
            onChange("maintainerEmail", e.target.value);
            validateField("maintainerEmail", e.target.value);
          }}
          className={`w-full border ${
            errors.maintainerEmail
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-700"
          } rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 
          dark:text-gray-100 focus:outline-none transition`}
        />
      </div>
    </form>
  );
};

export default MaintainerInfoForm;
