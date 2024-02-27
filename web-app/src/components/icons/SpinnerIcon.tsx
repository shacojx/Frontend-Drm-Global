import React from "react";
import { ReactComponent as Icon } from '../../assets/svgs/Spinner.svg';

type Props = React.SVGProps<SVGSVGElement>
export function SpinnerIcon(props: Props) {
  return <Icon {...props} className={`animate-spin ${props.className}`} />
}


