import { useContext } from "react";
import { LLCMyServiceContext } from "../../context/llcMyServiceContext";
import { ServiceStatusType } from "../../types/my-service.type";
import { IconCheck } from "../../../../components/icons";
import { cn } from "../../../../utils/cn.util";
import { MyServiceStepType } from "../../../../api/types";

type Props = {
  item: MyServiceStepType;
};

export default function StepService({ item }: Props) {

    const { setDetailFilling } = useContext(LLCMyServiceContext);


  const onClickStep = (item: MyServiceStepType) => {
    console.log('item: ', item);
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
                "bg-[#CCCCCC] ": item.statusStep === ServiceStatusType.Pending,
              },
              {
                "bg-[#FF5722]/25": item.statusStep === ServiceStatusType.InProgress,
              },
              {
                "bg-success": item.statusStep === ServiceStatusType.Issued,
              }
            )}
          >
            <IconCheck className="w-3 h-3" />
          </div>
        </div>
        <div className="flex-1">
          <div className="">{item.stepName}</div>
          <div className="text-sm text-[#A0AEC0]">{item.estimatedCompletionTime}</div>
        </div>
      </div>
    </div>
  );
}
