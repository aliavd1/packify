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
import { useMemo } from "react";
import z from "zod";

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
  const [errors, setErrors] = useState({});
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

  const maintainerInfoFormSchema = z.object({
    maintainerFirstName: z.string().nonempty("Firstname is required."),
    maintainerLastName: z.string().nonempty("Lastname is required."),
    maintainerEmail: z.email().nonempty("Email is required."),
  });

  const validateMaintainerInfoForm = () => {
    const result = maintainerInfoFormSchema.safeParse(form);
    if (!result.success) {
      const formattedErrors = z.treeifyError(result.error);
      setErrors({
        maintainerFirstName:
          formattedErrors.properties.maintainerFirstName?.errors[0],
        maintainerLastName:
          formattedErrors.properties.maintainerLastName?.errors[0],
        maintainerEmail: formattedErrors.properties.maintainerEmail?.errors[0],
      });
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  const appInfoFormSchema = z.object({
    fileName: z.string().nonempty("Filename is required."),
    version: z.string().nonempty("Version is required."),
    arch: z.string().nonempty("Arch is required."),
    desktopName: z.string().nonempty("Desktopname is required."),
  });

  const validateAppInfoForm = () => {
    const result = appInfoFormSchema.safeParse(form);
    if (!result.success) {
      const formattedErrors = z.treeifyError(result.error);
      setErrors({
        fileName: formattedErrors.properties.fileName?.errors[0],
        version: formattedErrors.properties.version?.errors[0],
        arch: formattedErrors.properties.arch?.errors[0],
        desktopName: formattedErrors.properties.desktopName?.errors[0],
      });
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  const steps = useMemo(() => [
    {
      header: "Complete maintainer info",
      content: (
        <MaintainerInfoForm
          form={form}
          onChange={updateFormField}
          validationSchema={maintainerInfoFormSchema}
          errors={errors}
          setErrors={setErrors}
        />
      ),
      onChanged: validateMaintainerInfoForm,
    },
    {
      header: "Complete app info",
      content: (
        <AppInfoForm
          form={form}
          onChange={updateFormField}
          validationSchema={appInfoFormSchema}
          errors={errors}
          setErrors={setErrors}
        />
      ),
      onChanged: validateAppInfoForm,
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
      onChanged: handleSubmit,
    },
  ]);

  // useEffect(() => {
  //   EventsOn("statusMessage", (message) => {
  //     setDialogMessage(message);
  //   });
  //   return () => {
  //     EventsOff("statusMessage");
  //   };
  // }, []);

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
              className="px-4 py-2 rounded bg-blue-700 text-white cursor-pointer 
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
