import { Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ApiMasterServiceParam,
  DocumentRequired,
  Result,
  ServiceCycle,
  ServiceStep,
  UpdateMasterServiceBody,
} from "../../src/api/types";
import { DialogContainer } from "../../src/components/DialogContainer";
import { FormFieldText } from "../../src/components/FormFieldText";
import {
  IconAddSquare,
  IconAddSquareOutLine,
  IconArrowLeft,
  IconCheck,
  IconCopy,
  IconSpinner,
  IconTrash,
  IconX,
} from "../../src/components/icons";
import { FormStatus } from "../../src/types/common";
import {
  callApiActiveMasterService,
  callApiDeactiveMasterService,
  callApiUpdateMasterService,
} from "../api/masterServiceManagement";
import { CommonLoading } from "./CommonLoading";
import { ServiceCycleTable } from "./form-master-service/ServiceCycleTable";
import { ServiceInformation } from "./form-master-service/ServiceInformation";
import { toast } from "react-toastify";

type Props = {
  onSubmitted: () => void;
  onCancelModal: () => void;
  serviceStep: ServiceStep[];
  serviceCycle?: ServiceCycle[];
  name: string;
  enable: boolean;
  serviceId: number;
  serviceDescription: string;
  appliedCompanyType: string;
  appliedNation: string;
  serviceType: string;
  serviceName: string;
};

export const ContentInfoContainer = styled("div")(() => ({
  paddingX: 0,
  paddingY: 10,
  position: "relative",
  display: "flex",
  alignItems: "center",
  paddingBottom: 10,
  gap: 10,
  fontWeight: 500,
}));

export type ContentInfoProps = {
  index: number;
  stepIndex: number;
  content: string;
  onRemoveItem: (stepIndex: number, index: number) => void;
  onChangeItem: (stepIndex: number, index: number, value: string) => void;
};

export function ContentInfoItem(props: ContentInfoProps) {
  const onRemoveItem = () => props.onRemoveItem(props.stepIndex, props.index);
  const onChangeItem = (value: string) =>
    props.onChangeItem(props.stepIndex, props.index, value);
  return (
    <ContentInfoContainer>
      <label>{`${props.index}. `}</label>
      <FormFieldText
        value={props.content}
        onChange={onChangeItem}
        id={"result"}
        validateCaller={{}}
      />
      <div className="absolute right-0 top-3 pr-2 justify-right">
        <button onClick={onRemoveItem}>
          <IconX />
        </button>
      </div>
    </ContentInfoContainer>
  );
}

export type ContentHeaderProps = {
  content: string;
  index: number;
  onAdd: (stepNumber: number, index: number) => void;
  stepIndex: number;
};

export function ContentHeader(props: ContentHeaderProps) {
  return (
    <Box>
      <div className="relative">
        <label className={"font-bold"}>{props?.content}</label>
        <div className="absolute right-0 top-0">
          <button onClick={() => props.onAdd(props?.stepIndex, props?.index)}>
            <IconAddSquare />
          </button>
        </div>
      </div>
    </Box>
  );
}

export type ContentInfoListProps = {
  title: string;
  index: number;
  infos: ContentInfoProps[];
  stepIndex: number;
  onAddItem: (stepIndex: number, id: number) => void;
  onRemoveItem: (stepIndex: number, id: number) => void;
  onChangeItem: (stepIndex: number, id: number, value: string) => void;
};

export function ContentInfoList(props: ContentInfoListProps) {
  return (
    <Paper>
      <Box className={"px-2 min-w-[300px] relative py-2"}>
        <ContentHeader
          index={props?.index}
          content={props?.title}
          stepIndex={props?.stepIndex}
          onAdd={props?.onAddItem}
        ></ContentHeader>

        {props.infos?.map((info, index) => (
          <ContentInfoItem
            key={info.index}
            index={index}
            stepIndex={props.stepIndex}
            content={info.content}
            onRemoveItem={props?.onRemoveItem}
            onChangeItem={props?.onChangeItem}
          ></ContentInfoItem>
        ))}
      </Box>
    </Paper>
  );
}

export type ServiceStepDisplayProps = {
  serviceStep: ServiceStep[];
  onUpdateServiceStep: (value: ServiceStep[]) => void;
};

