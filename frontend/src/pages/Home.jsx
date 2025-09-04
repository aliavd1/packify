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
  const [step, setStep] = useState(0);
  const [creationLoading, setCreationLoading] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(null);
  const [dialogOKBtn, setDialogOKBtn] = useState(false);
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
    maintainerFirstName: z.string().nonempty(),
    maintainerLastName: z.string().nonempty(),
    maintainerEmail: z.email().nonempty(),
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
    fileName: z.string().nonempty(),
    version: z
      .string()
      .regex(/^(?:0|[1-9][0-9]*:)?[0-9][A-Za-z0-9.+:~]*(?:-[A-Za-z0-9+.~]+)?$/)
      .nonempty(),
    arch: z.string().nonempty(),
    desktopName: z.string().nonempty(),
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

  const confirmFormSchema = z.object({
    outputFormat: z.string().nonempty(),
    outputPath: z.string().nonempty(),
  });

  const validateConfirmForm = () => {
    const result = confirmFormSchema.safeParse(form);
    if (!result.success) {
      const formattedErrors = z.treeifyError(result.error);
      setErrors({
        outputFormat: formattedErrors.properties.outputFormat?.errors[0],
        outputPath: formattedErrors.properties.outputPath?.errors[0],
      });
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  const chooseFileSchema = (fieldName) =>
    z.object({
      [fieldName]: z.string().nonempty(),
    });

  const validateChooseFile = (fieldName) => {
    const schema = chooseFileSchema(fieldName);
    const result = schema.safeParse(form);
    if (!result.success) {
      const formattedErrors = z.treeifyError(result.error);
      setErrors({
        [fieldName]: formattedErrors.properties[fieldName]?.errors[0],
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
          validationSchema={chooseFileSchema("iconPath")}
          errors={errors}
          setErrors={setErrors}
        />
      ),
      onChanged: () => validateChooseFile("iconPath"),
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
          validationSchema={chooseFileSchema("binaryPath")}
          errors={errors}
          setErrors={setErrors}
        />
      ),
      onChanged: () => validateChooseFile("binaryPath"),
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
      content: (
        <ConfirmForm
          form={form}
          onChange={updateFormField}
          validationSchema={confirmFormSchema}
          errors={errors}
          setErrors={setErrors}
        />
      ),
      onChanged: () => {
        if (validateConfirmForm()) {
          handleSubmit();
          return true;
        }
      },
    },
  ]);

  const goBack = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  const goNext = () => {
    const currentStepOnChanged = steps[step]?.onChanged;
    if (currentStepOnChanged && !currentStepOnChanged()) {
      return;
    }
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

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
      <Stepper step={step} steps={steps} goBack={goBack} goNext={goNext} />
      <Dialog ref={dialogRef} persistent>
        <div className="flex flex-col justify-center items-center gap-y-3">
          <div className="flex justify-center items-center gap-x-2">
            {creationLoading && <Spinner size={7} />}
            {dialogMessage && (
              <span className="dark:text-white">{dialogMessage}</span>
            )}
          </div>
          {dialogOKBtn && (
            <button
              onClick={() => {
                resetForm();
                closeDialog();
                setStep(0);
              }}
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
