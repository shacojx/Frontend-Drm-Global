import React, { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useValidate } from "../hooks-ui/useValidateCaller";
import { validateApiEmail } from "../services-business/api/validateApiParam";
import { FormFieldProps } from "../types/common";

export function FormFieldText(props: FormFieldProps<string>) {
  const translation = useTranslation()
  const [shouldShowError, setShouldShowError] = useValidate(props.id, props.isRequired, props.value, props.validateCaller)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const email = event.target.value
    props.onChange(email)
    setShouldShowError(!validateApiEmail(email))
  }

  const statusClassName = shouldShowError ? 'border-danger bg-red-50' : ''
  return <div className="flex flex-col gap-2">
    {!!props.label && <p className="text-cBase font-bold">{translation.t(props.label)}</p>}
    <input
      type="text"
      value={props.value}
      onChange={handleChange}
      onFocus={setShouldShowError.bind(undefined, false)}
      placeholder={props.placeholder}
      className={"w-full h-[40px] border py-1 px-2 rounded-lg bg-white " + statusClassName}
    />
  </div>
}
