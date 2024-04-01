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
import { cn } from "src/utils/cn.util";
import { IconCheck } from "./icons";

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

type FormFieldPhoneNumberProps = FormFieldProps<RNPhoneValue> & {
  shouldLiveCheck?: boolean;
  ignoreValues?: string[]
}

export function FormFieldPhoneNumber(props: FormFieldPhoneNumberProps) {
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

  const [isValidPhone, setIsValidPhone] = useState(false)

  function handleChangePhoneInput(event: ChangeEvent<HTMLInputElement>) {
    const localPhone = event.target.value
    const phone = generatePhone(nationPhone, localPhone)
    props.onChange(phone)
  }

  function handleChangeNationPhone(newNationPhone: NationPhone) {
    const localPhone = props.value ? extractPhone(props.value).localPhone : ''
    const phone = generatePhone(newNationPhone, localPhone)
    props.onChange(phone)
    if (props.shouldLiveCheck) {
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
  }

  function handleBlur() {
    if (props.ignoreValues?.includes(props.value as RNPhoneValue)) {
      return
    }

    const isValid = validateRNPhone(props.isRequired, props.value)
    setShouldShowError(!isValid)
    setIsValidPhone(isValid)
    
    if (isValid) {
      const extracted = extractPhone(props.value!)
      const body: ApiVerifyPhone = {
        codePhone: extracted.nationPhone,
        phone: extracted.localPhone
      }
      callApiVerifyPhone(body)
        .then(() => {
          setIsValidPhone(true)
          setWasRegister(false)
        })
        .catch(() => {
          setWasRegister(true)
          setShouldShowError(true)
          setIsValidPhone(false)
        })
    }
  }

  const statusClassName = shouldShowError ? 'border-danger bg-red-50' : 'bg-white'
  return (
    <div className="flex flex-col gap-2">
      <p className="flex text-cBase font-bold gap-1">
        <span>{translation.t('Phone number')}</span>
        <span className="text-danger">*</span>
      </p>
      <div className="flex gap-4">
        <FormFieldSelect
          id={'nationPhoneSelect'}
          isRequired
          value={nationPhone}
          optionInfos={NATION_PHONE_INFOS}
          minWidth={'130px'}
          onChange={handleChangeNationPhone}
          validateCaller={{}}
        />
        <div className="grow">
          <div className={cn('w-full h-[40px] border py-1 px-2 rounded-lg flex items-center', statusClassName)}>
            <input
              type="tel"
              value={localPhone}
              onChange={handleChangePhoneInput}
              onFocus={setShouldShowError.bind(undefined, false)}
              onBlur={handleBlur}
              placeholder={props.placeholder}
              className="outline-none bg-transparent w-full min-w-0"
            />
            {isValidPhone && <IconCheck className="text-success" />}
          </div>
          {wasRegister && (
            <p className={'text-xs text-danger mt-2'}>{translation.t('The phone number was registered')}</p>
          )}
        </div>
      </div>
    </div>
  );
}
