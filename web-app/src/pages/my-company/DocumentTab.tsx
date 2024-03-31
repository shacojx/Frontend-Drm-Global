import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Document } from "../../api/types";
import { getFile, uploadDocument, uploadFile } from "../../api/upload";
import { IconSpinner, IconUpload } from "../../components/icons";

type DocumentTabProps = {
  readonly: boolean;
  documents?: Document[];
  onChange?: (documents: Document[]) => void;
};

export function DocumentTab({ readonly, documents = [], onChange }: DocumentTabProps) {
  const { t } = useTranslation();
  const [downloadingName, setDownloadingName] = useState<string>();
  const [error, setError] = useState<string>()

  const handleFormChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.item(0);
    if (!file) return;

    if (file.size > 10_000_000) {
      setError("File size must be less than 10MB")
      return
    }

    const { data } = await uploadDocument(file);
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
          onMouseDown={() => setError(undefined)}
        >
          <IconUpload />
          {t("Upload")}
          <input className="hidden" type="file" id="upload" onChange={handleFormChange} accept="image/png, image/jpeg, image/jpg, .pdf, .xls, xlsx, .docx, .doc, .ppt, .pptx" />
        </label>
      )}

      {error && <p className="mb-6 text-danger">{error}</p>}

      {documents.map((document) => (
        <div
          key={document.name}
          className="flex mb-6 border border-solid border-surface py-4 px-3 rounded-lg items-center gap-2"
        >
          <div className="font-bold grow">{document.name}</div>
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

          {!readonly && <button
            className="px-6 font-bold bg-primary text-white rounded-lg py-3 flex gap-1"
            onClick={async () => {
              if (!document.name) return;

              const newDocuments = documents.filter(doc => doc.name !== document.name);
              onChange?.(newDocuments);
            }}
          >
            {downloadingName === document.name && <IconSpinner />}
            {t("Delete")}
          </button>}
        </div>
      ))}
    </div>
  );
}
