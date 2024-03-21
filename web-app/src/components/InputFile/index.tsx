import { Fragment, useRef } from "react";
import { IconUpload, IconX } from "../icons";
import Button from "../Button";
import { useTranslation } from "react-i18next";

interface Props {
  onChange?: (file?: File) => void;
  accept?: string;
  label?: string;
  file?: File;
}

export default function InputFile({
  onChange,
  accept = "*",
  label = "Upload",
  file,
}: Props) {
  const { t } = useTranslation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0];
    event.target.value = "";
    onChange && onChange(fileFromLocal);

    // if (
    //   fileFromLocal &&
    //   (fileFromLocal.size > 1 * 1024 * 1024 ||
    //     !fileFromLocal.type.includes("image"))
    // ) {
    //   alert("file phải nhỏ hơn 1MB và có định dạng ảnh");
    // } else {
    //   onChange && onChange(fileFromLocal);
    // }
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
      />
      {!file && (
        <Button
          icon={<IconUpload />}
          label={label}
          type="button"
          onClick={handleUpload}
        />
      )}

      {file && (
        <>
          <div className="flex gap-md justify-between border border-solid border-surface py-4 px-3 rounded-lg items-center">
            <div className="font-bold">{file?.name}</div>
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
