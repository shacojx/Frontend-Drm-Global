import {
  Status,
  StatusBackgroundClassNameMap,
  StatusDotClassNameMap,
  StatusIconMap,
  StatusTextClassNameMap,
} from '../constants/StatusBadge';

type Props = {
  status: Status;
  showDot?: boolean;
  showIcon?: boolean;
};

export function StatusBadge({ status, showDot, showIcon }: Props) {
  return (
    <div
      className={`flex gap-2 items-center py-2 px-3 rounded-xl text-primary ${StatusBackgroundClassNameMap[status]}`}
    >
      {showDot && (
        <div
          className={
            'w-[20px] h-[20px] rounded-full ' + StatusDotClassNameMap[status]
          }
        ></div>
      )}
      {showIcon && <>{StatusIconMap[status]}</>}
      <span className={StatusTextClassNameMap[status]}>{status}</span>
      <div className="hidden bg-pending_text"></div>
    </div>
  );
}
