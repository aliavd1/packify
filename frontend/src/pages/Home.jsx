import { useState, useRef, useEffect } from "react";
import Stepper from "../components/Stepper";
import AppInfoForm from "../components/AppInfoForm";
import ChooseFile from "../components/ChooseFile";
import ConfirmForm from "../components/ConfirmForm";
import { StartProcess } from "../../wailsjs/go/core/InstallationFileInfo";
import MaintainerInfoForm from "../components/MaintainerInfoForm";
import Dialog from "../components/Dialog";
import Spinner from "../components/Spinner";
import { EventsOff, EventsOn } from "../../wailsjs/runtime/runtime";

const Home = () => {
  const [creationLoading, setCreationLoading] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(null);
  const [dialogOKBtn, setDialogOKBtn] = useState(true);
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
  const dialogRef = useRef(null);

  const updateFormField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // setCreationLoading(true);
    setDialogMessage(null);
    setDialogOKBtn(false);
    dialogRef.current.open();

    StartProcess(form).finally(() => setDialogOKBtn(true));
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

  const closeDialog = () => {
    dialogRef.current.close();
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

  useEffect(() => {
    EventsOn("statusMessage", (message) => {
      setDialogMessage(message);
    });
    return () => {
      EventsOff("statusMessage");
    };
  }, []);

  return (
    <div className="h-screen bg-white dark:bg-neutral-800">
      <Stepper steps={steps} onFinished={resetForm} />
      <Dialog ref={dialogRef} persistent>
        <div className="flex flex-col justify-center items-center gap-y-3">
          <div className="flex justify-center items-center gap-x-2">
            {creationLoading && <Spinner size={10} />}
            {dialogMessage && (
              <span className="dark:text-white">{dialogMessage}</span>
            )}
          </div>
          {dialogOKBtn && (
            <button
              onClick={closeDialog}
              className="px-4 py-2 rounded bg-blue-900 text-white cursor-pointer 
              will-change-transform duration-300 active:scale-95"
            >
              OK
            </button>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Home;
