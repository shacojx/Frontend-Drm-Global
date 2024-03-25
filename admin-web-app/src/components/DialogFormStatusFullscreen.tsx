import { JSX } from "react";
import { useTranslation } from "react-i18next";
import { DialogContainer } from "./DialogContainer";
import { IconSpinner, IconSuccess, IconXCircle } from "./icons";

export function DialogRequestingFullscreen() {
  return <DialogContainer isTransparent>
    <div className="w-full justify-center items-center py-8 px-4 flex flex-col">
        <IconSpinner className={"w-40 h-40 text-surface"} />
    </div>
  </DialogContainer>
}

type Props = Partial<{
  title: string,
  subTitle: string,
  actionElement: JSX.Element,
  onClose: () => void
}>

export function DialogSuccessFullscreen(props: Props) {
  const translation = useTranslation()
  return <DialogContainer isAutoSize isCloseOnClickOverlay handleClickOverlay={props.onClose}>
    <div className="w-full max-w-[400px] justify-center items-center py-8 px-4 flex flex-col">
      <div className="w-full mx-4 flex justify-center items-center flex-col gap-y-8">
        <IconSuccess className={"w-40 h-40"}/>
        <div className={"space-y-2"}>
          {props.title && <p className={"text-h4 text-center"}>{translation.t(props.title)}</p>}
          {props.subTitle && <p className={"text-cSm text-center"}>{translation.t(props.subTitle)}</p>}
        </div>
        {props.actionElement}
      </div>
    </div>
  </DialogContainer>
}

export function DialogFailureFullscreen(props: Props) {
  const translation = useTranslation()
  return <DialogContainer isAutoSize isCloseOnClickOverlay>
    <div className="w-full max-w-[400px] justify-center items-center py-8 px-4 flex flex-col">
      <div className="w-full mx-4 flex justify-center items-center flex-col gap-y-8">
        <IconXCircle className={"w-40 h-40 text-danger"}/>
        <div className={"space-y-2"}>
          {props.title && <p className={"text-h4 text-center"}>{translation.t(props.title)}</p>}
          {props.subTitle && <p className={"text-cSm text-center"}>{translation.t(props.subTitle)}</p>}
        </div>
        {props.actionElement}
      </div>
    </div>
  </DialogContainer>
}

type ConfirmProps = {
  title: string,
  content: string,
  onCancel: () => void,
  onConfirm: () => void,
  onClose: () => void,
}
export function DialogConfirmFullScreen(props: ConfirmProps) {
  const translation = useTranslation()

  function handleClickCancel() {
    props.onCancel()
  }

  const handleClickConfirm = () => {
    console.log("Handle confirm")
    props.onConfirm()
  }

  return <DialogContainer isAutoSize isCloseOnClickOverlay handleClickOverlay={props.onClose}>
    <div className="w-full max-w-[400px] justify-center items-center py-8 px-4 flex flex-col">
      <div className="w-full mx-4 flex justify-center items-center flex-col gap-y-8">
        <div className={"space-y-2"}>
          {props.title && <p className={"text-h4 text-center"}>{translation.t(props.title)}</p>}
          {props.content && <p className={"text-cSm text-center"}>{translation.t(props.content)}</p>}
        </div>
        <div className={"flex flex-row gap-4"}>
          <button
            className="px-4 py-2 flex justify-center items-center gap-2 bg-gray-400 text-white font-semibold rounded-lg"
            onClick={handleClickCancel}
          >
            <span>{translation.t('Cancel')}</span>
          </button>
          <button
            className="px-4 py-2 flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
            onClick={handleClickConfirm}
          >
            <span>{translation.t('Confirm')}</span>
          </button>
        </div>
      </div>
    </div>
  </DialogContainer>
}
