import { Grid } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  ApiMasterServiceParam,
  ServiceCycle,
  ServiceStep,
  UpdateMasterServiceBody,
} from "../../src/api/types";
import { DialogContainer } from "../../src/components/DialogContainer";
import {
  IconArrowLeft,
  IconCheck,
  IconSpinner,
} from "../../src/components/icons";
import { FormStatus } from "../../src/types/common";
import {
  callApiActiveMasterService,
  callApiDeactiveMasterService,
  callApiUpdateMasterService,
} from "../api/masterServiceManagement";
import { CommonLoading, DisabledUI } from "./CommonLoading";
import { ServiceStepDisplay } from "./FormCreateMasterService";
import { ServiceCycleTable } from "./form-master-service/ServiceCycleTable";
import { ServiceInformation } from "./form-master-service/ServiceInformation";

type Props = {
  onSubmitted: () => Promise<void>;
  onCancelModal: () => void;
  serviceStep: ServiceStep[];
  serviceCycle?: ServiceCycle[];
  name: string;
  enable: boolean;
  id: number;
  serviceId: string;
  serviceDescription: string;
  appliedCompanyType: string[];
  appliedNation: string[];
  serviceType: string;
  serviceName: string;
};

export type ServiceCycleTableProps = {
  serviceCycle: ServiceCycle[];
  onUpdateServiceCycleFee: (id: number, value: string) => void;
  onRemoveServiceCycleFee: (id: number) => void;
};

export type ChangeStateProps = {
  id: number;
  enable: boolean;
  onActive: (id: number) => void;
  onDeactive: (id: number) => void;
};

export function ActionButton(props: ChangeStateProps) {
  const displayClassName = React.useMemo(() => {
    if (props.enable) {
      return "text-success padding-x-3 padding-y-4 w-full h-full flex justify-center items-center bg-green-200 gap-2 rounded-xl";
    }

    return "flex text-error padding-x-3 padding-y-4 w-full h-full justify-center items-center bg-gray-200 gap-2 rounded-xl";
  }, [props.enable]);

  const displayStatus = React.useMemo(() => {
    if (props.enable) {
      return "text-success w-6 h-6 rounded-full bg-green-500 font-bold";
    }

    return "text-error w-6 h-6 padding-x-10 padding-y-4 rounded-full bg-gray-500 font-bold";
  }, [props.enable]);

  const translation = useTranslation();
  const displayMessage = React.useMemo(() => {
    if (props.enable) {
      return <div>{translation.t("masterService.active")}</div>;
    }

    return <div>{translation.t("masterService.inactive")}</div>;
  }, [props.enable]);
  return (
    <div className="w-auto h-[50px] rounded-xl ">
      <div className={displayClassName}>
        <div className={displayStatus}></div>
        {displayMessage}
      </div>
    </div>
  );
}

export type BackButtonProps = {
  onBack: (e: any) => void;
};

export function BackButton(props: BackButtonProps) {
  const translation = useTranslation();
  return (
    <button
      className={
        "text-slate-50 bg-primary flex justify-center px-2 py-2 rounded-xl items-center"
      }
      onClick={props.onBack}
    >
      <IconArrowLeft />
      <div className="ml-2">{translation.t("masterService.backButton")}</div>
    </button>
  );
}

export type ConfirmActiveModalProps = {
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  enable: boolean;
};

