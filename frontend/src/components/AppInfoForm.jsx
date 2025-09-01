import Select from "./Select";

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
    <form onSubmit={handleSubmit} className="space-y-6 mt-5 p-6 transition">
      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          File Name
        </label>
        <input
          type="text"
          value={form.fileName}
          onChange={(e) => {
            onChange("fileName", e.target.value);
            validateField("fileName", e.target.value);
          }}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
        />
        {errors.fileName && (
          <p className="text-red-500 text-sm mt-1">{errors.fileName}</p>
        )}
      </div>

      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Version
        </label>
        <input
          type="number"
          value={form.version}
          onChange={(e) => {
            onChange("version", e.target.value);
            validateField("version", e.target.value);
          }}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
        />
        {errors.version && (
          <p className="text-red-500 text-sm mt-1">{errors.version}</p>
        )}
      </div>

      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Architecture
        </label>
        <Select
          options={selectOptions}
          value={form.arch}
          onChange={(e) => {
            onChange("arch", e);
            validateField("arch", e);
          }}
        />
        {errors.arch && (
          <p className="text-red-500 text-sm mt-1">{errors.arch}</p>
        )}
      </div>

      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Desktop Name
        </label>
        <input
          type="text"
          value={form.desktopName}
          onChange={(e) => {
            onChange("desktopName", e.target.value);
            validateField("desktopName", e.target.value);
          }}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
        />
        {errors.desktopName && (
          <p className="text-red-500 text-sm mt-1">{errors.desktopName}</p>
        )}
      </div>
    </form>
  );
};

export default AppInfoForm;
