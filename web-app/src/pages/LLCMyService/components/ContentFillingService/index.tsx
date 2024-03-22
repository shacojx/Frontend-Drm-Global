import { UploadedDocumentType } from "../../../../api/types";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { LLCMyServiceContext } from "../../context/llcMyServiceContext";
import TitleContent from "../../../../components/TitleContent";
import TagService from "../TagService";
import { ServiceType } from "../../types/my-service.type";
import NotFoundService from "../NotFoundService";
import { DiplomaVerifiedIcon, NotificationUnreadLinesIcon } from "../../../../components/icons";
import InputFile from "../../../../components/InputFile";
import { cn } from "../../../../utils/cn.util";

export default function ContentFillingService() {
  const { t } = useTranslation();
  const [file, setFile] = useState<File>();

  const { detailFilling } = useContext(LLCMyServiceContext);

  const handleChangeFile = (file?: File) => {
    setFile(file);
  };

  const onDownloadServiceUpload = (item: UploadedDocumentType) => {
    console.log("item: ", item);
    // download file
  };

  return (
    <>
      {detailFilling && (
        <div className="border border-primary_25 rounded-xl py-lg px-xl flex-grow">
          <div className="flex justify-between flex-grow mb-md">
            <TitleContent label={detailFilling.name} />
            <div>
              <TagService status={detailFilling.status as ServiceType} />
            </div>
          </div>
          {detailFilling.status === ServiceType.Pending && <NotFoundService />}
          {detailFilling.status !== ServiceType.Pending && (
            <>
              <div className="">
                <div className="flex items-start py-md">
                  <DiplomaVerifiedIcon className="mr-4 self-center" />
                  <div className="flex-1">
                    <div>{detailFilling?.detail?.step_description}</div>
                  </div>
                </div>
              </div>
              <div className="mt-rootRootPadding">
                <div className="flex items-start border border-primary_25 bg-primary/10 p-md rounded-lg">
                  <NotificationUnreadLinesIcon className="mr-4 self-center" />
                  <div className="flex-1">
                    <div>{detailFilling?.detail?.remark}</div>
                  </div>
                </div>
              </div>
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
                    <div className="px-md text-[#3B3F48]/85 text-center">
                      {
                        detailFilling?.detail?.customer_document
                          ?.required_document
                      }
                    </div>
                    <div
                      className={cn("px-md text-center flex justify-center")}
                    >
                      <InputFile
                        label={t("Upload")}
                        onChange={handleChangeFile}
                        file={file}
                        disabled={
                          detailFilling?.detail?.customer_document
                            ?.required_document === "none"
                        }
                      />
                    </div>
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
                    <div className="text-[#3B3F48]/85 px-md text-center">
                      {detailFilling.status === ServiceType.Issued &&
                        detailFilling.detail?.service_document
                          .required_document}
                    </div>
                    <div className="px-md text-center">
                      {detailFilling.status === ServiceType.Issued &&
                        detailFilling.detail?.service_document.uploaded_document.map(
                          (item, index) => (
                            <div>
                              <a
                                href="#"
                                className="text-primary font-bold hover:underline"
                                onClick={() => onDownloadServiceUpload(item)}
                              >
                                {index + 1}. {item.name}
                              </a>
                            </div>
                          )
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
