import { useEffect, useState } from "react";
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
  const {validateCaller, validateAll} = useValidateCaller()
  const MaxCountDown = 60
  const [disableCountDown, setDisableCountDown] = useState<number>(0)

  useEffect(() => {
    if (disableCountDown > 0) {
      setTimeout(() => {
        setDisableCountDown(i => i >= 1 ? i - 1 : 0)
      }, 1000)
    }
  }, [disableCountDown]);

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
      setDisableCountDown(MaxCountDown)
    } catch (e) {
      setEmailFormStatus("failure")
      console.error(e)
    }
  }

  return <>
    <div className="relative">
      <FormFieldEmail id="email" value={email} onChange={handleChangeEmail} validateCaller={validateCaller} />
      {emailFormStatus === "success" && <IconCheck className="h-[18px] absolute top-[42px] right-[11px] text-success" />}
    </div>
    <div className="w-full flex flex-col gap-y-1">
      <button
        disabled={disableCountDown < 0}
        className={"h-[52px] flex justify-center items-center gap-2 text-white font-semibold rounded-lg " + (disableCountDown <= 0 ? "bg-primary" : "bg-primary_25")}
        onClick={handleClickSendRecoveryCode}
      >
        <span>{translation.t('Send recover code')}{disableCountDown ? ` - ${disableCountDown}s` : ''}</span>
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