export function ConfirmActiveModal(props: ConfirmActiveModalProps) {
  const translation = useTranslation();
  const displayContent = React.useMemo(() => {
    if (props.enable) {
      return translation.t("masterService.modal.deactiveMessage");
    }

    return translation.t("masterService.modal.activeMessage");
  }, [props.enable]);

  const displayTitle = React.useMemo(() => {
    if (props.enable) {
      return translation.t("masterService.modal.deactiveTitle");
    }

    return translation.t("masterService.modal.activeTitle");
  }, [props.enable]);

  return (
    <DialogContainer isAutoSize onClose={props.onCancel}>
      <div className="p-10">
        <div className="flex justify-center text-4xl px-2 mb-10 font-bold">
          {displayTitle}
        </div>
        <div className="flex justify-center text-xl p-2 mb-10 font-bold mb-10">
          {displayContent}
        </div>
        <Grid container spacing={4}>
          <Grid item md={6}>
            <div className="padding-10 justify-center flex">
              <button
                className="bg-[#9195A0] text-white rounded-xl px-4 py-2"
                onClick={props.onCancel}
              >
                {translation.t("masterService.cancel")}
              </button>
            </div>
          </Grid>
          <Grid item md={6} className="padding-10">
            <div className="padding-10 justify-center flex">
              <button
                color="primary"
                className={[
                  `text-white rounded-xl font-bold px-4 py-2`,
                  props?.enable ? `bg-[#ff2d55]` : "bg-primary",
                ].join(" ")}
                onClick={props.onSubmit}
              >
                {translation.t(
                  props?.enable
                    ? "masterService.deactive"
                    : "masterService.active"
                )}
              </button>
            </div>
          </Grid>
        </Grid>
      </div>
    </DialogContainer>
  );
}

