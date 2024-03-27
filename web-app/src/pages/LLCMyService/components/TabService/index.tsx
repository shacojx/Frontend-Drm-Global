import { ServiceStatusType, TabType } from "../../types/my-service.type";
import { Link } from "react-router-dom";
import { IconCheck } from "../../../../components/icons";
import { cn } from "../../../../utils/cn.util";

type Props = {
  item: TabType;
};

export default function TabService({ item }: Props) {
  return (
    <div className="col-span-6 lg:col-span-3" key={item.id}>
      <div
        className={cn(
          "lg:border relative group hover:shadow  bg-[#F3F5F7] lg:border-primary_25 rounded-xl flex flex-col lg:flex-row items-center justify-center lg:justify-normal gap-4 min-h-[98px] 2xl:gap-6 px-4 py-4 2xl:px-6 2xl:py-6 text-center lg:text-left overflow-hidden",
          {"cursor-pointer": item.clickable}
        )}
        onClick={item.onClick}
      >
        <div>
          <div
            className={cn(
              "inline-flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full ",
              `bg-[${item.color}]/25`
            )}
          >
            {item.icon}
          </div>
        </div>
        <div className="flex-1">
          <div className="font-bold uppercase">{item.header}</div>
          <div className="text-xs text-[#A0AEC0] group-hover:underline line-clamp-2" title={item.detail}>{item.detail}</div>
        </div>
        <div className="absolute top-0 right-0">
          <div
            className={cn(
              "inline-flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-bl-[12px] rounded-tr-[9px] ",
              {
                "bg-primary/15 text-primary_25":
                  item.status === ServiceStatusType.Pending,
              },
              {
                "bg-[#FF5722]/25 text-primary":
                  item.status === ServiceStatusType.InProgress,
              },
              {
                "bg-[#1DD75B]/15 text-primary":
                  [ServiceStatusType.Issued, ServiceStatusType.Approved, ServiceStatusType.Yes, ServiceStatusType.Confirmed].includes(item.status),
              }
            )}
          >
            <IconCheck />
          </div>
        </div>
      </div>
    </div>
  );
}
