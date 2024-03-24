import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  ApiMasterServiceParam,
  CreateMasterServiceBody,
  DocumentRequired,
  Result,
  ServiceCycle,
  ServiceStep,
} from "../../src/api/types";
import { DialogContainer } from "../../src/components/DialogContainer";
import {
  IconArrowLeft,
  IconCheck,
  IconSpinner,
} from "../../src/components/icons";
import { FormStatus } from "../../src/types/common";
import { callApiCreateMasterService } from "../api/masterServiceManagement";
import { CommonLoading } from "./CommonLoading";
import { ServiceCycleTable } from "./form-master-service/ServiceCycleTable";
import { ServiceInformation } from "./form-master-service/ServiceInformation";
import { ServiceStepItem } from "./form-master-service/ServiceStep";

type Props = {
  onCreated: () => void;
  serviceStep: ServiceStep[];
  serviceCycle?: ServiceCycle[];
  name?: string;
  enable: boolean;
  onCancelModal: () => void;
  serviceId: number;
  serviceDescription: string;
  appliedCompanyType: string[];
  appliedNation: string[];
  serviceType: string;
  serviceName: string;
};

export type ServiceStepDisplayProps = {
  isSubmitted: boolean;
  serviceStep: ServiceStep[];
  onUpdateServiceStep: (value: ServiceStep[]) => void;
};

export function ServiceStepDisplay(props: ServiceStepDisplayProps) {
  const [stepDataList, setStepDataList] = React.useState(
    (props?.serviceStep ?? []) as ServiceStep[]
  );

  const onAddDocumentRequire = React.useCallback(
    (stepIndex: number, index: number) => {
      setStepDataList((stepDataList) =>
        stepDataList?.map((step, index) => {
          if (index === stepIndex) {
            return {
              ...step,
              documentRequired: [
                ...step.documentRequired,
                {
                  id: step.documentRequired.length,
                  documentRequired: "",
                },
              ],
            };
          }
          return step;
        })
      );
    },
    [stepDataList]
  );

  const onAddResultRequired = React.useCallback(
    (stepIndex: number, value: number) => {
      setStepDataList((stepDataList) =>
        stepDataList?.map((step, index) => {
          if (index === stepIndex) {
            return {
              ...step,
              result: [
                ...step.result,
                { id: step.result.length, result: "" },
              ],
            };
          }
          return step;
        })
      );
    },
    [stepDataList]
  );

  const onRemoveDocumentRequire = React.useCallback(
    (stepIndex: number, documentId: number) => {
      setStepDataList((stepDataList) =>
        stepDataList?.map((step, index) => {
          if (index === stepIndex) {
            return {
              ...step,
              documentRequired: step.documentRequired?.filter(
                (doc, docId) => docId !== documentId
              ),
            };
          }
          return step;
        })
      );
    },
    [stepDataList]
  );

  const onRemoveResultRequire = React.useCallback(
    (stepIndex: number, resultId: number) => {
      setStepDataList((stepDataList) =>
        stepDataList?.map((step, index) => {
          if (index === stepIndex) {
            return {
              ...step,
              result: step.result.filter((rs, rsId) => rsId !== resultId),
            };
          }
          return step;
        })
      );
    },
    [stepDataList]
  );

  const onChangeResultItem = React.useCallback(
    (stepIndex: number, resultId: number, value: string) => {
      setStepDataList((stepDataList) =>
        stepDataList?.map((step, index) => {
          if (index === stepIndex) {
            return {
              ...step,
              result: step.result.map((rs, rsId) => {
                if (rsId === resultId) {
                  return { ...rs, result: value };
                }
                return rs;
              }),
            };
          }
          return step;
        })
      );
    },
    [stepDataList]
  );

  const onChangeDocumentItem = React.useCallback(
    (stepIndex: number, resultId: number, value: string) => {
      setStepDataList((stepDataList) =>
        stepDataList?.map((step, index) => {
          if (index === stepIndex) {
            return {
              ...step,
              documentRequired: step.documentRequired.map((doc, docId) => {
                if (docId === resultId) {
                  return { ...doc, documentRequired: value };
                }
                return doc;
              }),
            };
          }
          return step;
        })
      );
    },
    [stepDataList]
  );

  React.useEffect(() => {
    setStepDataList(props.serviceStep)
  }, [props.serviceStep.length])
  const onChangeStepContent = React.useCallback(
    (stepIndex: number, name: keyof ServiceStep, value: string) => {
      setStepDataList((stepDataList) =>
        stepDataList?.map((step, index) => {
          if (index === stepIndex) {
            return {
              ...step,
              [name]: value,
            };
          }

          return step;
        })
      );
    },
    [stepDataList]
  );

  const onAddNewItem = React.useCallback(() => {
    setStepDataList([
      ...stepDataList,
      {
        id: stepDataList.length,
        stepNo: "",
        name: "",
        estimatedCompletionTime: "",
        description: "",
        result: [] as Result[],
        documentRequired: [] as DocumentRequired[],
      } as unknown as ServiceStep,
    ]);
  }, [stepDataList]);

  const onDeleteItem = React.useCallback(
    (index: number) => {
      if (stepDataList.length > 1) {
        setStepDataList((stepDataList) =>
          stepDataList?.filter((item, stepIndex) => stepIndex !== index)
        );
      }
    },
    [stepDataList]
  );

  const onDuplicateItem = React.useCallback(
    (index: number) => {
      const newItem = stepDataList?.find((item, stepIndex) => stepIndex === index);

      if (newItem) {
        setStepDataList([
          ...stepDataList,
          { ...newItem, id: stepDataList.length + 1 },
        ]);
      }
    },
    [stepDataList]
  );

  React.useEffect(() => {
    props.onUpdateServiceStep(stepDataList);
  }, [stepDataList]);

  return (
    <Box>
      {stepDataList.map((step, index) => (
        <div key={`${index}`} className="px-2 rounded-2xl mb-2 default-box">
          <ServiceStepItem
            step={step}
            index={index}
            onChangeStepContent={onChangeStepContent}
            onAddDocumentRequire={onAddDocumentRequire}
            onRemoveDocumentRequire={onRemoveDocumentRequire}
            onChangeDocumentItem={onChangeDocumentItem}
            onChangeResultItem={onChangeResultItem}
            onAddResult={onAddResultRequired}
            onRemoveResult={onRemoveResultRequire}
            onDuplicateItem={onDuplicateItem}
            onAddNewItem={onAddNewItem}
            onDeleteItem={onDeleteItem}
            disableDelete={Boolean(stepDataList.length < 2)}
            isSubmitted={props.isSubmitted}
          ></ServiceStepItem>
        </div>
      ))}
    </Box>
  );
}

