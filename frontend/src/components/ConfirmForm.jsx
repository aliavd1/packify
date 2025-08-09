import Select from "./Select";
import { ChooseDirectoryPath } from "../../wailsjs/go/core/FilePicker";

const ConfirmForm = ({ form, onChange }) => {
  const selectOptions = [".deb", ".tar.gz", "AppImage"];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const openDirectoryDialog = async () => {
    const dirPath = await ChooseDirectoryPath();
    onChange("outputPath", dirPath);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-10 p-6 transition">
      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Output format
        </label>
        <Select
          options={selectOptions}
          value={form.outputFormat}
          onChange={(e) => onChange("outputFormat", e)}
          multi
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Output path
        </label>
        <input
          type="text"
          value={form.outputPath}
          onClick={openDirectoryDialog}
          onChange={(e) => onChange("outputPath", e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
        />
      </div>
    </form>
  );
};

export default ConfirmForm;
