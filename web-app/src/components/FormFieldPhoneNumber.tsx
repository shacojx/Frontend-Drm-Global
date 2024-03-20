import React, { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { callApiVerifyEmail, callApiVerifyPhone } from "../api/account";
import { ApiVerifyPhone, NationPhone } from "../api/types";
import { NATION_PHONE_INFOS } from "../constants/SelectionOptions";
import { useValidate } from "../hooks-ui/useValidateCaller";
import { extractPhone, generatePhone, RNPhoneValue } from "../services-business/api/generate-api-param/account";
import { validateApiLocalPhone } from "../services-business/api/validateApiParam";
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
  return !!nationPhone && !!localPhone && validateApiLocalPhone(localPhone)
}

export function FormFieldPhoneNumber(props: FormFieldProps<RNPhoneValue> & {shouldLiveCheck?: boolean}) {
  const translation = useTranslation()
  const [wasRegister, setWasRegister] = useState<boolean>(false)
  const [shouldShowError, setShouldShowError] = useValidate<RNPhoneValue>(
    props.id,
    props.isRequired,
    props.value,
    props.validateCaller,
    validateRNPhone,
    wasRegister
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
    const body: ApiVerifyPhone = {
      codePhone: newNationPhone,
      phone: localPhone
    }
    callApiVerifyPhone(body)
      .catch(() => {
        setWasRegister(true)
        setShouldShowError(true)
      })
  }

  function handleBlur() {
    const isValid = validateRNPhone(props.isRequired, props.value)
    setShouldShowError(!isValid)
    if (isValid) {
      const extracted = extractPhone(props.value!)
      const body: ApiVerifyPhone = {
        codePhone: extracted.nationPhone,
        phone: extracted.localPhone
      }
      callApiVerifyPhone(body)
        .catch(() => {
          setWasRegister(true)
          setShouldShowError(true)
        })
    }
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
        minWidth={"115px"}
        onChange={handleChangeNationPhone}
        validateCaller={{}}
      />
      <div>
        <input
          type="tel"
          value={localPhone}
          onChange={handleChangePhoneInput}
          onFocus={setShouldShowError.bind(undefined, false)}
          onBlur={handleBlur}
          placeholder={props.placeholder}
          className={"w-full h-[40px] border py-1 px-2 rounded-lg " + statusClassName}
        />
        {wasRegister && <p className={"text-xs text-danger mt-2"}>{translation.t('The phone number was registered')}</p>}
      </div>
    </div>
  </div>
}
