import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  ApiMasterServiceParam,
  ServiceCycle,
  ServiceStep,
} from "../../../src/api/types";
import { FormFieldSelect } from "../../../src/components/FormFieldSelect";
import { FormFieldText } from "../../../src/components/FormFieldText";
import {
  APPLY_COMPANY_TYPE,
  INDUSTRY_INFOS,
  NATION_INFOS,
  SERVICE_TYPE,
} from "../../../src/constants/SelectionOptions";
import { useValidateCaller } from "../../hooks-ui/useValidateCaller";
import { ErrorMessage } from "../ErrorMessage";
import React from "react";
import { FormFieldMultiSelect } from "../FormFieldMultiSelect";

export type ServiceInformationProps = {
  appliedNation: string[]
  applyCompanyType: string[]
  serviceType: string[]
  enable: boolean;
  serviceName: string;
  serviceDescription: string;
  onUpdateBody: (
    name: string,
    value: string | string[] | number | ServiceCycle[] | ServiceStep[] | boolean
  ) => void;
  validatorSchema: {
    error: Record<keyof ApiMasterServiceParam, boolean>;
    isError: boolean;
  };
  isSubmitted: boolean;
};

export function ServiceInformation(props: ServiceInformationProps) {
  const translation = useTranslation();
  const { validateCaller } = useValidateCaller();
  const onUpdateAppliedNation = React.useCallback(
    (v: string[]) => {
      props.onUpdateBody("appliedNation", v);
    },
    [props.onUpdateBody]
  );

  const onUpdateAppliedCompanyType = React.useCallback(
    (v: string[]) => {
      props.onUpdateBody("appliedCompanyType", v);
    },
    [props.onUpdateBody]
  );

  const onUpdateServiceDescription = React.useCallback(
    (v: string) => {
      props.onUpdateBody("serviceDescription", v);
    },
    [props.onUpdateBody]
  );
  const onUpdateServiceType = React.useCallback(
    (v: string[]) => {
      props.onUpdateBody("serviceType", v);
    },
    [props.onUpdateBody]
  );

  const onUpdateServiceName = React.useCallback(
    (v: string) => {
      props.onUpdateBody("serviceName", v);
    },
    [props.onUpdateBody]
  );

  console.log("validateAll");
  return (
    <div
      className={
        "flex flex-col grow bg-white rounded justify-start items-center"
      }
    >
      <div
        className={
          "w-full flex flex-row justify-between items-center gap-10 mb-4"
        }
      >
        <div
          className={"w-full flex flex-row justify-start items-end gap-10 mb-4"}
        >
          <Grid container spacing={2}>
            <Grid item md={2}>
              <FormFieldMultiSelect
                id={"appliedNation"}
                isRequired={true}
                validateCaller={validateCaller}
                label={translation.t("masterService.appliedNation")}
                onChange={onUpdateAppliedNation}
                value={props.appliedNation as string[]}
                defaultValue={NATION_INFOS?.at(0)?.value}
                optionInfos={NATION_INFOS}
                placeholder="Applied Nation"
                errorComponent={
                  <ErrorMessage
                    message={translation.t("masterService.appliedNationError")}
                    isError={!props.appliedNation.length}
                    showErrorMessage={props.isSubmitted}
                  />
                }
              />
            </Grid>
            <Grid item md={2}>
              <FormFieldMultiSelect
                id={"applyCompanyType"}
                validateCaller={validateCaller}
                isRequired={true}
                label={translation.t("masterService.serviceCompanyType")}
                onChange={onUpdateAppliedCompanyType}
                value={props.applyCompanyType}
                defaultValue={APPLY_COMPANY_TYPE?.at(0)?.value}
                optionInfos={APPLY_COMPANY_TYPE}
                placeholder="Applied Company Type"
                errorComponent={
                  <ErrorMessage
                    message={translation.t("masterService.appliedCompanyTypeError")}
                    isError={!props.applyCompanyType.length}
                    showErrorMessage={props.isSubmitted}
                  />
                }
              />
            </Grid>
            <Grid item md={2}>
              <FormFieldMultiSelect
                id={"serviceType"}
                isRequired={true}
                label={translation.t("masterService.serviceType")}
                validateCaller={validateCaller}
                onChange={onUpdateServiceType}
                value={props.serviceType}
                defaultValue={SERVICE_TYPE?.at(0)?.value}
                optionInfos={SERVICE_TYPE}
                placeholder={"Service type..."}
                errorComponent={
                  <ErrorMessage
                    message={translation.t("masterService.serviceTypeError")}
                    isError={!props.serviceType.length}
                    showErrorMessage={props.isSubmitted}
                  />
                }
              />
            </Grid>
            <Grid item md={2}>
              <FormFieldText
                id={"serviceName"}
                validateCaller={validateCaller}
                label={translation.t("masterService.serviceName")}
                onChange={onUpdateServiceName}
                value={props.serviceName}
                placeholder={"Service name..."}
              />
            </Grid>
            <Grid item md={4}>
              <FormFieldText
                id={"description"}
                label={translation.t("masterService.description")}
                placeholder={"Service description..."}
                validateCaller={{}}
                onChange={onUpdateServiceDescription}
                value={props.serviceDescription}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
