import React from "react";
import { useTranslation } from "react-i18next";
import { useFormFieldBaseHandler } from "../hooks-ui/useFormFieldBaseHandler";
import {
  extractPhone,
  generatePhone,
  NationPhone,
  RNPhoneValue
} from "../services-business/api/generate-api-param/generatePhone";
import { FormFieldSelectNationPhone, NationPhoneInfos } from "./FormFieldSelectNationPhone";

type Props = {
  onChange: (value: RNPhoneValue) => void
} & Partial<{
  value: RNPhoneValue,
  placeholder: string,
}>

export function FormFieldPhoneNumber(props: Props) {
  const translation = useTranslation()

  const {
    isChanged,
    isFocus,
    handleChange,
    handleFocus,
    handleBlur
  } = useFormFieldBaseHandler(handleChangePhoneInput)

  function handleChangePhoneInput(localPhone: string) {
    const nationPhone = props.value ? extractPhone(props.value).nationPhone : NationPhoneInfos[0].value
    const phone = generatePhone(nationPhone, localPhone)
    props.onChange(phone)
  }

  function handleChangeNationPhone(newNationPhone: NationPhone) {
    const localPhone = props.value ? extractPhone(props.value).localPhone : ''
    const phone = generatePhone(newNationPhone, localPhone)
    props.onChange(phone)
  }
  const nationPhone = props.value ? extractPhone(props.value).nationPhone : NationPhoneInfos[0].value
  const isError = !isFocus && isChanged && !props.value
  const statusClassName = isError ? 'border-danger bg-red-50' : ''
  return <div className="flex flex-col gap-2">
    <p className="flex text-cBase font-bold gap-1">
      <span>{translation.t('Phone number')}</span>
      <span className="text-danger">*</span>
    </p>
    <div className="flex gap-4">
      <FormFieldSelectNationPhone value={nationPhone} onChange={handleChangeNationPhone} />
      <input
        type="tel"
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={props.placeholder}
        className={"w-full h-[40px] border py-1 px-2 rounded-lg " + statusClassName}
      />
    </div>
  </div>
}
