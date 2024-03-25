import {
  Status,
  StatusBackgroundClassNameMap,
  StatusDotClassNameMap,
  StatusTextClassNameMap,
} from '../constants/StatusBadge';

type Props = {
  status: Status;
  showDot?: boolean;
};

export function StatusBadge(props: Props) {
  return (
    <div
      className={`flex gap-2 items-center py-2 px-3 rounded-xl font-bold ${StatusBackgroundClassNameMap[props.status]}`}
    >
      {props.showDot && (
        <div
          className={
            'w-[20px] h-[20px] rounded-full ' +
            StatusDotClassNameMap[props.status]
          }
        ></div>
      )}
      <span className={StatusTextClassNameMap[props.status]}>
        {props.status}
      </span>
    </div>
  );
}
