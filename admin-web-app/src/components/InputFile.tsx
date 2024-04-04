import { Fragment, useRef } from "react";
import { IconUpload, IconX } from "./icons";

interface Props {
  onChange?: (file?: File) => void;
  accept?: string;
  label?: string;
  fileName?: string;
  disabled?: boolean;
  maxSize?: number;
}

export default function InputFile({onChange, accept = "*", label = "Upload", fileName, disabled = false, maxSize=40}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0];
    event.target.value = "";

    if (
      fileFromLocal &&
      (fileFromLocal.size > maxSize * 1024 * 1024)
    ) {
      alert(`File phải nhỏ hơn ${maxSize}MB `);
    } else {
      onChange && onChange(fileFromLocal);
    }
  };

  const onClearFile = () => {
    onChange && onChange();
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Fragment>
      <input
        className="hidden"
        type="file"
        accept={accept}
        ref={fileInputRef}
        onChange={onFileChange}
        disabled={disabled}
      />
      {!fileName && (
        <button
          type="button"
          onClick={handleUpload}
          className={"flex gap-md bg-primary px-6 py-4 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"}
          disabled={disabled}
        >
          <div>{<IconUpload />}</div>
          <div>{label}</div>
        </button>
      )}

      {fileName && (
        <>
          <div className="flex gap-md justify-between border border-solid border-surface py-4 px-3 rounded-lg items-center">
            <div className="font-bold">{fileName}</div>
            <button
              className="font-bold hover:bg-danger/20 text-danger py-3 px-4 rounded-lg"
              onClick={onClearFile}
            >
              <IconX />
            </button>
          </div>
        </>
      )}
    </Fragment>
  );
}