export type ServiceStepItemProps = {
  onAddResult: (stepIndex: number, resultId: number) => void;
  onRemoveResult: (stepIndex: number, resultId: number) => void;
  onAddDocumentRequire: (stepIndex: number, resultId: number) => void;
  onRemoveDocumentRequire: (stepIndex: number, documentId: number) => void;
  onChangeDocumentItem: (
    stepIndex: number,
    documentId: number,
    value: string
  ) => void;
  onChangeResultItem: (
    stepIndex: number,
    documentId: number,
    value: string
  ) => void;
  onChangeStepContent: (
    stepIndex: number,
    name: keyof ServiceStep,
    value: string
  ) => void;
  onAddNewItem: () => void;
  onDeleteItem: (id: number) => void;
  onDuplicateItem: (id: number) => void;
  step: ServiceStep;
  index: number;
  disableDelete: boolean;
};

export function ServiceStepItem(props: ServiceStepItemProps) {
  const onChangeStepValue = (value: string, name: keyof ServiceStep) => {
    if (props?.onChangeStepContent) {
      props?.onChangeStepContent(props?.index, name, value);
    }
  };
  const onDeleteItem = () => props.onDeleteItem(props.index);
  const onDuplicateItem = () => props.onDuplicateItem(props.index);
  return (
    <div
      className={
        "flex space-x-10 items-center justify-right bg-zinc-50 mb-2 py-10"
      }
    >
      <p className="font-bold text-2xl pl-2">{props?.index + 1}</p>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <FormFieldText
            id={"name"}
            label={"name"}
            value={props?.step?.name}
            onChange={(v) => onChangeStepValue(v, "name")}
            validateCaller={{}}
          />
        </Grid>
        <Grid item md={6}>
          <FormFieldText
            id={"estimatedCompletionTime"}
            label={"estimatedCompletionTime"}
            value={props?.step.estimatedCompletionTime}
            onChange={(v) => onChangeStepValue(v, "estimatedCompletionTime")}
            validateCaller={{}}
          />
        </Grid>
        <Grid item md={12}>
          <FormFieldText
            id={"description"}
            label={"description"}
            value={props?.step.description}
            onChange={(v) => onChangeStepValue(v, "description")}
            validateCaller={{}}
          />
        </Grid>
      </Grid>
      <Grid md={3}>
        <ContentInfoList
          stepIndex={props?.index}
          index={0}
          title="Document Required"
          infos={
            props?.step?.documentRequired.map((doc, docIndex) => ({
              content: doc.documentRequired,
              onRemoveItem: props?.onRemoveDocumentRequire,
              index: docIndex,
              id: doc.id,
            })) as unknown as ContentInfoProps[]
          }
          onAddItem={props?.onAddDocumentRequire}
          onRemoveItem={props?.onRemoveDocumentRequire}
          onChangeItem={props?.onChangeDocumentItem}
        />
      </Grid>
      <ContentInfoList
        stepIndex={props?.index}
        index={0}
        title="Result"
        infos={
          props?.step?.result.map((rs, rsIndex) => ({
            content: rs.result,
            onRemoveItem: props?.onRemoveResult,
            index: rsIndex,
          })) as ContentInfoProps[]
        }
        onAddItem={props?.onAddResult}
        onRemoveItem={props?.onRemoveResult}
        onChangeItem={props?.onChangeResultItem}
      />
      <Box>
        <button onClick={props.onAddNewItem} className="mb-4">
          <IconAddSquareOutLine />
        </button>
        <button onClick={onDuplicateItem} className="mb-4">
          <IconCopy />
        </button>
        <button
          onClick={onDeleteItem}
          className={`mb-4 ${props.disableDelete && "disable"}`}
        >
          <IconTrash />
        </button>
      </Box>
    </div>
  );
}

