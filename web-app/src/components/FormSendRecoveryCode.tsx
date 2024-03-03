import { useState } from "react";
import { useTranslation } from "react-i18next";
import { callApiSendRecoveryCode } from "../api/account";
import { useValidateCaller } from "../hooks-ui/useValidateCaller";
import { FormStatus } from "../types/common";
import { FormFieldEmail } from "./FormFieldEmail";
import { IconCheck, IconSpinner } from "./icons";

type Props = {
  onSendRecoveryCode: (email: string) => void
}

export function FormSendRecoveryCode(props: Props) {
  const translation = useTranslation()
  const [email,setEmail] = useState<string>('')
  const [emailFormStatus,setEmailFormStatus] = useState<FormStatus>('typing')
  const [canSendRecoveryCode, setCanSendRecoveryCode] = useState<boolean>(true)
  const {validateCaller, validateAll} = useValidateCaller()

  function handleChangeEmail(email: string) {
    setEmail(email)
    setEmailFormStatus('typing')
  }
  async function handleClickSendRecoveryCode() {
    if (!validateAll()) {
      setEmailFormStatus("failure")
      return
    }
    setEmailFormStatus("requesting")
    try {
      await callApiSendRecoveryCode({email})
      props.onSendRecoveryCode(email)
      setEmailFormStatus('success')
    } catch (e) {
      setEmailFormStatus("failure")
      console.error(e)
    }
    setCanSendRecoveryCode(false)
    setTimeout(() => {
      setCanSendRecoveryCode(true)
    }, 60_000)
  }

  return <>
    <div className="relative">
      <FormFieldEmail id="email" isRequired value={email} onChange={handleChangeEmail} validateCaller={validateCaller} />
      {emailFormStatus === "success" && <IconCheck className="h-[18px] absolute top-[42px] right-[11px] text-success" />}
    </div>
    <div className="w-full flex flex-col gap-y-1">
      <button
        disabled={!canSendRecoveryCode}
        className={"h-[52px] flex justify-center items-center gap-2 text-white font-semibold rounded-lg " + (canSendRecoveryCode ? "bg-primary" : "bg-primary_25")}
        onClick={handleClickSendRecoveryCode}
      >
        <span>{translation.t('Send recover code - 60s')}</span>
        {emailFormStatus === 'requesting' && <IconSpinner/>}
      </button>
      {emailFormStatus === 'failure' &&
        <div className="text-center text-danger">
          <p>{translation.t('Incorrect email')}.</p>
        </div>
      }
    </div>
    </>
}
