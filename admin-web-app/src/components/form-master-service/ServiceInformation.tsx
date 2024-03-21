import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ServiceCycle, ServiceStep } from "../../../src/api/types";
import {
  ENTITY_ENDING_INFOS,
  INDUSTRY_INFOS,
  NATION_INFOS,
} from "../../../src/constants/SelectionOptions";
import { FormFieldSelect } from "../../../src/components/FormFieldSelect";
import { FormFieldText } from "../../../src/components/FormFieldText";

export type ServiceInformationProps = {
  appliedNation: string;
  applyCompanyType: string;
  serviceType: string;
  enable: boolean;
  serviceName: string;
  serviceDescription: string;
  onUpdateBody: (
    name: string,
    value: string | string[] | number | ServiceCycle[] | ServiceStep[] | boolean
  ) => void;
};

export function ServiceInformation(props: ServiceInformationProps) {
  const translation = useTranslation();
  const onUpdateAppliedNation = (v: string) => {
    props.onUpdateBody("appliedNation", [v]);
  };

  const onUpdateApplyCompanyType = (v: string) => {
    console.log('v', v)
    props.onUpdateBody("appliedCompanyType", [v]);
  };

  const onUpdateServiceDescription = (v: string) => {
    props.onUpdateBody("serviceDescription", v);
  };

  const onUpdateServiceType = (v: string) => {
    props.onUpdateBody("serviceType", v);
  };

  const onUpdateServiceName = (v: string) => {
    props.onUpdateBody("serviceName", v);
  };

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
              <FormFieldSelect
                id={"appliedNation"}
                validateCaller={{}}
                label={translation.t("masterService.appliedNation")}
                onChange={onUpdateAppliedNation}
                value={props.appliedNation}
                optionInfos={NATION_INFOS}
                placeholder="Applied Nation"
              />
            </Grid>
            <Grid item md={2}>
              <FormFieldSelect
                id={"applyCompanyType"}
                validateCaller={{}}
                label={translation.t("masterService.serviceCompanyType")}
                onChange={onUpdateApplyCompanyType}
                value={props.applyCompanyType}
                optionInfos={ENTITY_ENDING_INFOS}
                placeholder="Applied Company Type"
              />
            </Grid>
            <Grid item md={2}>
              <FormFieldSelect
                id={"serviceType"}
                label={translation.t("masterService.serviceType")}
                validateCaller={{}}
                onChange={onUpdateServiceType}
                value={props.serviceType}
                optionInfos={INDUSTRY_INFOS}
                placeholder={"Service type..."}
              />
            </Grid>
            <Grid item md={2}>
              <FormFieldText
                id={"serviceName"}
                validateCaller={{}}
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
                placeholder={'Service description...'}
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
