import { useEffect, useState } from "react";
import { FormFieldSelect } from "../../components/FormFieldSelect";
import { FormFieldText } from "../../components/FormFieldText";
import { useValidateCaller } from "../../hooks-ui/useValidateCaller";
import { FormFieldTextArea } from "../../components/FormFieldArea";

type CompanyInformation = {
  companyName: string;
  entityEnding: string;
  industry: string;
  website: string;
  description: string;
  region: string;
};

type CompanyInformationTabProps = {
  readonly: boolean;
};

export function CompanyInformationTab({
  readonly,
}: CompanyInformationTabProps) {
  const { validateAll, validateCaller } = useValidateCaller();

  const [companyInfo, setCompanyInfo] = useState<CompanyInformation>({
    companyName: "companyName",
    entityEnding: "entityEnding",
    industry: "industry",
    website: "website",
    description: "description",
    region: "region",
  });

  useEffect(() => {
    // TODO: call api company tab
  }, []);

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-6 justify-start">
      <div className="min-w-96">
        <label className="font-bold mb-2 block">
          Company Name <span className="text-danger">*</span>
        </label>
        <FormFieldText
          isFixedValue={readonly}
          className="w-full"
          id="companyName"
          validateCaller={validateCaller}
          value={companyInfo.companyName}
          onChange={(value) =>
            setCompanyInfo((prev) => ({ ...prev, companyName: value }))
          }
        />
      </div>

      <div className="min-w-96">
        <FormFieldSelect
          isFixedValue={readonly}
          optionInfos={[{ label: "option 1", value: "id" }]}
          label="Entity Ending"
          isRequired
          className="w-full"
          id="entity"
          value={companyInfo.entityEnding}
          validateCaller={validateCaller}
          onChange={(value) =>
            setCompanyInfo((prev) => ({ ...prev, entityEnding: value }))
          }
        />
      </div>

      <div className="min-w-96">
        <FormFieldText
          isFixedValue
          label="Region"
          isRequired
          className="w-full"
          id="region"
          value={companyInfo.region}
          validateCaller={validateCaller}
          onChange={(value) =>
            setCompanyInfo((prev) => ({ ...prev, region: value }))
          }
        />
      </div>

      <div className="min-w-96">
        <FormFieldSelect
          isFixedValue={readonly}
          optionInfos={[{ label: "option 1", value: "idn2" }]}
          isRequired
          label="Industry"
          className="w-full"
          id="industry"
          value={companyInfo.industry}
          validateCaller={validateCaller}
          onChange={(value) =>
            setCompanyInfo((prev) => ({ ...prev, industry: value }))
          }
        />
      </div>

      <div className="min-w-96">
        <FormFieldText
          isFixedValue={readonly}
          label="Website"
          isRequired
          className="w-full"
          id="website"
          value={companyInfo.website}
          validateCaller={validateCaller}
          onChange={(value) =>
            setCompanyInfo((prev) => ({ ...prev, website: value }))
          }
        />
      </div>

      <div className="min-w-full">
        <FormFieldTextArea
          isFixedValue={readonly}
          label="Company Description"
          isRequired
          className="w-full"
          id="description"
          value={companyInfo.description}
          validateCaller={validateCaller}
          onChange={(value) =>
            setCompanyInfo((prev) => ({ ...prev, description: value }))
          }
        />
      </div>
    </div>
  );
}