export type ChangeStateProps = {
  id: number;
  enable: boolean;
  onActive: (id: number) => void;
  onDeactive: (id: number) => void;
};

export function ActionButton(props: ChangeStateProps) {
  const onChangeState = React.useCallback(() => {
    if (props.enable) {
      props.onDeactive(props?.id);
    } else {
      props.onActive(props?.id);
    }
  }, [props?.onActive, props?.onDeactive, props?.id]);

  const displayClassName = React.useMemo(() => {
    if (props.enable) {
      return "text-success padding-x-3 padding-y-4 w-full h-full flex justify-center items-center bg-green-200 gap-2 rounded-xl";
    }

    return "flex text-error padding-x-3 padding-y-4 w-full h-full justify-center items-center bg-gray-200 gap-2 rounded-xl";
  }, []);

  const displayStatus = React.useMemo(() => {
    if (props.enable) {
      return "text-success w-4 h-4 rounded-full bg-green-500 font-bold";
    }

    return "text-error w-4 h-4 padding-x-10 padding-y-4 rounded-full bg-gray-500 font-bold";
  }, []);

  const translation = useTranslation();
  const displayMessage = React.useMemo(() => {
    if (props.enable) {
      return <div>{translation.t("masterService.active")}</div>;
    }

    return <div>{translation.t("masterService.deactive")}</div>;
  }, []);
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
        "text-slate-50 bg-primary flex justify-center px-3 py-2 rounded-xl items-center"
      }
      onClick={props.onBack}
    >
      <IconArrowLeft />
      <div className="ml-2">{translation.t("masterService.backButton")}</div>
    </button>
  );
}

