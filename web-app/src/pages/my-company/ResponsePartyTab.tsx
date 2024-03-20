import { useEffect, useState } from "react";
import { FormFieldText } from "../../components/FormFieldText";
import { useValidateCaller } from "../../hooks-ui/useValidateCaller";
import clsx from "clsx";

type ResponseParty = {
  firstName: string;
  lastName: string;
  hasSSNorITIN: boolean;
};

type ResponsePartyTabProps = {
  readonly: boolean;
};

export function ResponsePartyTab({ readonly }: ResponsePartyTabProps) {
  const { validateCaller } = useValidateCaller();

  const [responseParty, setResponseParty] = useState<ResponseParty>({
    firstName: "Luc",
    lastName: "Le",
    hasSSNorITIN: false,
  });

  const handleFormChange = <K extends keyof ResponseParty>(key: K, value: ResponseParty[K]) => {
    const newInfo = { ...responseParty, [key]: value };
    setResponseParty(newInfo);
  };

  useEffect(() => {
    // INFO: call api for response party
  }, []);

  return (
    <div className="flex gap-x-4 gap-y-6 flex-wrap justify-start">
      <div>
        <FormFieldText
          isFixedValue={readonly}
          label="First Name"
          isRequired
          validateCaller={validateCaller}
          id="firstName"
          value={responseParty.firstName}
          onChange={(value) => handleFormChange("firstName", value)}
        />
      </div>

      <div>
        <FormFieldText
          isFixedValue={readonly}
          label="Last Name"
          isRequired
          validateCaller={validateCaller}
          id="lastName"
          value={responseParty.lastName}
          onChange={(value) => handleFormChange("lastName", value)}
        />
      </div>

      <div className="flex flex-col justify-between">
        <div className="font-bold">Do you have SSN or ITIN ?</div>
        <div className={clsx("flex gap-4", { "pointer-events-none": readonly })}>
          <label htmlFor="yes" className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="accent-primary w-5 h-5"
              id="yes"
              checked={responseParty.hasSSNorITIN}
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
              checked={!responseParty.hasSSNorITIN}
              onChange={(event) => {
                const isChecked = event.currentTarget.checked;
                if (!isChecked) return;
                handleFormChange("hasSSNorITIN", false);
              }}
            />
            No
          </label>
        </div>
      </div>

      <div>
        <FormFieldText
          isFixedValue
          label="_"
          validateCaller={validateCaller}
          id="_"
          onChange={() => {}}
        />
      </div>
    </div>
  );
}
