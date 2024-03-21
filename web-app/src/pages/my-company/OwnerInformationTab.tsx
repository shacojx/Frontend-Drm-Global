import { useEffect, useState } from "react";
import { IconEssential, IconXCircle } from "../../components/icons";
import { FormFieldText } from "../../components/FormFieldText";
import { useValidateCaller } from "../../hooks-ui/useValidateCaller";
import { FormFieldNumber } from "../../components/FormFieldNumber";
import clsx from "clsx";
import { FormFieldMultipleUpload } from "../../components/FormFieldMultipleUpload";
import { cn } from "src/utils/cn.util";
import { OwnerInformation } from "src/types/my-company";

type OwnerInformationTabProps = {
  readonly: boolean;
  owners: Partial<OwnerInformation>[];
  onChange?: (owners: Partial<OwnerInformation>[]) => void;
};

export function OwnerInformationTab({ readonly, owners, onChange }: OwnerInformationTabProps) {
  const totalShare = owners.reduce((acc, cur) => acc + (cur.ownership ?? 0), 0);

  const handleFormChange = <K extends keyof OwnerInformation>(
    id: string = "",
    key: K,
    value: OwnerInformation[K]
  ) => {
    const newOwnersInfo = owners.map((owner) =>
      owner.id !== id ? owner : { ...owner, [key]: value }
    );

    onChange?.(newOwnersInfo);
  };

  useEffect(() => {
    // TODO: call api for ownership
  }, []);

  const { validateCaller } = useValidateCaller();

  const handleAddOwner = () => {
    onChange?.([
      ...owners,
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
      {totalShare > 100 && (
        <div className="text-danger mb-2">Total ownership must be less than or equal 100.</div>
      )}
      {owners.map((owner, idx) => (
        <div key={owner.id}>
          <div className="flex justify-between items-start">
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
                    handleFormChange(owner.id, "type", "Company");
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
                    handleFormChange(owner.id, "type", "Individual");
                  }}
                />
                <span>Individual</span>
              </label>
            </div>
          </div>

          <div
            className={cn(
              "gap-x-4 gap-y-6 mb-6 grid grid-cols-1",
              owner.type === "Company"
                ? "xl:grid-cols-[repeat(3,1fr),20px]"
                : "grid-cols-[repeat(4,1fr),20px]"
            )}
          >
            {owner.type === "Company" ? (
              <div className="min-w-72">
                <FormFieldText
                  isFixedValue={readonly}
                  label="Company Name"
                  isRequired
                  validateCaller={validateCaller}
                  id="companyName"
                  value={owner.companyName}
                  onChange={(value) => handleFormChange(owner.id, "companyName", value)}
                />
              </div>
            ) : (
              <>
                <div className="min-w-72">
                  <FormFieldText
                    isFixedValue={readonly}
                    label="First Name"
                    isRequired
                    validateCaller={validateCaller}
                    id="firstName"
                    value={owner.companyName}
                    onChange={(value) => handleFormChange(owner.id, "companyName", value)}
                  />
                </div>

                <div className="min-w-72">
                  <FormFieldText
                    isFixedValue={readonly}
                    label="Last Name"
                    isRequired
                    validateCaller={validateCaller}
                    id="lastName"
                    value={owner.companyName}
                    onChange={(value) => handleFormChange(owner.id, "companyName", value)}
                  />
                </div>
              </>
            )}

            <div className="min-w-72">
              <FormFieldNumber
                isFixedValue={readonly}
                label="Ownership (%)"
                isRequired
                validateCaller={validateCaller}
                id="ownership"
                value={owner.ownership}
                onChange={(value) => handleFormChange(owner.id, "ownership", value)}
              />
            </div>

            <div className="min-w-72">
              <FormFieldMultipleUpload
                maxFiles={3}
                isFixedValue={readonly}
                label="Document"
                isRequired
                validateCaller={validateCaller}
                id="document"
                onChange={() => {}}
                value={[{ id: "test-id", name: "Chu nghia Mac-Lenin", url: "#", isSelected: true }]}
              />
            </div>

            {owners.length > 1 && (
              <button
                className="cursor-pointer mt-auto mb-2"
                onClick={() => {
                  onChange?.(owners.filter((o) => o.id !== owner.id));
                }}
              >
                <IconXCircle />
              </button>
            )}
          </div>
        </div>
      ))}
      {!readonly && (
        <button
          className={cn(
            "rounded-lg bg-primary h-13 px-6 text-white font-semibold flex items-center gap-3",
            {
              "bg-disable cursor-not-allowed": totalShare >= 100,
            }
          )}
          onClick={handleAddOwner}
          disabled={totalShare >= 100}
        >
          <IconEssential /> Add Owner
        </button>
      )}
    </div>
  );
}
