import { useContext } from "react";
import { IconCheck } from "src/components/icons";
import { cn } from "src/utils/cn.util";
import { LLCMyServiceContext } from "../../context/llcMyServiceContext";
import { StepType, ServiceType } from "../../types/my-service.type";

type Props = {
  item: StepType;
};

export default function StepService({ item }: Props) {

    const { setDetailFilling } = useContext(LLCMyServiceContext);


  const onClickStep = (item: StepType) => {
      // lấy api thông tin step mới nhất trả ra content
    setDetailFilling(item)
  };
  return (
    <div className=" " key={item.id}>
      <div
        className="border relative hover:shadow cursor-pointer border-primary_25 rounded-xl flex items-center gap-6 pl-xl px-md py-sm "
        onClick={() => onClickStep(item)}
      >
        <div>
          <div
            className={cn(
              "inline-flex items-center text-white justify-center flex-shrink-0 w-5 h-5 rounded-full ",
              {
                "bg-[#CCCCCC] ": item.status === ServiceType.Pending,
              },
              {
                "bg-[#FF5722]/25": item.status === ServiceType.InProgress,
              },
              {
                "bg-success": item.status === ServiceType.Issued,
              }
            )}
          >
            <IconCheck className="w-3 h-3" />
          </div>
        </div>
        <div className="flex-1">
          <div className="">{item.name}</div>
          <div className="text-sm text-[#A0AEC0]">{item.issuingDuration}</div>
        </div>
      </div>
    </div>
  );
}
