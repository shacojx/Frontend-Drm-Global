import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { ApiLoginParam, callApiLogin } from "../api/account";
import { FormFieldEmail } from "../components/FormFieldEmail";
import { FormFieldPassword } from "../components/FormFieldPassword";
import { IconSpinner } from "../components/icons";
import { PageLayoutOneForm } from "../layouts/PageLayoutOneForm";
import { validateApiEmail, validateApiPassword } from "../services-business/api/validateApiParam";
import { FormStatus } from "../types/common";
import { RoutePaths } from "./router";

export function LoginPage() {
  const translation = useTranslation()
  const navigate = useNavigate()

  const [status,setStatus] = useState<FormStatus>('typing')
  const [email,setEmail] = useState<string>('')
  const [password,setPassword] = useState<string>('')

  function handleChangeEmail(email: string) {
    setEmail(email)
    setStatus('typing')
  }
  function handleChangePassword(password: string) {
    setPassword(password)
    setStatus('typing')
  }

  function handleClickForgotPassword() {
    navigate(RoutePaths.resetPassword)
  }
  async function handleClickLogin() {
    const isValidEmail = !!email && validateApiEmail(email)
    const isValidPassword = !!password && validateApiPassword(password)
    if (!isValidEmail || !isValidPassword) {
      setStatus("error")
      return
    }
    setStatus("requesting")
    const param: ApiLoginParam = {
      username: email,
      password: password
    }
    try {
      setStatus('success')
      const result = await callApiLogin(param)
      // TODO: save user info
      console.log(result)

      // TODO: redirect to other page
    } catch (e) {
      setStatus("error")
      console.error(e)
    }
  }
  function handleClickCreateNewAccount() {
    navigate(RoutePaths.register)
  }

  return <PageLayoutOneForm>
    <div className="flex flex-col gap-1">
      <p className="text-cXl text-gray-400">{translation.t('Welcome back')}! 👋</p>
      <p className="text-h4">{translation.t('Sign in to your account')}</p>
    </div>
    <FormFieldEmail value={email} onChange={handleChangeEmail}/>
    <FormFieldPassword value={password} onChange={handleChangePassword}/>
    <div className="flex justify-end">
      <button onClick={handleClickForgotPassword} className="text-primary">
        {translation.t('Forgot your password')}?
      </button>
    </div>
    <div className="flex flex-col gap-1 justify-center">
      <button
        className="h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
        onClick={handleClickLogin}
      >
        <span>{translation.t('Log in')}</span>
        {status === 'requesting' && <IconSpinner/>}
      </button>
      <button onClick={handleClickCreateNewAccount} className="text-gray-400 text-sm">
        {translation.t('New here')}?
      </button>
    </div>
    {status === 'error' &&
      <div className="text-center text-danger">
        <p>{translation.t('Incorrect username or password')}.</p>
        <p>{translation.t('Please try again')}</p>
      </div>
    }
  </PageLayoutOneForm>
}