export type ConfirmActiveModalProps = {
  onCancel: () => void;
  enable: boolean;
  onSubmit: () => void;
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
    <DialogContainer isAutoSize handleClickOverlay={props.onCancel}>
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
                className="bg-[#9195A0] text-white rounded-xl px-4 py-2 font-bold text-xl"
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
                className="bg-[#ED7D2D] text-white rounded-xl px-4 py-2 font-bold text-xl"
              >
                {translation.t(
                  props?.enable
                    ? "masterService.active"
                    : "masterService.deactive"
                )}
              </button>
            </div>
          </Grid>
        </Grid>
      </div>
    </DialogContainer>
  );
}

export function FormCreateMasterService(props: Props) {
  const [status, setStatus] = useState<FormStatus>("typing");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [body, setBody] = React.useState({
    serviceDescription: props.serviceDescription,
    serviceStep: props.serviceStep,
    appliedNation: props?.appliedNation,
    enable: props.enable ?? false,
    serviceName: props.serviceName,
    serviceType: props.serviceType,
    serviceCycle: props.serviceCycle,
    appliedCompanyType: props?.appliedCompanyType ?? ([] as string[]),
  } as ApiMasterServiceParam & { enable: boolean });
  const [isSubmitted, setIsSubmitted] = React.useState(false);
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
        serviceType: false,
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
    [body]
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
      setBody({ ...body, [name]: value });
      onRecallValidate({ ...body, [name]: value });
    },
    [body]
  );

  async function onSubmitAction() {
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
        const createMasterServiceBody: CreateMasterServiceBody = {
          serviceDescription: body.serviceDescription,
          appliedNation: body.appliedNation,
          serviceName: body.serviceName ?? "",
          serviceType: body.serviceType ?? "",
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
        callApiCreateMasterService(createMasterServiceBody)
          .then((response) => {
            toast.success("Created service successfully");
            props.onCreated();
          })
          .catch((e) => {
            toast.error(e?.toString());
          })
          .finally(() => {
            setLoading(false);
          });
        setStatus("success");
      } catch (e: unknown) {
        setStatus("failure");
        setErrorMessage(e?.toString());
        toast.error(e?.toString());
        console.error(e);
      }
    }
  }
  const [isVisibleChangeState, setIsVisibleChangeState] = React.useState(false);
  const onHide = () => {
    setIsVisibleChangeState(false);
  };

  const onSubmitActive = () => {
    onSubmitAction();
  };
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
    props.onCancelModal();
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

  const onAddMoreServiceSCycleFee = React.useCallback(
    (id: number) => {
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
    },
    [body]
  );

  return (
    <>
      <CommonLoading loading={loading} />
      <div className={"flex flex-col gap-y-8 px-8"}>
        {isVisibleChangeState && (
          <ConfirmActiveModal
            enable={props.enable}
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
              {translation.t("masterService.createNewService")}
            </div>
          </Grid>
        </Grid>
        <ServiceInformation
          serviceDescription={body.serviceDescription}
          enable={body?.enable}
          serviceName={body.serviceName}
          applyCompanyType={body?.appliedCompanyType}
          serviceType={body?.serviceType}
          appliedNation={body?.appliedNation}
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
          onRemoveServiceCycleFee={onRemoveServiceCycleFee}
          onAddMoreServiceSCycleFee={onAddMoreServiceSCycleFee}
        />

        {/* Input form */}
        <div className={"w-full flex justify-center items-center font-bold"}>
          <Grid container>
            <Grid item md={6}>
              <button
                onClick={onClickActiveAction}
                className={`px-4 py-2 flex justify-center items-center gap-2 bg-red-500 text-white font-semibold rounded-lg`}
              >
                {translation.t("masterService.cancel")}
                {status === "requesting" && <IconSpinner />}
              </button>
            </Grid>
            <Grid item md={6}>
              <div className="w-full flex items-right justify-end ">
                <button
                  onClick={onSubmitAction}
                  className="px-4 py-2 flex justify-right items-center gap-2 bg-primary text-white font-semibold rounded-lg"
                >
                  {translation.t("masterService.save")}
                  {status === "requesting" && <IconSpinner />}
                  {status === "success" && (
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