export function FormUpdateMasterService(props: Props) {
  const [status, setStatus] = useState<FormStatus>("typing");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [body, setBody] = React.useState({
    serviceDescription: props.serviceDescription,
    appliedNation: props?.appliedNation,
    enable: props.enable ?? false,
    serviceName: props.serviceName ?? "",
    serviceType: props.serviceType ?? "",
    serviceStep: props.serviceStep,
    serviceCycle: props.serviceCycle,
    appliedCompanyType: props?.appliedCompanyType,
  } as unknown as ApiMasterServiceParam & { enable: boolean });
  const onRecallData = React.useCallback(() => {
    setBody({
      serviceDescription: body.serviceDescription,
      appliedNation: body?.appliedNation,
      enable: props.enable ?? false,
      serviceName: body.serviceName ?? "",
      serviceType: body.serviceType ?? "",
      serviceStep: props.serviceStep,
      serviceCycle: props.serviceCycle,
      appliedCompanyType: props?.appliedCompanyType,
    } as unknown as ApiMasterServiceParam & { enable: boolean });
  }, [props, body]);
  const [loading, setLoading] = React.useState(false);
  const [validatorSchema, setValidatorSchema] = React.useState({
    error: {
      serviceDescription: false,
      appliedNation: false,
      serviceName: false,
      serviceType: false,
      serviceStep: false,
      serviceCycle: false,
      appliedCompanyType: false,
    } as Record<keyof ApiMasterServiceParam, boolean>,
    isError: false,
  });
  const onRecallValidate = React.useCallback(
    (body: ApiMasterServiceParam & { enable: boolean }) => {
      const validateList: Record<keyof ApiMasterServiceParam, boolean> = {
        serviceDescription: false,
        appliedNation: body.appliedNation.length <= 1,
        serviceName: false,
        serviceType: Boolean(body.serviceType),
        serviceStep: body.serviceStep.length <= 1,
        serviceCycle: body.serviceStep.length <= 1,
        appliedCompanyType: body.appliedCompanyType.length <= 1,
      };

      setValidatorSchema({
        error: validateList,
        isError:
          Object.values(validateList).some((item) => item) && isSubmitted,
      });

      return {
        error: validateList,
        isError:
          Object.values(validateList).some((item) => item) && isSubmitted,
      };
    },
    [isSubmitted]
  );
  const onUpdateBody = React.useCallback(
    (
      name: string,
      value:
        | ServiceStep[]
        | ServiceCycle[]
        | string
        | string[]
        | number
        | boolean
    ) => {
      console.log(props.enable);
      if (props.enable) {
        setBody({ ...body, [name]: value });
        onRecallValidate({ ...body, [name]: value });
      }
    },
    [body, props.enable]
  );

  const [isVisibleChangeState, setIsVisibleChangeState] = React.useState(false);
  const onShow = () => {
    setIsVisibleChangeState(true);
  };
  const onHide = () => {
    setIsVisibleChangeState(false);
  };

  const onSubmitActive = React.useCallback(() => {
    setLoading(true);
    setIsSubmitted(true);

    if (props?.enable) {
      try {
        setStatus("requesting");
        callApiDeactiveMasterService({ enable: 0 }, props.id)
          .then(() => {
            toast.success(translation.t("Deactive service successfully"));
            setLoading(false);
          })
          .finally(() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            props.onSubmitted().then(() => {
              setIsSubmitted(false);
              onRecallData();
            });
          });
        setStatus("success");
      } catch (e: unknown) {
        setStatus("failure");
        setErrorMessage(e?.toString());
        console.error(e);
      }
    } else {
      try {
        setStatus("requesting");
        setIsSubmitted(true);
        callApiActiveMasterService(
          {
            enable: 1,
          },
          props.id
        )
          .then(() => {
            toast.success(translation.t("Active service successfully"));
          })
          .finally(() => {
            props.onSubmitted();
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            setIsSubmitted(false);
            setLoading(false);
          });
      } catch (e: unknown) {
        setStatus("failure");
        setErrorMessage(e?.toString());
        console.error(e);
      }
    }
    onHide();
  }, [props.enable, onRecallData]);

  async function onSubmitUpdate() {
    setIsSubmitted(true);

    if (
      body.appliedCompanyType.length &&
      body.appliedNation.length &&
      body.serviceType.length &&
      !body.serviceStep.some(
        (item) =>
          !item.description || !item.name || !item.estimatedCompletionTime
      ) &&
      !body.serviceCycle.some((item) => !item.pricePerCycle)
    ) {
      setLoading(true);
      try {
        setStatus("requesting");
        const updateMasterServiceBody: UpdateMasterServiceBody = {
          serviceDescription: body.serviceDescription,
          appliedNation: body.appliedNation,
          serviceName: body.serviceName ?? [],
          serviceType: body.serviceType,
          serviceCycle: body.serviceCycle,
          appliedCompanyType: body.appliedCompanyType,
          serviceStep: body.serviceStep.map((item) => ({
            ...item,
            documentRequired: item.documentRequired
              .filter((item) => item?.documentRequired)
              .map((item) => item.documentRequired),
            result: item.result
              .filter((item) => item?.result)
              .map((item) => item.result),
          })),
        };
        callApiUpdateMasterService(updateMasterServiceBody, props.id)
          .then((response) => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            toast.success("Update service successfully");
            setStatus("success");
          })
          .finally(() => {
            props.onSubmitted();
            setLoading(false);
          });
        setStatus("success");
      } catch (e: unknown) {
        setStatus("failure");
        setErrorMessage(e?.toString());
        console.error(e);
      }
    }
  }

  const onSubmitAction = React.useCallback(() => {
    if (props.enable) {
      onSubmitUpdate();
    } else {
      setIsVisibleChangeState(true);
    }
  }, [props.enable, onSubmitActive, onSubmitUpdate]);

  const translation = useTranslation();
  const onUpdateServiceStep = React.useCallback(
    (value: ServiceStep[]) => {
      onUpdateBody("serviceStep", value);
    },
    [onUpdateBody]
  );
  const onUpdateServiceCycleFee = React.useCallback(
    (id: number, value: string) => {
      const newServiceCycleList = body.serviceCycle.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            pricePerCycle: Number(value),
          };
        }

        return item;
      });

      onUpdateBody("serviceCycle", newServiceCycleList);
    },
    [body, onUpdateBody]
  );

  const onClickActiveAction = () => {
    setIsVisibleChangeState(true);
  };

  const onRemoveServiceCycleFee = React.useCallback(
    (id: number) => {
      setBody({
        ...body,
        serviceCycle: body.serviceCycle.filter((item) => item.id !== id),
      });
    },
    [body]
  );

  const onAddMoreServiceSCycleFee = React.useCallback(() => {
    setBody({
      ...body,
      serviceCycle: [
        ...body.serviceCycle,
        {
          id: body.serviceCycle.length + 1,
          cycleNumber: body.serviceCycle.length + 1,
          pricePerCycle: 0,
        },
      ],
    });
  }, [body]);

  return (
    <>
      {loading && <CommonLoading loading={loading} />}
      <div className={"flex flex-col gap-y-8 px-8"}>
        {isVisibleChangeState && (
          <ConfirmActiveModal
            enable={props.enable}
            visible={isVisibleChangeState}
            onSubmit={onSubmitActive}
            onCancel={onHide}
          />
        )}
        <Grid container>
          <Grid item md={2}>
            <BackButton onBack={props.onCancelModal}></BackButton>
          </Grid>
          <Grid item md={8}>
            <div className={"text-center text-4xl font-bold"}>
              {props.serviceId ??
                translation.t("masterService.createNewService")}
            </div>
          </Grid>
          <Grid item md={2}>
            <ActionButton
              onDeactive={onShow}
              onActive={onShow}
              id={props.id}
              enable={props.enable}
            ></ActionButton>
          </Grid>
        </Grid>
        <div
          className={[
            "graph-edit-container relative",
            !props?.enable ? "disabled" : "",
          ].join(" ")}
        >
          {!props.enable && <DisabledUI disabled={!props.enable} />}
          <ServiceInformation
            serviceDescription={body.serviceDescription}
            enable={body?.enable}
            serviceName={body.serviceName}
            applyCompanyType={body?.appliedCompanyType ?? ([] as string[])}
            serviceType={body?.serviceType ?? ([] as string[])}
            appliedNation={body?.appliedNation ?? ([] as string[])}
            onUpdateBody={onUpdateBody}
            validatorSchema={validatorSchema}
            isSubmitted={isSubmitted}
          />
          {/* Header */}
          <div className={"text-lg font-bold"}>
            {translation.t("masterService.serviceStep")}
          </div>

          {/* Input form */}
          <ServiceStepDisplay
            onUpdateServiceStep={onUpdateServiceStep}
            serviceStep={body.serviceStep}
            isSubmitted={isSubmitted}
          ></ServiceStepDisplay>
          <div className={"text-lg font-bold"}>
            {translation.t("masterService.serviceCycleAndFee")}
          </div>
          <ServiceCycleTable
            isSubmitted={isSubmitted}
            serviceCycle={(body.serviceCycle ?? []) as ServiceCycle[]}
            onUpdateServiceCycleFee={onUpdateServiceCycleFee}
            onAddMoreServiceSCycleFee={onAddMoreServiceSCycleFee}
            onRemoveServiceCycleFee={onRemoveServiceCycleFee}
          />
        </div>

        {/* Input form */}
        <div className={"w-full flex justify-center items-center font-bold"}>
          <Grid container>
            <Grid item md={6}>
              <button
                onClick={onClickActiveAction}
                className={`px-4 py-2 flex justify-center items-center gap-2 bg-red-500 text-white font-semibold rounded-lg ${
                  !props.enable && "disabled disabled:opacity-50"
                }`}
                disabled={!props.enable}
              >
                {translation.t("masterService.deactivate")}
                {loading && <IconSpinner />}
              </button>
            </Grid>
            <Grid item md={6}>
              <div className="w-full flex items-right justify-end ">
                <button
                  onClick={onSubmitAction}
                  className="px-4 py-2 flex justify-right items-center gap-2 bg-primary text-white font-semibold rounded-lg"
                >
                  {props?.enable
                    ? translation.t("masterService.update")
                    : translation.t("masterService.activate")}
                  {loading && <IconSpinner />}
                  {status === "success" && props?.enable && (
                    <IconCheck className={"text-success"} />
                  )}
                </button>
              </div>
            </Grid>
          </Grid>
        </div>
        {status === "failure" && (
          <p className={"text-danger text-center -my-4"}>{errorMessage}</p>
        )}
      </div>
    </>
  );
}
