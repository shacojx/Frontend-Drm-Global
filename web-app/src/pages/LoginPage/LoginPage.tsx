import { useContext, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { callApiGetUserProfile, callApiLogin } from "src/api/account";
import { ApiLoginParam } from "src/api/types";
import { FormFieldEmail } from "src/components/FormFieldEmail";
import { FormFieldPassword } from "src/components/FormFieldPassword";
import { IconSpinner } from "src/components/icons";
import { AuthContext } from "src/contexts/AuthContextProvider";
import { useValidateCaller } from "src/hooks-ui/useValidateCaller";
import { PageLayoutOneForm } from "src/layouts/PageLayoutOneForm";
import { saveAuthInfo } from "src/services-business/api/authentication";
import { validateApiPassword } from "src/services-business/api/validateApiParam";
import { FormStatus } from "src/types/common";
import { RoutePaths } from "src/constants/routerPaths";

export function LoginPage() {
  const translation = useTranslation()
  const navigate = useNavigate()

  const [status,setStatus] = useState<FormStatus>('typing')
  const [email,setEmail] = useState<string>('')
  const [password,setPassword] = useState<string>('')
  const {validateCaller, validateAll} = useValidateCaller()
  const {saveAuthUser} = useContext(AuthContext)
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
    const isValidEmail = validateAll()
    const isValidPassword = !!password && validateApiPassword(password)
    if (!isValidEmail || !isValidPassword) {
      setStatus("failure")
      return
    }
    setStatus("requesting")
    const param: ApiLoginParam = {
      username: email,
      password: password
    }
    try {
      const result = await callApiLogin(param)
      if (!result.roles.includes('ROLE_USER')) {
        setStatus("failure")
        return
      }
      saveAuthInfo(result)
      setStatus('success')
      const user = await callApiGetUserProfile()
      saveAuthUser(user)
      navigate(RoutePaths.home)
    } catch (e) {
      setStatus("failure")
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
    <FormFieldEmail id="email" isRequired value={email} onChange={handleChangeEmail} validateCaller={validateCaller} />
    <FormFieldPassword
      id={"password"}
      isRequired
      value={password}
      onChange={handleChangePassword}
      onEnter={handleClickLogin}
      validateCaller={validateCaller}
    />
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
    {status === 'failure' &&
      <div className="text-center text-danger">
        <p>{translation.t('Incorrect username or password')}.</p>
        <p>{translation.t('Please try again')}</p>
      </div>
    }
  </PageLayoutOneForm>
}
