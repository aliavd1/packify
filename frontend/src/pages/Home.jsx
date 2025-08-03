import { useEffect, useState } from "react";
import ToggleThemeButton from "../components/ToggleThemeButton";
import Stepper from "../components/Stepper";
import CompleteInfoForm from "../components/CompleteInfoForm";
import { Moon, Sun } from "lucide-react";
import ChooseFile from "../components/ChooseFile";

const Home = () => {
  const [form, setForm] = useState({
    fileName: "",
    version: "",
    arch: "",
    desktopName: "",
  });

  const updateFormField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const [iconPath, setIconPath] = useState();
  const [binaryPath, setBinaryPath] = useState();
  const [docs, setDocs] = useState([]);
  const [outputPath, setOutputPath] = useState();

  const steps = [
    {
      header: "Complete info",
      content: <CompleteInfoForm form={form} onChange={updateFormField} />,
    },
    {
      header: "Select icon",
      content: (
        <ChooseFile
          title="Select Application Icon"
          displayName="Icon Files (*.png, *.svg, *.xpm)"
          pattern="*.png;*.svg;*.xpm"
          onChange={setIconPath}
        />
      ),
    },
    {
      header: "Select binary file",
      content: (
        <ChooseFile
          title="Select Executable File"
          displayName="Executable Files (*)"
          pattern="*"
          onChange={setBinaryPath}
        />
      ),
    },
    {
      header: "Select docs, licences, readme, ...",
      content: (
        <ChooseFile
          multi
          title="Select Documentation Files"
          displayName="Documentation Files (*.md, *.txt, *.html, *.gz)"
          pattern="*.md;*.txt;*.html;*.gz"
          onChange={setDocs}
        />
      ),
    },
    {
      header: "Confirm",
      content: <p>Confirm</p>,
    },
  ];
  const [isDark, setIsDark] = useState(() => {
    return JSON.parse(localStorage.getItem("isDark") || "false");
  });

  const toggleTheme = () => {
    localStorage.setItem("isDark", isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    toggleTheme();
  }, [isDark]);

  return (
    <div className="page">
      <ToggleThemeButton
        isDark={isDark}
        btnClasses="fixed bottom-5 right-5 w-12 h-12 bg-neutral-300 rounded-full shadow-lg 
          hover:bg-neutral-200 flex justify-center items-center dark:bg-neutral-700 
          dark:hover:bg-neutral-600 cursor-pointer active:scale-90 will-change-transform duration-300"
        FirstIcon={Sun}
        SecondIcon={Moon}
        duration={300}
        onClick={() => setIsDark((value) => !value)}
      />

      <Stepper steps={steps} />
    </div>
  );
};

export default Home;
