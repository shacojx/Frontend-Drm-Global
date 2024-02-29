import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormSendRecoveryCode } from "../components/FormSendRecoveryCode";
import { FormValidateRecoveryCode } from "../components/FormValidateRecoveryCode";
import { PageLayoutOneForm } from "../layouts/PageLayoutOneForm";

export function ResetPasswordPage() {
  const translation = useTranslation()
  const [email, setEmail] = useState<string>('')
  const handleSendRecoveryCode = useCallback((email: string) => {
    setEmail(email)
  }, [])

  return <PageLayoutOneForm>
    <p className="text-h4">{translation.t('Reset your password')}</p>
    <p className="text-cSm">{translation.t('Enter the email address associated with your account')}</p>
    <FormSendRecoveryCode onSendRecoveryCode={handleSendRecoveryCode} />
    <FormValidateRecoveryCode email={email} />
  </PageLayoutOneForm>
}
