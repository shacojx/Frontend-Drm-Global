import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { callApiChangeUserPassword, callApiChangeUserProfile, callApiGetUserProfile } from "../api/account";
import { ApiChangeUserPassword, ApiChangeUserProfile } from "../api/types";
import { FormFieldEmail } from "../components/FormFieldEmail";
import { FormFieldPassword } from "../components/FormFieldPassword";
import { FormFieldPhoneNumber } from "../components/FormFieldPhoneNumber";
import { FormFieldText } from "../components/FormFieldText";
import { IconAccountCircle, IconSpinner } from "../components/icons";
import { AuthContext } from "../contexts/AuthContextProvider";
import { useValidateCaller } from "../hooks-ui/useValidateCaller";
import { extractPhone, generatePhone, RNPhoneValue } from "../services-business/api/generate-api-param/account";
import { FormStatus } from "../types/common";

type MyAccountContentProps = {
}

export function MyAccountContent(props: MyAccountContentProps) {
  const {user} = useContext(AuthContext)
  const translation = useTranslation()

  return <div className={"w-full grow flex flex-col p-3"}>
    <div className={"flex flex-col grow overflow-x-hidden overflow-y-scroll bg-white rounded justify-start items-center py-6 px-4 sm:px-8"}>
      <div>
        <IconAccountCircle className={"w-16 h-16"} />
      </div>
      <p className={"font-bold text-h4 my-3"}>{translation.t("Hello")} {user?.lastName}</p>
      <p>{translation.t('Manage your information, privacy and security so DRMGlobal works for you')}.</p>
      <div className={"flex flex-col md:flex-row mt-8 gap-2 grow w-full"}>
        <div className={"border rounded-lg grow md:w-1/3 p-6 flex flex-col"}>
          <GeneralInformationForm />
        </div>
        <div className={"border rounded-lg grow md:w-1/3 p-6 flex flex-col"}>
          <ChangePasswordForm/>
        </div>
      </div>
    </div>
  </div>
}

function GeneralInformationForm() {
  const translation = useTranslation()
  const { user, saveAuthUser} = useContext(AuthContext)
  const {validateCaller, validateAll} = useValidateCaller()
  const [phone, setPhone] = useState<RNPhoneValue | undefined>(generatePhone(user?.codePhone || '+84', user?.phone || ''))
  const [firstName, setFirstName] = useState<string>(user?.firstName || '')
  const [lastName, setLastName] = useState<string>(user?.lastName || '')
  const [status, setStatus] = useState<FormStatus>('typing')
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  function handleChangePhone(phone: RNPhoneValue) {
    setPhone(phone)
    setStatus("typing")
  }
  function handleChangeFirstName(firstName: string) {
    setFirstName(firstName)
    setStatus("typing")
  }
  function handleChangeLastName(lastName: string) {
    setLastName(lastName)
    setStatus("typing")
  }
  async function handleClickSave() {
    if (!user?.email || !phone || !firstName || !lastName || !validateAll()) {
      return
    }
    setStatus('requesting')
    const {nationPhone, localPhone} = extractPhone(phone)
    const param: ApiChangeUserProfile = {
      email: user.email,
      codePhone: nationPhone,
      phone: localPhone,
      firstName: firstName,
      lastName: lastName
    }
    try {
      await callApiChangeUserProfile(param)
      saveAuthUser(await callApiGetUserProfile())
      setStatus('success')
    } catch (e: unknown) {
      setStatus("failure")
      setErrorMessage(e?.toString())
      console.error(e)
    }
  }

  return <>
    <div className={"mb-8 space-y-1"}>
      <p className={"font-bold"}>{translation.t('General information')}</p>
      <div className={"h-[2px] w-[70px] bg-primary"}></div>
    </div>
    <div className={"space-y-6"}>
      <FormFieldEmail value={user?.email} id={'email'} isRequired validateCaller={validateCaller} onChange={() => {
      }} isFixedValue/>
      <FormFieldPhoneNumber
        id={"phoneNumber"}
        placeholder={"Input number"}
        isRequired
        value={phone}
        onChange={handleChangePhone}
        validateCaller={validateCaller}
      />
      <div className={"w-full flex gap-4"}>
        <FormFieldText
          id={"FirstName"}
          isRequired
          label="First Name"
          value={firstName}
          onChange={handleChangeFirstName}
          placeholder="Enter first name"
          validateCaller={validateCaller}
        />
        <FormFieldText
          id={"LastName"}
          isRequired
          label="Last Name"
          value={lastName}
          onChange={handleChangeLastName}
          placeholder="Enter last name"
          validateCaller={validateCaller}
        />
      </div>
    </div>
    <div className={"flex justify-end"}>
      <button
        onClick={handleClickSave}
        className="py-4 px-6 mt-8 flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
      >
        {translation.t('Save')}
        {status === "requesting" && <IconSpinner />}
      </button>
    </div>
    {status === "failure" && <p className={"text-danger"}>{errorMessage}</p>}
  </>
}

function ChangePasswordForm() {
  const translation = useTranslation()
  const {validateCaller, validateAll} = useValidateCaller()
  const [password, setPassword] = useState<string>('')
  const [rePassword, setRePassword] = useState<string>('')
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true)
  const [status, setStatus] = useState<FormStatus>('typing')
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  function handleChangeRePassword(rePass: string) {
    setRePassword(rePass)
    setIsPasswordMatch(true)
  }

  async function handleClickSave() {
    if (password !== rePassword) {
      setIsPasswordMatch(false)
      return
    }
    if (!password || !rePassword || !isPasswordMatch || !validateAll()) {
      return
    }
    setStatus('requesting')
    const param: ApiChangeUserPassword = {
      newPass: password,
      reNewPass: rePassword,
    }
    try {
      await callApiChangeUserPassword(param)
      setStatus('success')
      setPassword('')
      setRePassword('')
      setStatus('typing')
    } catch (e: unknown) {
      setStatus("failure")
      setErrorMessage(e?.toString())
      console.error(e)
    }
  }

  return <>
    <div className={"mb-8 space-y-1"}>
      <p className={"font-bold"}>{translation.t('Change password')}</p>
      <div className={"h-[2px] w-[70px] bg-primary"}></div>
    </div>
    <div className={"space-y-6 grow"}>
      <FormFieldPassword
        id={"password"}
        label={"New password"}
        placeholder={"Enter new password"}
        isRequired
        value={password}
        onChange={setPassword}
        validateCaller={validateCaller}
      />
      <div className={"space-y-2"}>
        <FormFieldPassword
          id={"rePassword"}
          label={"Re-enter password"}
          placeholder={"Re-type new password"}
          isRequired
          value={rePassword}
          onChange={handleChangeRePassword}
          validateCaller={validateCaller}
        />
        {!isPasswordMatch && <p className={"text-danger"}>{translation.t("The entered passwords do not match")}!</p>}
      </div>
    </div>
    <div className={"flex justify-end"}>
      <button
        disabled={status === 'requesting'}
        onClick={handleClickSave}
        className="py-4 px-6 mt-8 flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
      >
        {translation.t('Save')}
        {status === "requesting" && <IconSpinner />}
      </button>
    </div>
    {status === "failure" && <p className={"text-danger"}>{errorMessage}</p>}
  </>
}
