import { useState } from "react";
import { useTranslation } from "react-i18next";
import { callApiCheckRecoveryCode } from "../api/account";
import { ApiCheckRecoveryCode } from "../api/types";
import { FormStatus } from "../types/common";
import { FormFieldText } from "./FormFieldText";
import { IconSpinner } from "./icons";
import { cn } from "src/utils/cn.util";

type Props = {
  email: string,
  onReceiveSignature: (signature: string) => void
  disabled?: boolean
}

export function FormValidateRecoveryCode(props: Props) {
  const translation = useTranslation()
  const [recoveryCode, setRecoveryCode] = useState<string>('')
  const [recoveryFormStatus, setRecoveryFormStatus] = useState<FormStatus>('typing')


  function handleChangeRecoveryCode(recoveryCode: string) {
    setRecoveryCode(recoveryCode)
    setRecoveryFormStatus('typing')
  }
  async function handleClickChangePassword() {
    if (!recoveryCode) {
      setRecoveryFormStatus("failure")
      return
    }
    setRecoveryFormStatus("requesting")
    try {
      const param: ApiCheckRecoveryCode = {
        email: props.email,
        otp: recoveryCode
      }
      const signature = await callApiCheckRecoveryCode(param)
      setRecoveryFormStatus('success')
      props.onReceiveSignature(signature)
    } catch (e) {
      setRecoveryFormStatus("failure")
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
      inputClassName={cn({
        "border-danger bg-danger/5": true
      })}
    />
    <div className="w-full flex flex-col gap-y-1">
      <button
        className={
          cn("h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg", {
            "bg-disable cursor-not-allowed": props.disabled
          })
        }
        onClick={handleClickChangePassword}
        disabled={props.disabled}
      >
        <span>{translation.t('Change Password')}</span>
        {recoveryFormStatus === 'requesting' && <IconSpinner/>}
      </button>
      {recoveryFormStatus === 'failure' &&
        <div className="text-center text-danger">
          <p>{translation.t('Incorrect recovery code or email')}.</p>
        </div>
      }
    </div>
  </>
}
