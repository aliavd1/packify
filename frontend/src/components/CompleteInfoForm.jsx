import { useState } from "react";
import Select from "./Select";

const CompleteInfoForm = () => {
  const [form, setForm] = useState({
    fileName: "",
    version: "",
    arch: "",
    desktopName: "",
    docs: [""],
  });
  const [arch, setArch] = useState("");

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl mt-10 bg-neutral-100 dark:bg-gray-900 p-6 shadow-lg transition"
    >
      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          File Name
        </label>
        <input
          type="text"
          value={form.fileName}
          onChange={(e) => updateField("fileName", e.target.value)}
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
          onChange={(e) => updateField("version", e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Architecture
        </label>
        {/* <select
          value={form.arch}
          onChange={(e) => updateField("arch", e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
        >
          <option value="">Select architecture</option>
          <option value="amd64">amd64</option>
          <option value="arm64">arm64</option>
          <option value="x86">x86</option>
        </select> */}

        <Select value={arch} onChange={setArch} />
      </div>

      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Desktop Name
        </label>
        <input
          type="text"
          value={form.desktopName}
          onChange={(e) => updateField("desktopName", e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
        />
      </div>
    </form>
  );
};

export default CompleteInfoForm;
