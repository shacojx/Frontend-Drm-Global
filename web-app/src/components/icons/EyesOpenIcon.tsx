import React from "react";
import { ReactComponent as Icon } from '../../assets/svgs/EyesOpen.svg';

type Props = React.SVGProps<SVGSVGElement>
export function EyesOpenIcon(props: Props) {
  return <Icon {...props} />
}
