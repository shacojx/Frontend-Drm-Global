import { useEffect, useState } from "react";
import { FormFieldSelect } from "../../components/FormFieldSelect";
import { FormFieldText } from "../../components/FormFieldText";
import { useValidateCaller } from "../../hooks-ui/useValidateCaller";

type MailingAddress = {
  state: string;
  country: string;
  city: string;
  address: string;
  zipCode: string;
};

type MailingAddressTabProps = {
  readonly: boolean;
};

export function MailingAddressTab({ readonly }: MailingAddressTabProps) {
  const { validateCaller } = useValidateCaller();

  const [mailingAddress, setMailingAddress] = useState<MailingAddress>({
    state: "",
    country: "vn",
    city: "Ha Noi",
    address: "Me Linh, Ha Noi",
    zipCode: "550000",
  });

  useEffect(() => {
    // INFO: call api
  }, []);

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-6">
      <div>
        <FormFieldText
          isFixedValue={readonly}
          label="State"
          validateCaller={validateCaller}
          id="state"
          value={mailingAddress.state}
          onChange={(value) => {
            setMailingAddress((prev) => ({ ...prev, state: value }));
          }}
        />
      </div>

      <div className="min-w-52">
        <FormFieldSelect
          isFixedValue={readonly}
          optionInfos={[{ label: "Viet Nam", value: "vn" }]}
          label="Country"
          isRequired
          validateCaller={validateCaller}
          id="country"
          value={mailingAddress.country}
          onChange={(value) => {
            setMailingAddress((prev) => ({ ...prev, country: value }));
          }}
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
          onChange={(value) => {
            setMailingAddress((prev) => ({ ...prev, city: value }));
          }}
        />
      </div>

      <div className="min-w-80">
        <FormFieldText
          isFixedValue={readonly}
          label="Address"
          isRequired
          validateCaller={validateCaller}
          id="address"
          value={mailingAddress.address}
          onChange={(value) => {
            setMailingAddress((prev) => ({ ...prev, address: value }));
          }}
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
          onChange={(value) => {
            setMailingAddress((prev) => ({ ...prev, zipCode: value }));
          }}
        />
      </div>
    </div>
  );
}
