import { Listbox } from "@headlessui/react";
import { useValidate } from "../hooks-ui/useValidateCaller";
import { FormFieldProps } from "../types/common";
import { ChangeEvent, useState } from "react";
import { cn } from "../services-ui/tailwindcss";
import { IconAltArrowDown, IconUpload, IconXCircle } from "./icons";

export type File = {
  id: string;
  name: string;
  url: string;
};

export function FormFieldMultipleUpload({
  id,
  isRequired,
  value = [],
  validateCaller,
  label,
  isFixedValue,
  onChange,
  maxFiles,
}: FormFieldProps<(File & { isSelected: boolean })[]> & { maxFiles?: number }) {
  const [shouldShowError, setShouldShowError] = useValidate(id, isRequired, value, validateCaller);

  const [files, setFiles] = useState<(File & { isSelected: boolean })[]>(value);
  const selectedFile = files.filter((file) => file.isSelected)[0];

  const handleUploadFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.item(0);
    if (!file) return;

    if (maxFiles && files.length >= maxFiles) return;

    const newFiles = [
      ...files.map((file) => ({ ...file, isSelected: false })),
      {
        id: file.name,
        name: file.name,
        url: file.name,
        isSelected: true,
      },
    ];
    setFiles(newFiles);
    onChange?.(newFiles);
  };

  return (
    <div className="flex flex-col gap-2">
      {!!label && (
        <p className="flex text-cBase font-bold gap-1">
          <span>{label}</span>
          {isRequired && <span className="text-danger">*</span>}
        </p>
      )}

      <div
        className={cn("rounded-lg h-10", {
          "border border-solid border-surface": !isFixedValue,
          "border-danger bg-red-50": shouldShowError,
        })}
      >
        <Listbox disabled={isFixedValue}>
          <div className="flex items-center h-full gap-1 w-full">
            <Listbox.Button className="grow text-left flex items-center line-clamp-1">
              {!isFixedValue && <IconAltArrowDown className="mx-2 shrink-0" />}
              {selectedFile?.name}
            </Listbox.Button>

            {!isFixedValue && maxFiles && files.length < maxFiles && (
              <label htmlFor="upload" className="cursor-pointer">
                <IconUpload className="mx-2" />
                <input
                  id="upload"
                  type="file"
                  className="hidden"
                  onChange={handleUploadFileChange}
                  accept="image/png, image/jpeg, image/jpg, pdf, xls, xlsx, docx, doc, ppt, pptx"
                />
              </label>
            )}
          </div>

          <Listbox.Options className="shadow rounded-lg bg-white translate-y-2">
            {files?.map((file) => (
              <Listbox.Option key={file.id} value={file.id} className="p-3 line-clamp-1 flex gap-2">
                <div className="grow line-clamp-1">{file.name}</div>
                <IconXCircle
                  className="shrink-0 cursor-pointer"
                  onClick={() => {
                    const newFiles = files.filter((f) => f.id !== file.id);
                    newFiles[0].isSelected = true;
                    setFiles(newFiles);
                    onChange?.(newFiles);
                  }}
                />
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
    </div>
  );
}
