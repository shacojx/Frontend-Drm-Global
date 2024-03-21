import { useEffect, useState } from "react";
import { FormFieldSelect } from "../../components/FormFieldSelect";
import { FormFieldText } from "../../components/FormFieldText";
import { useValidateCaller } from "../../hooks-ui/useValidateCaller";
import { MailingAddress } from "src/types/my-company";
import { NATION_INFOS } from "src/constants/SelectionOptions";
import { useTranslation } from "react-i18next";

type MailingAddressTabProps = {
  readonly: boolean;
  mailingAddress?: Partial<MailingAddress>;
  onChange?: (mailingAddress: Partial<MailingAddress>) => void;
};

export function MailingAddressTab({ readonly, mailingAddress, onChange }: MailingAddressTabProps) {
  const { t } = useTranslation();
  const { validateCaller } = useValidateCaller();

  const handleFormChange = <K extends keyof MailingAddress>(key: K, value: MailingAddress[K]) => {
    const newInfo = { ...mailingAddress, [key]: value };
    onChange?.(newInfo);
  };

  return (
    <div className="gap-x-4 gap-y-6 grid grid-cols-2 xl:grid-cols-6">
      <div>
        <FormFieldText
          isFixedValue={readonly}
          label={t("State")}
          validateCaller={validateCaller}
          id="state"
          value={mailingAddress?.state}
          onChange={(value) => handleFormChange("state", value)}
        />
      </div>

      <div>
        <FormFieldSelect
          isFixedValue={readonly}
          optionInfos={NATION_INFOS}
          label={t("Country")}
          isRequired
          validateCaller={validateCaller}
          id="country"
          value={mailingAddress?.country}
          onChange={(value) => handleFormChange("country", value)}
        />
      </div>

      <div>
        <FormFieldText
          isFixedValue={readonly}
          label={t("City")}
          isRequired
          validateCaller={validateCaller}
          id="city"
          value={mailingAddress?.city}
          onChange={(value) => handleFormChange("city", value)}
        />
      </div>

      <div className="col-span-2 row-start-2 xl:row-start-1 xl:col-start-3">
        <FormFieldText
          isFixedValue={readonly}
          label={t("Address")}
          isRequired
          validateCaller={validateCaller}
          id="address"
          value={mailingAddress?.address}
          onChange={(value) => handleFormChange("address", value)}
        />
      </div>

      <div>
        <FormFieldText
          isFixedValue={readonly}
          label={t("Zip Code")}
          isRequired
          validateCaller={validateCaller}
          id="zipCode"
          value={mailingAddress?.zipCode}
          onChange={(value) => handleFormChange("zipCode", value)}
        />
      </div>
    </div>
  );
}
