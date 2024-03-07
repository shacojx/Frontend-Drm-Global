import { ChangeEvent, EventHandler, KeyboardEventHandler, useState } from "react";
import { useTranslation } from "react-i18next";
import { useValidate } from "../hooks-ui/useValidateCaller";
import { validateApiPassword } from "../services-business/api/validateApiParam";
import { FormFieldProps, ValidateFunction } from "../types/common";
import { IconEyesClosed, IconEyesOpen } from "./icons";

const validatePassword: ValidateFunction<string> = function (isRequired, pass) {
  if (!isRequired) {
    return true
  }
  if (!pass) {
    return false
  }
  return validateApiPassword(pass)
}

type Props = FormFieldProps<string> & Partial<{
  onEnter: () => void
}>

export function FormFieldPassword(props: Props) {
  const translation = useTranslation()
  const [isDisplayPass, setIsDisplayPass] = useState<boolean>(false)
  const [shouldShowError, setShouldShowError] = useValidate<string>(
    props.id,
    props.isRequired,
    props.value,
    props.validateCaller,
    validatePassword
  )

  function handleChangePassword(event: ChangeEvent<HTMLInputElement>) {
    const pass = event.target.value
    props.onChange(pass)
  }

  function handleClickOpenIcon() {
    setIsDisplayPass(true)
  }

  function handleClickClosedIcon() {
    setIsDisplayPass(false)
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = function (event) {
    if (event.key === 'Enter') {
      props.onEnter?.()
    }
  }


  const statusClassName = shouldShowError ? 'border-danger bg-red-50' : 'bg-white'
  return <div className="flex flex-col gap-2">
    <p className="text-cBase font-bold space-x-1">
      <span>{translation.t(props.label || 'Password')}</span>
      {props.isRequired && <span className="text-danger">*</span>}
    </p>
    <div className="relative">
      <input
        type={isDisplayPass ? 'text' : 'password'}
        placeholder={props.placeholder}
        value={props.value}
        onChange={handleChangePassword}
        onFocus={setShouldShowError.bind(undefined, false)}
        onBlur={setShouldShowError.bind(undefined, !validatePassword(props.isRequired, props.value))}
        onKeyDown={props.onEnter && handleKeyDown}
        className={"w-full h-[40px] border py-1 px-2 rounded-lg " + statusClassName}
      />
      {isDisplayPass
        ? <IconEyesClosed onClick={handleClickClosedIcon} className="h-[18px] absolute top-[11px] right-[11px] text-gray-400" />
        : <IconEyesOpen onClick={handleClickOpenIcon} className="h-[18px] absolute top-[11px] right-[11px] text-gray-400" />
      }
    </div>
  </div>
}
