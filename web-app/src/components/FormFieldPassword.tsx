import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormFieldBaseHandler } from "../hooks-ui/useFormFieldBaseHandler";
import { validateApiPassword } from "../services-business/api/validateApiParam";
import { IconEyesClosed, IconEyesOpen } from "./icons";

type Props = {
  onChange: (value: string) => void
} & Partial<{
  value: string,
}>

export function FormFieldPassword(props: Props) {
  const translation = useTranslation()
  const {
    isChanged,
    isFocus,
    handleChange,
    handleFocus,
    handleBlur
  } = useFormFieldBaseHandler(props.onChange)

  const [isDisplayPass, setIsDisplayPass] = useState<boolean>(false)

  function handleClickOpenIcon() {
    setIsDisplayPass(true)
  }

  function handleClickClosedIcon() {
    setIsDisplayPass(false)
  }

  const isError = !isFocus && isChanged && (!props.value || !validateApiPassword(props.value))
  const statusClassName = isError ? 'border-danger bg-red-50' : ''
  return <div className="flex flex-col gap-2">
    <p className="text-cBase font-bold">{translation.t('Password')}</p>
    <div className="relative">
      <input
        type={isDisplayPass ? 'text' : 'password'}
        value={props.value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Example@hotmail.com"
        className={"w-full h-[40px] border py-1 px-2 rounded-lg " + statusClassName}
      />
      {isDisplayPass
        ? <IconEyesClosed onClick={handleClickClosedIcon} className="h-[18px] absolute top-[11px] right-[11px] text-gray-400" />
        : <IconEyesOpen onClick={handleClickOpenIcon} className="h-[18px] absolute top-[11px] right-[11px] text-gray-400" />
      }
    </div>
  </div>
}
