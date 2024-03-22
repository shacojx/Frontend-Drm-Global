import { useTranslation } from "react-i18next";
import IMAGE from "../../../../assets/images";

export default function NotFoundService() {
  const { t } = useTranslation();

  return (
    <>
      <div className="mt-md flex flex-col justify-center items-center h-[368px]">
        <div>
          <img src={IMAGE.NotFound} />
        </div>
        <div className="text-lg font-bold mt-[10px]">
          {t("It's empty here")}
        </div>
        <div className="mt-[10px]">
          {t("We will notify when the service is ready!")}
        </div>
      </div>
    </>
  );
}
