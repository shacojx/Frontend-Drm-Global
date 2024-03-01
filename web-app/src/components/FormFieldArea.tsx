import React, { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useFormFieldBaseHandler } from "../hooks-ui/useFormFieldBaseHandler";

type Props = {
  onChange: (value: string) => void
} & Partial<{
  label: string,
  value: string,
  placeholder: string,
}>

export function FormFieldTextArea(props: Props) {
  const translation = useTranslation()

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const newValue = event.target.value
    props.onChange(newValue)
  }

  return <div className="flex flex-col gap-2">
    {!!props.label && <p className="text-cBase font-bold">{translation.t(props.label)}</p>}
    <textarea
      value={props.value}
      onChange={handleChange}
      placeholder={props.placeholder}
      className={"w-full min-h-[40px] border py-1 px-2 rounded-lg"}
    />
  </div>
}
