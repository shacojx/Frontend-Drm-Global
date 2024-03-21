import { cn } from "src/utils/cn.util";
import { ServiceType } from "../../types/my-service.type";
import {
  IconCheck,
  IconInfoCircle,
  IconRefreshCircle,
} from "src/components/icons";
import { useTranslation } from "react-i18next";

type Props = { status: ServiceType };

type TagItemType = { color: string; icon: JSX.Element; label: string };

export default function TagService({ status }: Props) {
  const { t } = useTranslation();

  const arrayTag: Record<ServiceType, TagItemType> = {
    [ServiceType.Pending]: {
      color: "bg-[#5D50C6]/15",
      icon: <IconInfoCircle />,
      label: t("Pending"),
    },
    [ServiceType.InProgress]: {
      color: "bg-[#FF5722]/25",
      icon: <IconRefreshCircle />,
      label: t("InProgress"),
    },
    [ServiceType.Issued]: {
      color: "bg-success",
      icon: <IconCheck />,
      label: t("Issued"),
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
