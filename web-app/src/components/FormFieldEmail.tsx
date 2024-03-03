import React, { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { validateApiEmail } from "../services-business/api/validateApiParam";
import { FormFieldProps } from "../types/common";

export function FormFieldEmail(props: FormFieldProps<string>) {
  const [shouldShowError, setShouldShowError] = useState<boolean>(false)

  const translation = useTranslation()

  useEffect(() => {
    function validateHook() {
      const isValid = (!props.isRequired && !props.value)
        || (!!props.value && validateApiEmail(props.value))
      setShouldShowError(!isValid)
      return isValid
    }
    props.validateCaller[props.id] = validateHook
  }, [props.isRequired, props.value]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const email = event.target.value
    props.onChange(email)
    setShouldShowError(!validateApiEmail(email))
  }

  const statusClassName = shouldShowError ? 'border-danger bg-red-50' : 'bg-white'
  return <div className="flex flex-col gap-2">
    <p className="flex text-cBase font-bold gap-1">
      <span>{translation.t('Email address')}</span>
      {props.isRequired && <span className="text-danger">*</span>}
    </p>
    <input
      type="email"
      value={props.value || ''}
      onChange={handleChange}
      onFocus={setShouldShowError.bind(undefined, false)}
      placeholder="Example@hotmail.com"
      className={"w-full h-[40px] border py-1 px-2 rounded-lg " + statusClassName}
    />
  </div>
}
