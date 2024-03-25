import { ServiceStatusType } from "../../types/my-service.type";
import { useTranslation } from "react-i18next";
import { IconCheck, IconInfoCircle, IconRefreshCircle } from "../../../../components/icons";
import { cn } from "../../../../utils/cn.util";

type Props = { status: ServiceStatusType };

type TagItemType = { color: string; icon: JSX.Element; label: string };

export default function TagService({ status }: Props) {
  const { t } = useTranslation();

  const arrayTag: Record<ServiceStatusType, TagItemType> = {
    [ServiceStatusType.Pending]: {
      color: "bg-[#5D50C6]/15",
      icon: <IconInfoCircle />,
      label: t("Pending"),
    },
    [ServiceStatusType.InProgress]: {
      color: "bg-[#FF5722]/25",
      icon: <IconRefreshCircle />,
      label: t("InProgress"),
    },
    [ServiceStatusType.Issued]: {
      color: "bg-success",
      icon: <IconCheck />,
      label: t("Issued"),
    },
    [ServiceStatusType.Confirmed]: {
      color: "bg-success",
      icon: <IconCheck />,
      label: t("Confirmed"),
    },
    [ServiceStatusType.Approved]: {
      color: "bg-success",
      icon: <IconCheck />,
      label: t("Approved"),
    },
    [ServiceStatusType.Yes]: {
      color: "bg-success",
      icon: <IconCheck />,
      label: t("Yes"),
    },
  };

  const dataTag = arrayTag[status];

  if (!dataTag) {
    // Xử lý trường hợp khi không tìm thấy dữ liệu cho status
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center p-[6px] gap-[6px] rounded-lg",
        dataTag.color
      )}
    >
      <span className="hidden bg-[#5D50C6]/15 bg-[#FF5722]/25 bg-success"></span>
      <div>{dataTag.icon}</div>
      <div>{dataTag.label}</div>
    </div>
  );
}
