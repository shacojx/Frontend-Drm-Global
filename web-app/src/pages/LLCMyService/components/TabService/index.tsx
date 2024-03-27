import { ServiceStatusType, TabType } from "../../types/my-service.type";
import { Link } from "react-router-dom";
import { IconCheck } from "../../../../components/icons";
import { cn } from "../../../../utils/cn.util";

type Props = {
  item: TabType;
};

export default function TabService({ item }: Props) {
  return (
    <div className="col-span-6 md:col-span-3 " key={item.id}>
      <div
        className={cn(
          "md:border relative hover:shadow  bg-[#F3F5F7] md:border-primary_25 rounded-xl flex flex-col md:flex-row justify-center md:justify-normal gap-6 pl-xl py-[1.375rem] text-center md:text-left",
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
          <div className="text-sm text-[#A0AEC0]">{item.deatail}</div>
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
