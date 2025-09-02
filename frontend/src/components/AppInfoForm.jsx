import Select from "./Select";
import z from "zod";

const AppInfoForm = ({
  form,
  onChange,
  validationSchema,
  errors,
  setErrors,
}) => {
  const selectOptions = [
    {
      key: "x86-64 (64-bit)",
      value: "amd64",
    },
    {
      key: "x86-32 (32-bit)",
      value: "i386",
    },
    {
      key: "AArch64 (arm64)",
      value: "arm64",
    },
  ];

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
          File Name
          <span aria-hidden="true" className="text-red-500 ms-1">
            *
          </span>
        </label>
        <input
          type="text"
          value={form.fileName}
          onChange={(e) => {
            onChange("fileName", e.target.value);
            validateField("fileName", e.target.value);
          }}
          className={`w-full border ${
            errors.fileName
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-700"
          } rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 
          dark:text-gray-100 focus:outline-none transition`}
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Version
          <span aria-hidden="true" className="text-red-500 ms-1">
            *
          </span>
        </label>
        <input
          type="text"
          value={form.version}
          onChange={(e) => {
            onChange("version", e.target.value);
            validateField("version", e.target.value);
          }}
          className={`w-full border ${
            errors.version
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-700"
          } rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 
          dark:text-gray-100 focus:outline-none transition`}
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Architecture
          <span aria-hidden="true" className="text-red-500 ms-1">
            *
          </span>
        </label>
        <Select
          options={selectOptions}
          value={form.arch}
          onChange={(e) => {
            onChange("arch", e);
            validateField("arch", e);
          }}
          className={`w-full border ${
            errors.arch
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-700"
          } rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 
          dark:text-gray-100 focus:outline-none transition`}
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Desktop Name
          <span aria-hidden="true" className="text-red-500 ms-1">
            *
          </span>
        </label>
        <input
          type="text"
          value={form.desktopName}
          onChange={(e) => {
            onChange("desktopName", e.target.value);
            validateField("desktopName", e.target.value);
          }}
          className={`w-full border ${
            errors.desktopName
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-700"
          } rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 
          dark:text-gray-100 focus:outline-none transition`}
        />
      </div>
    </form>
  );
};

export default AppInfoForm;
