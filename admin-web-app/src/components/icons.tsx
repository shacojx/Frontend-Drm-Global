import React from "react";
import { ReactComponent as IconCheck } from '../assets/svgs/Check.svg';
import { ReactComponent as IconEyesClosed } from '../assets/svgs/EyesClosed.svg';
import { ReactComponent as IconEyesOpen } from '../assets/svgs/EyesOpen.svg';
import { ReactComponent as SvgSpinner } from '../assets/svgs/Spinner.svg';
import { ReactComponent as IconAltArrowDown } from '../assets/svgs/AltArrowDown.svg';
import { ReactComponent as IconArrowLeft } from '../assets/svgs/ArrowLeft.svg';
import { ReactComponent as IconAddCircle } from '../assets/svgs/AddCircle.svg';
import { ReactComponent as IconXCircle } from '../assets/svgs/XCircle.svg';
import { ReactComponent as IconSuccess } from '../assets/svgs/SuccessIcon.svg';
import { ReactComponent as IconCheckCircle } from '../assets/svgs/CheckCircleIcon.svg';
import { ReactComponent as IconCollapse } from '../assets/svgs/CollapseIcon.svg';
import { ReactComponent as IconAccountCircle } from '../assets/svgs/AccountCircleIcon.svg';
import { ReactComponent as IconMyService } from '../assets/svgs/MyServiceIcon.svg';
import { ReactComponent as IconService } from '../assets/svgs/ServiceIcon.svg';
import { ReactComponent as IconX } from '../assets/svgs/X.svg';
import { ReactComponent as IconThreeLines } from '../assets/svgs/ThreeLines.svg';
import { ReactComponent as IconUser } from '../assets/svgs/UserIcon.svg';
import { ReactComponent as IconLogout } from '../assets/svgs/LogoutIcon.svg';
import { ReactComponent as IconSelectCard } from '../assets/svgs/SelectCardIcon.svg';
import { ReactComponent as IconMyCompany } from '../assets/svgs/MyCompany.svg';
import { ReactComponent as IconDangerCircle } from '../assets/svgs/DangerCircleIcon.svg';
import { ReactComponent as IconRefreshCircle } from '../assets/svgs/RefreshCircle.svg';
import { ReactComponent as IconUploadFile } from '../assets/svgs/UploadFile.svg';
import { ReactComponent as IconCamera } from '../assets/svgs/Camera.svg';
import { ReactComponent as IconUpload } from '../assets/svgs/Upload.svg';
import { ReactComponent as IconInfoCircle } from '../assets/svgs/InfoCircle.svg';
import { ReactComponent as IconFaceScan } from '../assets/svgs/FaceScan.svg';
import { ReactComponent as IconSetting } from '../assets/svgs/Setting.svg';
import { ReactComponent as IconSupportPhone } from '../assets/svgs/SupportPhone.svg';
import { ReactComponent as IconCopy } from '../assets/svgs/Copy.svg';
import { ReactComponent as IconAddSquare } from '../assets/svgs/AddSquare.svg';
import { ReactComponent as IconTrash } from '../assets/svgs/Trash Bin Minimalistic 2.svg';
import { ReactComponent as IconAddSquareOutLine } from '../assets/svgs/AddSquareOutLine.svg';
import { ReactComponent as IconReload } from '../assets/svgs/Restart.svg';
import { ReactComponent as IconFilter } from '../assets/svgs/Filter.svg';
import { ReactComponent as IconEdit } from '../assets/svgs/Document Add.svg';
import { ReactComponent as IconPen } from '../assets/svgs/Pen.svg';


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
  IconArrowLeft,
  IconAddCircle,
  IconXCircle,
  IconSuccess,
  IconCheckCircle,
  IconCollapse,
  IconAccountCircle,
  IconMyService,
  IconService,
  IconX,
  IconThreeLines,
  IconUser,
  IconLogout,
  IconSelectCard,
  IconMyCompany,
  IconDangerCircle,
  IconRefreshCircle,
  IconUploadFile,
  IconCamera,
  IconUpload,
  IconInfoCircle,
  IconFaceScan,
  IconSetting,
  IconSupportPhone,
  IconCopy,
  IconAddSquare,
  IconTrash,
  IconAddSquareOutLine,
  IconReload,
  IconFilter,
  IconEdit,
  IconPen
}
