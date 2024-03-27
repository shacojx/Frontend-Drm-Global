import React, { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { callApiVerifyEmail } from "../api/account";
import { useValidate } from "../hooks-ui/useValidateCaller";
import { validateApiEmail, validateApiPassword } from "../services-business/api/validateApiParam";
import { FormFieldProps, ValidateFunction } from "../types/common";
import { IconCheck } from "./icons";
import { cn } from "src/utils/cn.util";

const validateEmail: ValidateFunction<string> = function (isRequired, pass) {
  if (!isRequired) {
    return true
  }
  if (!pass) {
    return false
  }
  return validateApiEmail(pass)
}

export function FormFieldEmail(props: FormFieldProps<string> & {shouldLiveCheck?: boolean; hideSuffix?: boolean}) {
  const translation = useTranslation()
  const [wasRegister, setWasRegister] = useState<boolean>(false)
  const [shouldShowError, setShouldShowError] = useValidate(
    props.id,
    props.isRequired,
    props.value,
    props.validateCaller,
    validateEmail,
    wasRegister
  )

  const [isValidEmail, setIsValidEmail] = useState(false)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setWasRegister(false)
    const email = event.target.value
    props.onChange(email)
  }

  function handleBlur() {
    const isValid = validateEmail(props.isRequired, props.value)
    setShouldShowError(!isValid)
    setIsValidEmail(isValid)

    if (isValid && props.shouldLiveCheck) {
      callApiVerifyEmail(props.value!)
      .then(() => setIsValidEmail(true))
        .catch(() => {
          setWasRegister(true)
          setShouldShowError(true)
          setIsValidEmail(false)
        })
    }
  }

  
  const statusClassName = (shouldShowError ? 'border-danger bg-red-50' : 'bg-white') + (props.isFixedValue ? ' bg-gray-200' : '')

  return <div className="flex flex-col gap-2">
    <p className="flex text-cBase font-bold gap-1">
      <span>{translation.t('Email address')}</span>
      {props.isRequired && <span className="text-danger">*</span>}
    </p>
   <div className={
    cn("flex gap-1 items-center w-full h-[40px] border py-1 px-2 rounded-lg", statusClassName, props.className)
   }>
    <input
        disabled={props.isFixedValue}
        type="email"
        value={props.value || ''}
        onChange={handleChange}
        onFocus={setShouldShowError.bind(undefined, false)}
        onBlur={handleBlur}
        placeholder="Example@hotmail.com"
        className="grow bg-transparent outline-none"
      />
     {isValidEmail && !props.hideSuffix &&  <IconCheck className="text-success" />}
   </div>
    {wasRegister && <p className={"text-xs text-danger"}>{translation.t('The email was registered')}</p>}
  </div>
}
