import { Fragment, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getFile, uploadAvatar } from "src/api/upload";
import { UploadedDocumentType } from "../../../../api/types";
import InputFile from "../../../../components/InputFile";
import TitleContent from "../../../../components/TitleContent";
import {
  DiplomaVerifiedIcon,
  NotificationUnreadLinesIcon,
} from "../../../../components/icons";
import { LLCMyServiceContext } from "../../context/llcMyServiceContext";
import { NONE_REQUIRED, ServiceStatusType } from "../../types/my-service.type";
import NotFoundService from "../NotFoundService";
import TagService from "../TagService";
import { useApiLLCServiceUploadDocument } from "src/hooks-api/useLlcService";
import { DialogFailureFullscreen } from "src/components/DialogFormStatusFullscreen";
import { toast } from "react-toastify";

export default function ContentFillingService() {
  const { t } = useTranslation();
  const [file, setFile] = useState<File[]>([]);

  const { detailFilling } = useContext(LLCMyServiceContext);

  useEffect(() => {
    detailFilling?.customerDocument?.forEach((fileRes) => {
      if (fileRes.fileDocument){
        let file = {
          ...fileRes,
          name: fileRes.fileDocument,
        };
        setFile((pre) => {
          let newArr: File[] = [...pre];
          // @ts-ignore
          newArr[fileRes.id] = file;
          return newArr;
        });
      }
    });
  }, [detailFilling]);

  const mutateUploadFile = useApiLLCServiceUploadDocument();
  const [visibleError, setVisibleError] = useState(false);
  const [contentError, setContentError] = useState<any>("");

  // @ts-ignore
  const handleChangeFile = async (file?: File, id: number) => {
    if (!file) {
      setFile((pre) => {
        let newArr: File[] = [...pre];
        // @ts-ignore
        newArr[id] = file;
        return newArr;
      });
      return;
    }
    const formData = new FormData();
    // @ts-ignore
    formData.append("files", file);
    // @ts-ignore
    formData.append("id", id);
    try {
      const res = await mutateUploadFile.mutateAsync(formData);
      if (res) {
        toast.success(t("Update file successfully"));
        setFile((pre) => {
          let newArr: File[] = [...pre];
          // @ts-ignore
          newArr[id] = { name: res?.data?.[0] };
          return newArr;
        });
      }
    } catch (error) {
      toggle();
      setContentError(error);
      console.error("error: ", error);
    }
  };

  const onDownloadServiceUpload = (item: UploadedDocumentType) => {
    try {
      if (item.fileDocument) {
        getFile(item.fileDocument);
      }
    } catch (error) {
      toggle();
      setContentError(error);
      console.error("error: ", error);
    }
  };

  const toggle = () => {
    setVisibleError(!visibleError);
  };

  return (
    <>
      {visibleError && (
        <DialogFailureFullscreen
          title="Failure!"
          subTitle={contentError}
          actionElement={
            <button
              onClick={toggle}
              className="w-full min-w-[300px] h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
            >
              <span>{t("Close")}</span>
            </button>
          }
        />
      )}

      <>
        {detailFilling && (
          <div className="border border-primary_25 rounded-xl py-lg px-xl flex-grow">
            <div className="flex justify-between flex-grow mb-md">
              <TitleContent label={detailFilling.stepName} />
              <div>
                <TagService
                  status={detailFilling.statusStep as ServiceStatusType}
                />
              </div>
            </div>
            {detailFilling.statusStep === ServiceStatusType.Pending && (
              <NotFoundService />
            )}
            {detailFilling.statusStep !== ServiceStatusType.Pending && (
              <>
                {detailFilling?.description && (
                  <div className="">
                    <div className="flex items-start py-md">
                      <DiplomaVerifiedIcon className="mr-4 self-center" />
                      <div className="flex-1">
                        <div>{detailFilling?.description}</div>
                      </div>
                    </div>
                  </div>
                )}

                {detailFilling?.adminRemark && (
                  <div className="mt-rootRootPadding">
                    <div className="flex items-start border border-primary_25 bg-primary/10 p-md rounded-lg">
                      <NotificationUnreadLinesIcon className="mr-4 self-center" />
                      <div className="flex-1">
                        <div>{detailFilling?.adminRemark}</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-rootRootPadding">
                  <div className="text-base font-bold leading-6">
                    {t("Customer document")}
                  </div>
                  <div className="border rounded-md border-primary_25 mt-md">
                    <div className="border-b  border-primary_25 grid grid-cols-2 gap-md items-center py-md">
                      <div className="px-md text-center">
                        {t("Required document")}
                      </div>
                      <div className="px-md text-center">
                        {t("Uploaded document")}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-md items-center py-md">
                      {detailFilling.customerDocument.map((item, index) => (
                        <Fragment key={`customerDocument${item.id}`}>
                          <div className="px-md text-[#3B3F48]/85 text-center">
                            {index + 1}. {item.requiredDocument}
                          </div>
                          <div className="px-md flex justify-center items-center">
                            <InputFile
                              key={`file${item.id}`}
                              label={t("Upload")}
                              onChange={(file) =>
                                handleChangeFile(file, item.id)
                              }
                              file={file[item.id]}
                              disabled={item.requiredDocument === NONE_REQUIRED}
                            />
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-rootRootPadding">
                  <div className="text-base font-bold leading-6">
                    {t("Service Result")}
                  </div>
                  <div className="border rounded-md border-primary_25 mt-md">
                    <div className="border-b  border-primary_25 grid grid-cols-2 gap-md items-center py-md">
                      <div className="px-md text-center">
                        {t("Required document")}
                      </div>
                      <div className="px-md text-center">
                        {t("Uploaded document")}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-md items-center py-md">
                      {detailFilling.result.map((item, index) => (
                        <Fragment key={`result${item.id}`}>
                          <div className="text-[#3B3F48]/85 px-md text-center">
                            {index + 1}. {item.requiredDocument}
                          </div>
                          <div className="px-md text-center">
                            <a
                              href="#"
                              className="text-primary font-bold hover:underline"
                              onClick={() => onDownloadServiceUpload(item)}
                            >
                              {index + 1}. {item.fileDocument}
                            </a>
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </>
    </>
  );
}
