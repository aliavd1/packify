const MaintainerInfoForm = ({ form, onChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-5 p-6 transition">
      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Maintainer first name
        </label>
        <input
          type="text"
          value={form.maintainerFirstName}
          onChange={(e) => onChange("maintainerFirstName", e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
        />
      </div>
      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Maintainer last name
        </label>
        <input
          type="text"
          value={form.maintainerLastName}
          onChange={(e) => onChange("maintainerLastName", e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
        />
      </div>
      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Maintainer email
        </label>
        <input
          type="text"
          value={form.maintainerEmail}
          onChange={(e) => onChange("maintainerEmail", e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
        />
      </div>
    </form>
  );
};

export default MaintainerInfoForm;
