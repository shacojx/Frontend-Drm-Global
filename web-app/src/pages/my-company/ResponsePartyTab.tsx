import { useEffect, useState } from "react";
import { FormFieldText } from "../../components/FormFieldText";
import { useValidateCaller } from "../../hooks-ui/useValidateCaller";
import clsx from "clsx";
import { ResponseParty } from "src/types/my-company";
import { cn } from "src/services-ui/tailwindcss";
import { useTranslation } from "react-i18next";

type ResponsePartyTabProps = {
  readonly: boolean;
  responseParty?: Partial<ResponseParty>;
  onChange?: (responseParty: Partial<ResponseParty>) => void;
};

export function ResponsePartyTab({ readonly, responseParty, onChange }: ResponsePartyTabProps) {
  const { t } = useTranslation();
  const { validateCaller } = useValidateCaller();

  const handleFormChange = <K extends keyof ResponseParty>(key: K, value: ResponseParty[K]) => {
    onChange?.({ ...responseParty, [key]: value });
  };

  return (
    <div className="gap-x-4 gap-y-6 justify-start grid grid-cols-2 lg:grid-cols-3">
      <div>
        <FormFieldText
          isFixedValue={readonly}
          label={t("First Name")}
          isRequired
          validateCaller={validateCaller}
          id="firstName"
          value={responseParty?.firstName}
          onChange={(value) => handleFormChange("firstName", value)}
        />
      </div>

      <div>
        <FormFieldText
          isFixedValue={readonly}
          label={t("Last Name")}
          isRequired
          validateCaller={validateCaller}
          id="lastName"
          value={responseParty?.lastName}
          onChange={(value) => handleFormChange("lastName", value)}
        />
      </div>

      <div className="flex flex-col justify-between xl:col-span-1 col-span-2">
        <div className="font-bold mb-2">{t("Do you have SSN or ITIN ?")}</div>

        <div
          className={clsx("flex gap-4 flex-col xl:flex-row", {
            "pointer-events-none": readonly,
          })}
        >
          <div className="flex gap-4 mb-4">
            <label htmlFor="yes" className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-primary w-5 h-5"
                id="yes"
                checked={responseParty?.hasSSNorITIN}
                onChange={(event) => {
                  const isChecked = event.currentTarget.checked;
                  if (!isChecked) return;

                  handleFormChange("hasSSNorITIN", true);
                }}
              />
              Yes
            </label>

            <label htmlFor="no" className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-primary w-5 h-5"
                id="no"
                checked={!responseParty?.hasSSNorITIN}
                onChange={(event) => {
                  const isChecked = event.currentTarget.checked;
                  if (!isChecked) return;

                  handleFormChange("SSNorITIN", undefined);
                  handleFormChange("hasSSNorITIN", false);
                }}
              />
              No
            </label>
          </div>

          <FormFieldText
            isRequired
            className={cn("w-full", { "hidden xl:invisible": !responseParty?.hasSSNorITIN })}
            id="SSN/ITIN"
            value={responseParty?.SSNorITIN}
            validateCaller={validateCaller}
            onChange={(value) => handleFormChange("SSNorITIN", value)}
          />
        </div>
      </div>
    </div>
  );
}
