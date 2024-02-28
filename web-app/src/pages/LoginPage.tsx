import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { FormFieldEmail } from "../components/FormFieldEmail";
import { FormFieldPassword } from "../components/FormFieldPassword";
import { IconSpinner } from "../components/icons";
import { PageLayoutOneForm } from "../layouts/PageLayoutOneForm";

type LoginStatus = 'typing' | 'requesting' | 'success' | 'error'
export function LoginPage() {
  const translation = useTranslation()

  const [status, setStatus] = useState<LoginStatus>('typing')

  function handleClickLogin() {
    // TODO: implement
    if (status === "typing") {
      setStatus("requesting")
    } else {
      setStatus("typing")
    }
  }

  return <PageLayoutOneForm>
    <div className="flex flex-col gap-1">
      <p className="text-cXl text-gray-400">{translation.t('Welcome back')}! 👋</p>
      <p className="text-h4">{translation.t('Sign in to your account')}</p>
    </div>
    <FormFieldEmail/>
    <FormFieldPassword/>
    <button className="flex justify-end">
      <p className="text-primary">{translation.t('Forgot your password')}?</p>
    </button>
    <button
      className="h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
      onClick={handleClickLogin}
    >
      <span>{translation.t('Log in')}</span>
      {status === 'requesting' && <IconSpinner/>}
    </button>
    {status === 'error' &&
      <div className="text-center text-danger">
        <p>{translation.t('Incorrect username or password')}.</p>
        <p>{translation.t('Please try again')}</p>
      </div>
    }
  </PageLayoutOneForm>
}
