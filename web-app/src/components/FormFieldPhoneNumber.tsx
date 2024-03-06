import React, { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { NationPhone } from "../api/types";
import { NATION_PHONE_INFOS } from "../constants/SelectionOptions";
import { useValidate } from "../hooks-ui/useValidateCaller";
import {
  extractPhone,
  generatePhone,
  RNPhoneValue
} from "../services-business/api/generate-api-param/generatePhone";
import { FormFieldProps } from "../types/common";
import { FormFieldSelect } from "./FormFieldSelect";

function validateRNPhone(isRequired: boolean | undefined, phone: RNPhoneValue | undefined) {
  if (!isRequired) {
    return true
  }
  if (!phone) {
    return false
  }
  const {nationPhone, localPhone} = extractPhone(phone)
  const regValidateLocalPhone = /^\d+$/;
  return !!nationPhone && !!localPhone && regValidateLocalPhone.test(localPhone)
}

export function FormFieldPhoneNumber(props: FormFieldProps<RNPhoneValue>) {
  const translation = useTranslation()
  const [shouldShowError, setShouldShowError] = useValidate<RNPhoneValue>(
    props.id,
    props.isRequired,
    props.value,
    props.validateCaller,
    validateRNPhone,
  )
  const nationPhone = props.value ? extractPhone(props.value).nationPhone : NATION_PHONE_INFOS[0].value
  const localPhone = props.value ? extractPhone(props.value).localPhone: ''
  function handleChangePhoneInput(event: ChangeEvent<HTMLInputElement>) {
    const localPhone = event.target.value
    const phone = generatePhone(nationPhone, localPhone)
    props.onChange(phone)
  }

  function handleChangeNationPhone(newNationPhone: NationPhone) {
    const localPhone = props.value ? extractPhone(props.value).localPhone : ''
    const phone = generatePhone(newNationPhone, localPhone)
    props.onChange(phone)
  }

  const statusClassName = shouldShowError ? 'border-danger bg-red-50' : 'bg-white'
  return <div className="flex flex-col gap-2">
    <p className="flex text-cBase font-bold gap-1">
      <span>{translation.t('Phone number')}</span>
      <span className="text-danger">*</span>
    </p>
    <div className="flex gap-4">
      <FormFieldSelect
        id={"nationPhoneSelect"}
        isRequired
        value={nationPhone}
        optionInfos={NATION_PHONE_INFOS}
        onChange={handleChangeNationPhone}
        validateCaller={{}}
      />
      <input
        type="tel"
        value={localPhone}
        onChange={handleChangePhoneInput}
        onFocus={setShouldShowError.bind(undefined, false)}
        onBlur={setShouldShowError.bind(undefined, !validateRNPhone(props.isRequired, props.value))}
        placeholder={props.placeholder}
        className={"w-full h-[40px] border py-1 px-2 rounded-lg " + statusClassName}
      />
    </div>
  </div>
}
