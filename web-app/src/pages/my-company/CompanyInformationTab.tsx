import { useEffect, useState } from "react";
import { FormFieldSelect } from "../../components/FormFieldSelect";
import { FormFieldText } from "../../components/FormFieldText";
import { useValidateCaller } from "../../hooks-ui/useValidateCaller";
import { FormFieldTextArea } from "../../components/FormFieldArea";
import { ENTITY_ENDING_INFOS, INDUSTRY_INFOS, NATION_INFOS } from "src/constants/SelectionOptions";
import { EntityEnding, Industry } from "src/api/types";
import { CompanyInformation } from "src/types/my-company";
import { useTranslation } from "react-i18next";

type CompanyInformationTabProps = {
  readonly: boolean;
  companyInfo?: Partial<CompanyInformation>;
  onChange?: (companyInfo: Partial<CompanyInformation>) => void;
};

export function CompanyInformationTab({
  readonly,
  companyInfo,
  onChange,
}: CompanyInformationTabProps) {
  const { t } = useTranslation();
  const { validateCaller } = useValidateCaller();

  const handleFormChange = <K extends keyof CompanyInformation>(
    key: K,
    value: CompanyInformation[K]
  ) => {
    const newInfo = { ...companyInfo, [key]: value };
    onChange?.(newInfo);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-4 gap-y-6 justify-start">
      <div>
        <FormFieldText
          isRequired
          label={t("Company Name")}
          isFixedValue={readonly}
          className="w-full"
          id="companyName"
          validateCaller={validateCaller}
          value={companyInfo?.companyName}
          onChange={(value) => handleFormChange("companyName", value)}
        />
      </div>

      <div>
        <FormFieldSelect
          isFixedValue={readonly}
          optionInfos={ENTITY_ENDING_INFOS}
          label={t("Entity Ending")}
          isRequired
          className="w-full"
          id="entity"
          value={companyInfo?.entityEnding}
          validateCaller={validateCaller}
          onChange={(value) => handleFormChange("entityEnding", value)}
        />
      </div>

      <div>
        <FormFieldSelect
          optionInfos={NATION_INFOS}
          isFixedValue={readonly}
          label={t("Region")}
          isRequired
          className="w-full"
          id="region"
          value={companyInfo?.region}
          validateCaller={validateCaller}
          onChange={(value) => handleFormChange("region", value)}
        />
      </div>

      <div>
        <FormFieldSelect
          isFixedValue={readonly}
          optionInfos={INDUSTRY_INFOS}
          isRequired
          label={t("Industry")}
          className="w-full"
          id="industry"
          value={companyInfo?.industry}
          validateCaller={validateCaller}
          onChange={(value) => handleFormChange("industry", value)}
        />
      </div>

      <div>
        <FormFieldText
          isFixedValue={readonly}
          label={t("Website")}
          isRequired
          className="w-full"
          id="website"
          value={companyInfo?.website}
          validateCaller={validateCaller}
          onChange={(value) => handleFormChange("website", value)}
        />
      </div>

      <div className="min-w-full col-span-1 xl:col-span-3">
        <FormFieldTextArea
          isFixedValue={readonly}
          label={t("Company Description")}
          isRequired
          className="w-full"
          id="description"
          value={companyInfo?.description}
          validateCaller={validateCaller}
          onChange={(value) => handleFormChange("description", value)}
        />
      </div>
    </div>
  );
}
