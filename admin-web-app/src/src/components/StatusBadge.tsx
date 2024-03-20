import { Status } from '../types/status';
import { StatusClassNameMap } from '../constants/StatusBadge';

type Props = {
  status: Status;
};

export function StatusBadge(props: Props) {
  return (
    <>
      <div
        className={`py-2 px-3 rounded-xl font-bold ${StatusClassNameMap[props.status]}`}
      >
        {props.status}
      </div>
    </>
  );
}
