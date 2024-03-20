import { useEffect, useState } from "react";
import { IconEssential, IconXCircle } from "../../components/icons";
import { FormFieldText } from "../../components/FormFieldText";
import { useValidateCaller } from "../../hooks-ui/useValidateCaller";
import { FormFieldNumber } from "../../components/FormFieldNumber";
import clsx from "clsx";

const EMPTY_OWNER = {
  id: "",
  companyName: "",
  ownership: 0,
  document: "",
  type: "Company",
};

type OwnerInformation = {
  id: string;
  companyName: string;
  ownership: number; // INFO: (%)
  document: string;
  type: "Company" | "Individual";
};

type OwnerInformationTabProps = {
  readonly: boolean;
};

export function OwnerInformationTab({ readonly }: OwnerInformationTabProps) {
  const [owners, setOwners] = useState<Partial<OwnerInformation>[]>([
    {
      id: "A",
      companyName: "trungluc",
      ownership: 12,
      document: "hehe",
      type: "Company",
    },
  ]);

  useEffect(() => {
    // TODO: call api for ownership
  }, []);

  const { validateCaller } = useValidateCaller();

  const handleAddOwner = () => {
    setOwners((prev) => [
      ...prev,
      {
        id: Date.now().valueOf().toString(),
        companyName: "",
        ownership: 0,
        document: "",
        type: "Company",
      },
    ]);
  };

  return (
    <div>
      {owners.map((owner, idx) => (
        <div key={owner.id}>
          <div className="flex justify-between">
            <div className="underline text-lg font-bold mb-6">Owner {idx + 1}</div>

            <div
              className={clsx("flex gap-3", {
                "pointer-events-none": readonly,
              })}
            >
              <label
                htmlFor={`company-${owner.id}`}
                className="flex gap-1 items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="type"
                  id={`company-${owner.id}`}
                  className="accent-primary w-5 h-5 border-surface rounded-lg"
                  checked={owner.type === "Company"}
                  onChange={(event) => {
                    if (owner.type === "Company") return;
                    const isChecked = event.currentTarget.checked;

                    if (!isChecked) return;
                    setOwners((prev) =>
                      prev.map((o) => (o.id === owner.id ? { ...o, type: "Company" } : o))
                    );
                  }}
                />
                <span>Company</span>
              </label>

              <label
                htmlFor={`individual-${owner.id}`}
                className="flex gap-1 items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="type"
                  id={`individual-${owner.id}`}
                  className="accent-primary w-5 h-5 border-surface rounded-lg"
                  checked={owner.type === "Individual"}
                  onChange={(event) => {
                    if (owner.type === "Individual") return;
                    const isChecked = event.currentTarget.checked;
                    if (!isChecked) return;
                    setOwners((prev) =>
                      prev.map((o) => (o.id === owner.id ? { ...o, type: "Individual" } : o))
                    );
                  }}
                />
                <span>Individual</span>
              </label>
            </div>
          </div>

          <div className="relative flex justify-start gap-x-4 gap-y-6 mb-6 flex-wrap">
            {owners.length > 1 && (
              <button
                className="absolute right-1 top-1 cursor-pointer"
                onClick={() => {
                  setOwners((prev) => prev.filter((o) => o.id !== owner.id));
                }}
              >
                <IconXCircle />
              </button>
            )}

            <div className="min-w-96">
              <FormFieldText
                isFixedValue={readonly}
                label="Company Name"
                isRequired
                validateCaller={validateCaller}
                id="companyName"
                value={owner.companyName}
                onChange={(value) => {
                  setOwners((prev) =>
                    prev.map((o) => (o.id === owner.id ? { ...o, companyName: value } : o))
                  );
                }}
              />
            </div>

            <div className="min-w-96">
              <FormFieldNumber
                isFixedValue={readonly}
                label="Ownership (%)"
                isRequired
                validateCaller={validateCaller}
                id="ownership"
                value={owner.ownership}
                onChange={(value) => {
                  setOwners((prev) => {
                    const newOwners = prev.map((o) =>
                      o.id === owner.id ? { ...o, ownership: value } : o
                    );

                    const totalShare = newOwners.reduce(
                      (acc, owner) => acc + (owner.ownership ?? 0),
                      0
                    );

                    return totalShare <= 100 ? newOwners : prev;
                  });
                }}
              />
            </div>

            <div className="min-w-96">
              <FormFieldNumber
                isFixedValue={readonly}
                label="Document"
                validateCaller={validateCaller}
                id="document"
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      ))}
      {!readonly && (
        <button
          className="rounded-lg bg-primary h-13 px-6 text-white font-semibold flex items-center gap-3"
          onClick={handleAddOwner}
        >
          <IconEssential /> Add Owner
        </button>
      )}
    </div>
  );
}
