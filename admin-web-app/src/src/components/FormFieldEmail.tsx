import React, { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useValidate } from "../hooks-ui/useValidateCaller";
import { validateApiEmail, validateApiPassword } from "../services-business/api/validateApiParam";
import { FormFieldProps, ValidateFunction } from "../types/common";

const validateEmail: ValidateFunction<string> = function (isRequired, email) {
  if (!isRequired) {
    return true
  }
  if (!email) {
    return false
  }
  return validateApiEmail(email)
}

export function FormFieldEmail(props: FormFieldProps<string>) {
  const translation = useTranslation()
  const [shouldShowError, setShouldShowError] = useValidate(
    props.id,
    props.isRequired,
    props.value,
    props.validateCaller,
    validateEmail
  )

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const email = event.target.value
    props.onChange(email)
  }

  const statusClassName = (shouldShowError ? 'border-danger bg-red-50' : 'bg-white') + (props.isFixedValue ? ' bg-gray-200' : '')
  return <div className="flex flex-col gap-2">
    <p className="flex text-cBase font-bold gap-1">
      <span>{translation.t('Email address')}</span>
      {props.isRequired && <span className="text-danger">*</span>}
    </p>
    <input
      disabled={props.isFixedValue}
      type="email"
      value={props.value || ''}
      onChange={handleChange}
      onFocus={setShouldShowError.bind(undefined, false)}
      onBlur={setShouldShowError.bind(undefined, !validateEmail(props.isRequired, props.value))}
      placeholder="Example@hotmail.com"
      className={"w-full h-[40px] border py-1 px-2 rounded-lg " + statusClassName}
    />
  </div>
}
