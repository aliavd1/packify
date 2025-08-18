import { useState } from "react";
import Stepper from "../components/Stepper";
import AppInfoForm from "../components/AppInfoForm";
import ChooseFile from "../components/ChooseFile";
import ConfirmForm from "../components/ConfirmForm";
import { StartProcess } from "../../wailsjs/go/core/InstallationFileInfo";
import MaintainerInfoForm from "../components/MaintainerInfoForm";

const Home = () => {
  // App info form
  const [form, setForm] = useState({
    maintainerFirstName: "",
    maintainerLastName: "",
    maintainerEmail: "",
    fileName: "",
    version: "",
    arch: "",
    desktopName: "",
    iconPath: "",
    binaryPath: "",
    docs: [],
    outputFormat: "",
    outputPath: "",
  });
  const updateFormField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    StartProcess(form);
  };

  const resetForm = () => {
    setForm({
      maintainerFirstName: "",
      maintainerLastName: "",
      maintainerEmail: "",
      fileName: "",
      version: "",
      arch: "",
      desktopName: "",
      iconPath: "",
      binaryPath: "",
      docs: [],
      outputFormat: "",
      outputPath: "",
    });
  };

  const steps = [
    {
      header: "Complete maintainer info",
      content: <MaintainerInfoForm form={form} onChange={updateFormField} />,
    },
    {
      header: "Complete app info",
      content: <AppInfoForm form={form} onChange={updateFormField} />,
    },
    {
      header: "Select icon",
      content: (
        <ChooseFile
          key="applicationIcon"
          title="Select Application Icon"
          displayName="Icon Files (*.png, *.svg, *.xpm)"
          pattern="*.png;*.svg;*.xpm"
          fieldName="iconPath"
          onChange={updateFormField}
        />
      ),
    },
    {
      header: "Select binary file",
      content: (
        <ChooseFile
          key="binaryFile"
          title="Select Executable File"
          displayName="Executable Files (*)"
          pattern="*"
          fieldName="binaryPath"
          onChange={updateFormField}
        />
      ),
    },
    {
      header: "Select docs, licences, readme, ...",
      content: (
        <ChooseFile
          key="docs"
          multi
          title="Select Documentation Files"
          displayName="Documentation Files (*.md, *.txt, *.html, *.gz)"
          pattern="*.md;*.txt;*.html;*.gz"
          fieldName="docs"
          onChange={updateFormField}
        />
      ),
    },
    {
      header: "Confirm",
      content: <ConfirmForm form={form} onChange={updateFormField} />,
      onSubmit: handleSubmit,
    },
  ];

  return (
    <div className="h-screen bg-white dark:bg-neutral-800">
      <Stepper steps={steps} onFinished={resetForm} />
    </div>
  );
};

export default Home;
