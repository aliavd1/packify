import { useState } from "react";
import Stepper from "../components/Stepper";
import CompleteInfoForm from "../components/CompleteInfoForm";
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

  return (
    <div className="bg-white dark:bg-neutral-800">
      <Stepper steps={steps} />
    </div>
  );
};

export default Home;
