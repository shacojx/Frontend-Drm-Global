import { ChangeEvent, useState } from "react";
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

export function FormFieldPassword(props: FormFieldProps<string>) {
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
    setShouldShowError(validatePassword(props.isRequired, pass))
  }

  function handleClickOpenIcon() {
    setIsDisplayPass(true)
  }

  function handleClickClosedIcon() {
    setIsDisplayPass(false)
  }

  const statusClassName = shouldShowError ? 'border-danger bg-red-50' : 'bg-white'
  return <div className="flex flex-col gap-2">
    <p className="text-cBase font-bold">{translation.t(props.label || 'Password')}</p>
    <div className="relative">
      <input
        type={isDisplayPass ? 'text' : 'password'}
        value={props.value}
        onChange={handleChangePassword}
        onFocus={setShouldShowError.bind(undefined, false)}
        className={"w-full h-[40px] border py-1 px-2 rounded-lg " + statusClassName}
      />
      {isDisplayPass
        ? <IconEyesClosed onClick={handleClickClosedIcon} className="h-[18px] absolute top-[11px] right-[11px] text-gray-400" />
        : <IconEyesOpen onClick={handleClickOpenIcon} className="h-[18px] absolute top-[11px] right-[11px] text-gray-400" />
      }
    </div>
  </div>
}
