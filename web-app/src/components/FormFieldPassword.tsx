import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EyesClosedIcon } from "./icons/EyesClosedIcon";
import { EyesOpenIcon } from "./icons/EyesOpenIcon";

type Props = {}

export function FormFieldPassword(props: Props) {
  const translation = useTranslation()

  const [isDisplayPass, setIsDisplayPass] = useState<boolean>(false)

  function handleClickOpenIcon() {
    setIsDisplayPass(true)
  }

  function handleClickClosedIcon() {
    setIsDisplayPass(false)
  }
  return <div className="flex flex-col gap-2">
    <p className="text-cBase font-bold">{translation.t('Password')}</p>
    <div className="relative">
      <input className="w-full h-[40px] border py-1 px-2 rounded-lg" type={isDisplayPass ? 'text' : 'password'}/>
      {isDisplayPass
        ? <EyesClosedIcon onClick={handleClickClosedIcon} className="h-[18px] absolute top-[11px] right-[11px] text-gray-400" />
        : <EyesOpenIcon onClick={handleClickOpenIcon} className="h-[18px] absolute top-[11px] right-[11px] text-gray-400" />
      }
    </div>
  </div>
}
