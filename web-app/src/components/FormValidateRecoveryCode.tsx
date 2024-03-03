import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ApiCheckRecoveryCode, callApiCheckRecoveryCode } from "../api/account";
import { FormStatus } from "../types/common";
import { FormFieldText } from "./FormFieldText";
import { IconSpinner } from "./icons";

type Props = {
  email: string
}

export function FormValidateRecoveryCode(props: Props) {
  const translation = useTranslation()
  const [recoveryCode,setRecoveryCode] = useState<string>('')
  const [recoveryFormStatus,setRecoveryFormStatus] = useState<FormStatus>('typing')


  function handleChangeRecoveryCode(recoveryCode: string) {
    setRecoveryCode(recoveryCode)
    setRecoveryFormStatus('typing')
  }
  async function handleClickChangePassword() {
    if (!recoveryCode) {
      setRecoveryFormStatus("error")
      return
    }
    setRecoveryFormStatus("requesting")
    try {
      const param: ApiCheckRecoveryCode = {
        email: props.email,
        otp: recoveryCode
      }
      await callApiCheckRecoveryCode(param)
      setRecoveryFormStatus('success')
    } catch (e) {
      setRecoveryFormStatus("error")
      console.error(e)
    }
  }

  return <>
    <FormFieldText
      id={"recoveryCode"}
      label="Recovery Code"
      value={recoveryCode}
      onChange={handleChangeRecoveryCode}
      validateCaller={{}}
    />
    <div className="w-full flex flex-col gap-y-1">
      <button
        className="h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
        onClick={handleClickChangePassword}
      >
        <span>{translation.t('Change Password')}</span>
        {recoveryFormStatus === 'requesting' && <IconSpinner/>}
      </button>
      {recoveryFormStatus === 'error' &&
        <div className="text-center text-danger">
          <p>{translation.t('Incorrect recovery code or email')}.</p>
        </div>
      }
    </div>
  </>
}
