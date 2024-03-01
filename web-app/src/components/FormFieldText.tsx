import React from "react";
import { useTranslation } from "react-i18next";
import { useFormFieldBaseHandler } from "../hooks-ui/useFormFieldBaseHandler";

type Props = {
  onChange: (value: string) => void
} & Partial<{
  label: string,
  value: string,
  placeholder: string,
}>

export function FormFieldText(props: Props) {
  const translation = useTranslation()

  const {
    isChanged,
    isFocus,
    handleChange,
    handleFocus,
    handleBlur
  } = useFormFieldBaseHandler(props.onChange)

  const isError = !isFocus && isChanged && !props.value
  const statusClassName = isError ? 'border-danger bg-red-50' : ''
  return <div className="flex flex-col gap-2">
    {!!props.label && <p className="text-cBase font-bold">{translation.t(props.label)}</p>}
    <input
      type="text"
      value={props.value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={props.placeholder}
      className={"w-full h-[40px] border py-1 px-2 rounded-lg " + statusClassName}
    />
  </div>
}
