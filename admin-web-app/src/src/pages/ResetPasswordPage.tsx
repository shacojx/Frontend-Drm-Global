import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { callApiResetPassword } from "../api/account";
import { ApiResetPasswordParam } from "../api/types";
import { DialogFailureFullscreen, DialogRequestingFullscreen } from "../components/DialogFormStatusFullscreen";
import { FormFieldPassword } from "../components/FormFieldPassword";
import { FormSendRecoveryCode } from "../components/FormSendRecoveryCode";
import { FormValidateRecoveryCode } from "../components/FormValidateRecoveryCode";
import { IconArrowLeft, IconCheckCircle } from "../components/icons";
import { useValidateCaller } from "../hooks-ui/useValidateCaller";
import { PageLayoutOneForm } from "../layouts/PageLayoutOneForm";
import { FormStatus } from "../types/common";
import { RoutePaths } from "./router";

export function ResetPasswordPage() {
  const translation = useTranslation()
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [rePassword, setRePassword] = useState<string>('')
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true)
  const {validateCaller, validateAll} = useValidateCaller()
  const signatureRef = useRef<string>()
  const [stepIndex, setStepIndex] = useState<number>(1)
  const [status, setStatus] = useState<FormStatus>('typing')
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  const emailAndRecoveryCodeStepIndex = 1
  const newPasswordStepIndex = 2

  const handleSendRecoveryCode = useCallback((email: string) => {
    setEmail(email)
  }, [])

  function handleReceiveSignature(signature: string) {
    signatureRef.current = signature
    setStepIndex(newPasswordStepIndex)
  }

  function handleChangeRePassword(rePass: string) {
    setRePassword(rePass)
    setIsPasswordMatch(true)
  }

  async function handleClickSubmit() {
    if (!password || !rePassword || !signatureRef.current) {
      return
    }
    if (!validateAll()) {
      return
    }
    if (password !== rePassword) {
      setIsPasswordMatch(false)
      return
    }
    setStatus('requesting')
    const resetPasswordParam: ApiResetPasswordParam = {
      newPass: password,
      reNewPass: rePassword,
      signature: signatureRef.current
    }
    try {
      const result = await callApiResetPassword(resetPasswordParam)
      setStepIndex(0)
      setStatus('success')
    } catch (e: unknown) {
      setStatus("failure")
      setErrorMessage(e?.toString())
      console.error(e)
    }
  }

  function handleClickBackToLogin() {
    navigate(RoutePaths.login)
  }

  return <PageLayoutOneForm>
    <p className="text-h4">{translation.t('Reset your password')}</p>
    <p className="text-cSm">{translation.t('Enter the email address associated with your account')}</p>
    {stepIndex === emailAndRecoveryCodeStepIndex &&
      <>
        <FormSendRecoveryCode onSendRecoveryCode={handleSendRecoveryCode} />
        <FormValidateRecoveryCode email={email} onReceiveSignature={handleReceiveSignature} />
      </>
    }
    {stepIndex === newPasswordStepIndex &&
      <>
        <FormFieldPassword
          id={"password"}
          label={"New password"}
          isRequired
          value={password}
          onChange={setPassword}
          validateCaller={validateCaller}
        />
        <div className={"space-y-2"}>
          <FormFieldPassword
            id={"rePassword"}
            label={"Re-enter password"}
            isRequired
            value={rePassword}
            onChange={handleChangeRePassword}
            onEnter={handleClickSubmit}
            validateCaller={validateCaller}
          />
          {!isPasswordMatch && <p className={"text-danger"}>{translation.t("The entered passwords do not match")}!</p>}
        </div>
        <button
          onClick={handleClickSubmit}
          className="h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
        >
          {translation.t('Change Password')}
        </button>
      </>
    }
    {status === 'requesting' &&
      <DialogRequestingFullscreen />
    }
    {status === "success" &&
      <div className={"w-full flex flex-col items-center gap-y-8"}>
        <IconCheckCircle className={"text-success"}/>
        <div className={"w-full flex flex-col items-center gap-y-2"}>
          <p className={"text-h4"}>{translation.t('Password Changed')} !</p>
          <p className={"text-cSm"}>{translation.t('Your password has been changed successfully')}.</p>
        </div>
        <button
          onClick={handleClickBackToLogin}
          className="w-full h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
        >
          <IconArrowLeft className={"text-white"}/>
          <span>{translation.t('Back to Log in')}</span>
        </button>
      </div>
    }
    {status === 'failure' &&
      <DialogFailureFullscreen
        title="Failure!"
        subTitle={errorMessage || "Could not change password"}
        actionElement={
          <button
            onClick={handleClickSubmit}
            className="w-full min-w-[300px] h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
          >
            <span>{translation.t('Try again')}</span>
          </button>
        }
      />
    }
  </PageLayoutOneForm>
}
