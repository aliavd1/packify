import Select from "./Select";
import { ChooseDirectoryPath } from "../../wailsjs/go/core/FilePicker";
import z from "zod";

const ConfirmForm = ({
  form,
  onChange,
  validationSchema,
  errors,
  setErrors,
}) => {
  const selectOptions = [
    {
      key: "deb",
      value: "deb",
    },
    {
      key: "tar.gz",
      value: "tar.gz",
    },
    {
      key: "AppImage",
      value: "AppImage",
    },
  ];

  const validateField = (fieldName, value) => {
    console.log(validationSchema);
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

  const openDirectoryDialog = async () => {
    const dirPath = await ChooseDirectoryPath();
    onChange("outputPath", dirPath);
  };

  return (
    <form className="space-y-6 mt-10 p-6 transition">
      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Output format
          <span aria-hidden="true" className="text-red-500 ms-1">
            *
          </span>
        </label>
        <Select
          options={selectOptions}
          value={form.outputFormat}
          onChange={(e) => {
            onChange("outputFormat", e);
            validateField("outputFormat", e);
          }}
          className={`w-full border ${
            errors.outputFormat
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-700"
          } rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 
          dark:text-gray-100 focus:outline-none transition`}
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Output path
          <span aria-hidden="true" className="text-red-500 ms-1">
            *
          </span>
        </label>
        <input
          type="text"
          value={form.outputPath}
          onClick={openDirectoryDialog}
          onChange={(e) => {
            onChange("outputPath", e.target.value);
            validateField("outputPath", e.target.value);
          }}
          className={`w-full border ${
            errors.outputPath
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-700"
          } rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 
          dark:text-gray-100 focus:outline-none transition`}
        />
      </div>
    </form>
  );
};

export default ConfirmForm;
