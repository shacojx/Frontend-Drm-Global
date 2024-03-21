import { useEffect, useState } from "react";
import { FormFieldSelect } from "../../components/FormFieldSelect";
import { FormFieldText } from "../../components/FormFieldText";
import { useValidateCaller } from "../../hooks-ui/useValidateCaller";

export type MailingAddress = {
  state?: string;
  country: string;
  city: string;
  address: string;
  zipCode: string;
};

type MailingAddressTabProps = {
  readonly: boolean;
  mailingAddress: MailingAddress;
  onChange?: (mailingAddress: MailingAddress) => void;
};

export function MailingAddressTab({ readonly, mailingAddress, onChange }: MailingAddressTabProps) {
  const { validateCaller } = useValidateCaller();

  const handleFormChange = <K extends keyof MailingAddress>(key: K, value: MailingAddress[K]) => {
    const newInfo = { ...mailingAddress, [key]: value };
    onChange?.(newInfo);
  };

  useEffect(() => {
    // INFO: call api
  }, []);

  return (
    <div className="gap-x-4 gap-y-6 grid grid-cols-2 xl:grid-cols-6">
      <div>
        <FormFieldText
          isFixedValue={readonly}
          label="State"
          validateCaller={validateCaller}
          id="state"
          value={mailingAddress.state}
          onChange={(value) => handleFormChange("state", value)}
        />
      </div>

      <div>
        <FormFieldSelect
          isFixedValue={readonly}
          optionInfos={[{ label: "Viet Nam", value: "vn" }]}
          label="Country"
          isRequired
          validateCaller={validateCaller}
          id="country"
          value={mailingAddress.country}
          onChange={(value) => handleFormChange("country", value)}
        />
      </div>

      <div>
        <FormFieldText
          isFixedValue={readonly}
          label="City"
          isRequired
          validateCaller={validateCaller}
          id="city"
          value={mailingAddress.city}
          onChange={(value) => handleFormChange("city", value)}
        />
      </div>

      <div className="col-span-2 row-start-2 xl:row-start-1 xl:col-start-3">
        <FormFieldText
          isFixedValue={readonly}
          label="Address"
          isRequired
          validateCaller={validateCaller}
          id="address"
          value={mailingAddress.address}
          onChange={(value) => handleFormChange("address", value)}
        />
      </div>

      <div>
        <FormFieldText
          isFixedValue={readonly}
          label="Zip Code"
          isRequired
          validateCaller={validateCaller}
          id="zipCode"
          value={mailingAddress.zipCode}
          onChange={(value) => handleFormChange("zipCode", value)}
        />
      </div>
    </div>
  );
}
