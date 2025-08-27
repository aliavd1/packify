import Select from "./Select";

const AppInfoForm = ({ form, onChange }) => {
  const selectOptions = [
    {
      key: "x86-64 (64-bit)",
      value: "x86_64",
    },
    {
      key: "x86-32 (32-bit)",
      value: "i386",
    },
    {
      key: "AArch64 (arm64)",
      value: "aarch64",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
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
          onChange={(e) => onChange("fileName", e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Version
        </label>
        <input
          type="text"
          value={form.version}
          onChange={(e) => onChange("version", e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Architecture
        </label>
        <Select
          options={selectOptions}
          value={form.arch}
          onChange={(e) => onChange("arch", e)}
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Desktop Name
        </label>
        <input
          type="text"
          value={form.desktopName}
          onChange={(e) => onChange("desktopName", e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
        />
      </div>
    </form>
  );
};

export default AppInfoForm;
