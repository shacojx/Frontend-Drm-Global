import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Document } from "../../api/types";
import { getFile, uploadFile } from "../../api/upload";
import { IconSpinner, IconUpload } from "../../components/icons";

type DocumentTabProps = {
  readonly: boolean;
  documents?: Document[];
  onChange?: (documents: Document[]) => void;
};

export function DocumentTab({ readonly, documents = [], onChange }: DocumentTabProps) {
  const { t } = useTranslation();
  const [downloadingName, setDownloadingName] = useState<string>();

  const handleFormChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.item(0);
    if (!file) return;
    const { data } = await uploadFile(file);
    const savedFile = data[0];

    const newDocuments = [...documents, { id: savedFile, name: savedFile, url: savedFile }];
    onChange?.(newDocuments);
  };

  return (
    <div>
      {!readonly && (
        <label
          htmlFor="upload"
          className="flex justify-center gap-3 text-primary rounded-lg w-full border border-solid border-primary py-4 font-bold mb-6 cursor-pointer"
        >
          <IconUpload />
          {t("Upload")}
          <input className="hidden" type="file" id="upload" onChange={handleFormChange} />
        </label>
      )}

      {documents.map((document) => (
        <div
          key={document.id}
          className="flex justify-between mb-6 border border-solid border-surface py-4 px-3 rounded-lg items-center"
        >
          <div className="font-bold">{document.name}</div>
          <button
            className="px-6 font-bold bg-primary text-white rounded-lg py-3 flex gap-1"
            onClick={async () => {
              if (!document.name) return;

              setDownloadingName(document.name);
              await getFile(document.name);
              setDownloadingName(undefined);
            }}
          >
            {downloadingName === document.name && <IconSpinner />}
            {t("Download")}
          </button>
        </div>
      ))}
    </div>
  );
}