export function ServiceStepDisplay(props: ServiceStepDisplayProps) {
  const [stepDataList, setStepDateList] = React.useState(
    (props?.serviceStep ?? []) as ServiceStep[]
  );

  const onAddDocumentRequire = React.useCallback(
    (stepIndex: number, index: number) => {
      setStepDateList((stepDataList) =>
        stepDataList?.map((step, index) => {
          if (index === stepIndex) {
            return {
              ...step,
              documentRequired: [
                ...step.documentRequired,
                {
                  id: step.documentRequired.length,
                  documentRequired: "document",
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
      setStepDateList((stepDataList) =>
        stepDataList?.map((step, index) => {
          if (index === stepIndex) {
            return {
              ...step,
              result: [
                ...step.result,
                { id: step.result.length, result: "result" },
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
      setStepDateList((stepDataList) =>
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
      setStepDateList((stepDataList) =>
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
      setStepDateList((stepDataList) =>
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
      setStepDateList((stepDataList) =>
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

  const onChangeStepContent = React.useCallback(
    (stepIndex: number, name: keyof ServiceStep, value: string) => {
      setStepDateList((stepDataList) =>
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
    setStepDateList([
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
    (id: number) => {
      setStepDateList((stepDataList) =>
        stepDataList?.filter((item, sid) => sid !== id)
      );
    },
    [stepDataList]
  );

  const onDuplicateItem = React.useCallback(
    (id: number) => {
      const newItem = stepDataList?.find((item, sid) => sid === id);

      if (newItem) {
        setStepDateList([...stepDataList, newItem]);
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
            disableDelete={Boolean(stepDataList.length > 0)}
          ></ServiceStepItem>
        </div>
      ))}
    </Box>
  );
}

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
                className="bg-primary text-white rounded-xl px-4 py-2"
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
    appliedNation: [props?.appliedNation],
    enable: props.enable ?? false,
    serviceName: props.serviceName ?? "",
    serviceType: props.serviceType ?? "",
    serviceStep: props.serviceStep,
    serviceCycle: props.serviceCycle,
    appliedCompanyType: [props?.appliedCompanyType],
  } as unknown as ApiMasterServiceParam & { enable: boolean });
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
      setBody({ ...body, [name]: value });
      onRecallValidate({ ...body, [name]: value });
    },
    [body]
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
        callApiDeactiveMasterService({ enable: 0 }, props.serviceId)
          .then(() => {
            toast.success(translation.t("Deactive service successfully"));
          })
          .finally(() => {
            setLoading(false);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            props.onSubmitted();
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
        callApiActiveMasterService(
          {
            enable: 1,
          },
          props.serviceId
        )
          .then(() => {
            toast.success(translation.t("Active service successfully"));
          })
          .finally(() => {
            props.onSubmitted();
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            setLoading(false);
          });
        setIsSubmitted(true);
        setStatus("success");
      } catch (e: unknown) {
        setStatus("failure");
        setErrorMessage(e?.toString());
        console.error(e);
      }
    }
    onHide();
  }, [props.enable]);

  async function onSubmitUpdate() {
    setLoading(true);
    setIsSubmitted(true);
    try {
      setStatus("requesting");
      const updateMasterServiceBody: UpdateMasterServiceBody = {
        serviceDescription: body.serviceDescription,
        appliedNation: body.appliedNation,
        serviceName: body.serviceName ?? [],
        serviceType: body.serviceType ?? [],
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
      callApiUpdateMasterService(updateMasterServiceBody, props.serviceId)
        .then((response) => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          toast.success("Update service successfully");
          props.onCancelModal();
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
      console.log(id, value);
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
      <CommonLoading loading={loading} />
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
              id={props.serviceId}
              enable={props.enable}
            ></ActionButton>
          </Grid>
        </Grid>
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
        ></ServiceStepDisplay>
        <div className={"text-lg font-bold"}>
          {translation.t("masterService.serviceCycleAndFee")}
        </div>
        <ServiceCycleTable
          serviceCycle={(body.serviceCycle ?? []) as ServiceCycle[]}
          onUpdateServiceCycleFee={onUpdateServiceCycleFee}
          onRemoveServiceCycleFee={onRemoveServiceCycleFee}
          onAddMoreServiceSCycleFee={onAddMoreServiceSCycleFee}
        />

        {/* Input form */}
        <div className={"w-full flex justify-center items-center font-bold"}>
          <Grid container>
            <Grid md={6}>
              <button
                onClick={onClickActiveAction}
                className={`px-4 py-2 flex justify-center items-center gap-2 bg-red-500 text-white font-semibold rounded-lg ${
                  !props.enable && "disabled disabled:opacity-50"
                }`}
                disabled={!props.enable}
              >
                {translation.t("masterService.deactivate")}
                {status === "requesting" && <IconSpinner />}
              </button>
            </Grid>
            <Grid md={6}>
              <div className="w-full flex items-right justify-end ">
                <button
                  onClick={onSubmitAction}
                  className="px-4 py-2 flex justify-right items-center gap-2 bg-primary text-white font-semibold rounded-lg"
                >
                  {props?.enable
                    ? translation.t("masterService.update")
                    : translation.t("masterService.activate")}
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
