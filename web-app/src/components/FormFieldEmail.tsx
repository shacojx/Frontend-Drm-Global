import React from "react";
import { useTranslation } from "react-i18next";
import { useFormFieldBaseHandler } from "../hooks-ui/useFormFieldBaseHandler";
import { validateApiEmail } from "../services-business/api/validateApiParam";

type Props = {
  onChange: (value: string) => void
} & Partial<{
  value: string,
  isRequired: boolean,
}>

export function FormFieldEmail(props: Props) {
  const translation = useTranslation()

  const {
    isChanged,
    isFocus,
    handleChange,
    handleFocus,
    handleBlur
  } = useFormFieldBaseHandler(props.onChange)

  const isError = !isFocus && isChanged && (!props.value || !validateApiEmail(props.value))
  const statusClassName = isError ? 'border-danger bg-red-50' : ''
  return <div className="flex flex-col gap-2">
    <p className="flex text-cBase font-bold gap-1">
      <span>{translation.t('Email address')}</span>
      {props.isRequired && <span className="text-danger">*</span>}
    </p>
    <input
      type="email"
      value={props.value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder="Example@hotmail.com"
      className={"w-full h-[40px] border py-1 px-2 rounded-lg " + statusClassName}
    />
  </div>
}
