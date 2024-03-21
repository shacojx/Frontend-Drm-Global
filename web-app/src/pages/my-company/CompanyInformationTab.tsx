import { useEffect, useState } from "react";
import { FormFieldSelect } from "../../components/FormFieldSelect";
import { FormFieldText } from "../../components/FormFieldText";
import { useValidateCaller } from "../../hooks-ui/useValidateCaller";
import { FormFieldTextArea } from "../../components/FormFieldArea";
import { ENTITY_ENDING_INFOS, INDUSTRY_INFOS } from "src/constants/SelectionOptions";
import { EntityEnding, Industry } from "src/api/types";
import { CompanyInformation } from "src/types/my-company";

type CompanyInformationTabProps = {
  readonly: boolean;
  companyInfo: CompanyInformation;
  onChange?: (companyInfo: CompanyInformation) => void;
};

export function CompanyInformationTab({
  readonly,
  companyInfo,
  onChange,
}: CompanyInformationTabProps) {
  const { validateCaller } = useValidateCaller();

  const handleFormChange = <K extends keyof CompanyInformation>(
    key: K,
    value: CompanyInformation[K]
  ) => {
    const newInfo = { ...companyInfo, [key]: value };
    onChange?.(newInfo);
  };

  useEffect(() => {
    // TODO: call api company tab
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-4 gap-y-6 justify-start">
      <div className="min-w-80">
        <label className="font-bold mb-2 block">
          Company Name <span className="text-danger">*</span>
        </label>
        <FormFieldText
          isFixedValue={readonly}
          className="w-full"
          id="companyName"
          validateCaller={validateCaller}
          value={companyInfo.companyName}
          onChange={(value) => handleFormChange("companyName", value)}
        />
      </div>

      <div className="min-w-80">
        <FormFieldSelect
          isFixedValue={readonly}
          optionInfos={ENTITY_ENDING_INFOS}
          label="Entity Ending"
          isRequired
          className="w-full"
          id="entity"
          value={companyInfo.entityEnding}
          validateCaller={validateCaller}
          onChange={(value) => handleFormChange("entityEnding", value)}
        />
      </div>

      <div className="min-w-80">
        <FormFieldText
          isFixedValue
          label="Region"
          isRequired
          className="w-full"
          id="region"
          value={companyInfo.region}
          validateCaller={validateCaller}
          onChange={(value) => handleFormChange("region", value)}
        />
      </div>

      <div className="min-w-80">
        <FormFieldSelect
          isFixedValue={readonly}
          optionInfos={INDUSTRY_INFOS}
          isRequired
          label="Industry"
          className="w-full"
          id="industry"
          value={companyInfo.industry}
          validateCaller={validateCaller}
          onChange={(value) => handleFormChange("industry", value)}
        />
      </div>

      <div className="min-w-80">
        <FormFieldText
          isFixedValue={readonly}
          label="Website"
          isRequired
          className="w-full"
          id="website"
          value={companyInfo.website}
          validateCaller={validateCaller}
          onChange={(value) => handleFormChange("website", value)}
        />
      </div>

      <div className="min-w-full col-span-1 xl:col-span-3">
        <FormFieldTextArea
          isFixedValue={readonly}
          label="Company Description"
          isRequired
          className="w-full"
          id="description"
          value={companyInfo.description}
          validateCaller={validateCaller}
          onChange={(value) => handleFormChange("description", value)}
        />
      </div>
    </div>
  );
}
