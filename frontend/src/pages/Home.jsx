import { useState } from "react";
import Stepper from "../components/Stepper";
import CompleteInfoForm from "../components/CompleteInfoForm";
import ChooseFile from "../components/ChooseFile";
import ConfirmForm from "../components/ConfirmForm";

const Home = () => {
  const [completeForm, setCompleteForm] = useState({
    fileName: "",
    version: "",
    arch: [],
    desktopName: "",
  });

  const updateCompleteFormField = (field, value) => {
    setCompleteForm((prev) => ({ ...prev, [field]: value }));
  };

  const [confirmForm, setConfirmForm] = useState({
    outputPath: "",
    outputFormat: [],
  });

  const updateConfirmFormField = (field, value) => {
    setConfirmForm((prev) => ({ ...prev, [field]: value }));
  };

  const [iconPath, setIconPath] = useState();
  const [binaryPath, setBinaryPath] = useState();
  const [docs, setDocs] = useState([]);

  const handleSubmit = () => {
    const data = {
      ...completeForm,
      ...confirmForm,
      arch: completeForm.arch.join(","),
      iconPath: iconPath,
      binaryPath: binaryPath,
      docs: docs,
    };
    console.log("data: ", data);
  };

  const steps = [
    {
      header: "Complete info",
      content: (
        <CompleteInfoForm
          form={completeForm}
          onChange={updateCompleteFormField}
        />
      ),
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
      content: (
        <ConfirmForm form={confirmForm} onChange={updateConfirmFormField} />
      ),
      onSubmit: handleSubmit,
    },
  ];

  return (
    <div className="bg-white dark:bg-neutral-800">
      <Stepper steps={steps} />
    </div>
  );
};

export default Home;
