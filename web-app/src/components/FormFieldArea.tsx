import React, { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useValidate } from "../hooks-ui/useValidateCaller";
import { FormFieldProps } from "../types/common";
import clsx from "clsx";

export function FormFieldTextArea(props: FormFieldProps<string>) {
  const translation = useTranslation()
  const [shouldShowError, setShouldShowError] = useValidate(
    props.id,
    props.isRequired,
    props.value,
    props.validateCaller
  )

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value
    props.onChange(value)
  }

  const isTextValid = !props.isRequired || !!props.value
  const statusClassName = shouldShowError
    ? 'border-danger bg-red-50'
    : 'bg-white'
  return <div className={clsx("flex flex-col gap-2", props.className)}>
    {!!props.label && (
      <p className="flex text-cBase font-bold gap-1">
        <span>{translation.t(props.label)}</span>
        {props.isRequired && <span className="text-danger">*</span>}
      </p>
    )}
    <textarea
      value={props.value || ''}
      readOnly={props.isFixedValue}
      onChange={handleChange}
      onBlur={setShouldShowError.bind(undefined, !isTextValid)}
      placeholder={props.placeholder}
      className={clsx(
        "w-full min-h-[40px] py-1 px-2 rounded-lg",
        statusClassName,
        props.isFixedValue ? "border-none outline-none" : "border"
      )}
    />
  </div>
}
