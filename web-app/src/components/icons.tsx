import React from "react";
import { ReactComponent as IconCheck } from '../assets/svgs/Check.svg';
import { ReactComponent as IconEyesClosed } from '../assets/svgs/EyesClosed.svg';
import { ReactComponent as IconEyesOpen } from '../assets/svgs/EyesOpen.svg';
import { ReactComponent as SvgSpinner } from '../assets/svgs/Spinner.svg';
import { ReactComponent as IconAltArrowDown } from '../assets/svgs/AltArrowDown.svg';
import { ReactComponent as IconArrowLeft } from '../assets/svgs/ArrowLeft.svg';

type Props = React.SVGProps<SVGSVGElement>
function IconSpinner(props: Props) {
  return <SvgSpinner {...props} className={`animate-spin ${props.className}`} />
}

export {
  IconCheck,
  IconEyesClosed,
  IconEyesOpen,
  IconSpinner,
  IconAltArrowDown,
  IconArrowLeft
}
