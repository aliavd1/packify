import { useState } from "react";
import Stepper from "../components/Stepper";
import AppInfoForm from "../components/AppInfoForm";
import ChooseFile from "../components/ChooseFile";
import ConfirmForm from "../components/ConfirmForm";
import { StartProcess } from "../../wailsjs/go/core/InstallationFileInfo";
import MaintainerInfoForm from "../components/MaintainerInfoForm";

const Home = () => {
  // App info form
  const [appInfoForm, setAppInfoForm] = useState({
    fileName: "",
    version: "",
    arch: [],
    desktopName: "",
  });
  const updateAppInfoFormField = (field, value) => {
    setAppInfoForm((prev) => ({ ...prev, [field]: value }));
  };

  // Maintainer info form
  const [maintainerInfoForm, setMaintainerInfoForm] = useState({
    maintainerFirstName: "",
    maintainerLastName: "",
    maintainerEmail: "",
  });
  const updateMaintainerInfoFormField = (field, value) => {
    setMaintainerInfoForm((prev) => ({ ...prev, [field]: value }));
  };

  // Confirm form
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
      ...maintainerInfoForm,
      ...appInfoForm,
      ...confirmForm,
      arch: appInfoForm.arch.join(","),
      iconPath: iconPath,
      binaryPath: binaryPath,
      docs: docs,
    };
    StartProcess(data);
  };

  const resetAllForms = () => {
    setAppInfoForm({
      fileName: "",
      version: "",
      arch: [],
      desktopName: "",
    });

    setMaintainerInfoForm({
      maintainerFirstName: "",
      maintainerLastName: "",
      maintainerEmail: "",
    });

    setConfirmForm({
      outputPath: "",
      outputFormat: [],
    });
  };

  const steps = [
    {
      header: "Complete maintainer info",
      content: (
        <MaintainerInfoForm
          form={maintainerInfoForm}
          onChange={updateMaintainerInfoFormField}
        />
      ),
    },
    {
      header: "Complete app info",
      content: (
        <AppInfoForm form={appInfoForm} onChange={updateAppInfoFormField} />
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
    <div className="h-screen bg-white dark:bg-neutral-800">
      <Stepper steps={steps} onFinished={resetAllForms} />
    </div>
  );
};

export default Home;
