import { useState } from "react";
import { IconEssential, IconUpload } from "../../components/icons";

type Document = {
  id: string;
  name: string;
  url: string;
};

type DocumentTabProps = {
  readonly: boolean;
};

export function DocumentTab({ readonly }: DocumentTabProps) {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Document 1",
      url: "$",
    },
  ]);

  return (
    <div>
      {!readonly && (
        <label
          htmlFor="upload"
          className="flex justify-center gap-3 text-primary rounded-lg w-full border border-solid border-primary py-4 font-bold mb-6 cursor-pointer"
        >
          <IconUpload />
          Upload
          <input
            className="hidden"
            type="file"
            id="upload"
            onChange={(event) => {
              console.log(event.currentTarget.files);
              const file = event.currentTarget.files?.item(0);
              if (!file) return;

              setDocuments((prev) => [...prev, { id: file.name, name: file.name, url: file.name }]);
            }}
          />
        </label>
      )}

      {documents.map((document) => (
        <div
          key={document.id}
          className="flex justify-between mb-6 border border-solid border-surface py-4 px-3 rounded-lg items-center"
        >
          <div className="font-bold">{document.name}</div>
          <button className="px-6 font-bold bg-primary text-white rounded-lg py-3">Download</button>
        </div>
      ))}
    </div>
  );
}
