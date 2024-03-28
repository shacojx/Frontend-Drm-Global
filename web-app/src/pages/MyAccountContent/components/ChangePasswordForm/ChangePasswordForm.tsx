import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { callApiChangeUserPassword } from 'src/api/account'
import { ApiChangeUserPassword } from 'src/api/types'
import { DialogSuccessFullscreen } from 'src/components/DialogFormStatusFullscreen'
import { FormFieldPassword } from 'src/components/FormFieldPassword'
import { IconSpinner } from 'src/components/icons'
import { useValidateCaller } from 'src/hooks-ui/useValidateCaller'
import { FormStatus } from 'src/types/common'
import { cn } from 'src/utils/cn.util'

export default function ChangePasswordForm() {
  const translation = useTranslation()
  const { validateCaller, validateAll } = useValidateCaller()
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
    } catch (e: unknown) {
      setStatus("failure")
      setErrorMessage(e?.toString())
      console.error(e)
    }
  }

  const disableSaveButton = status === 'requesting' || password === '' || rePassword === '' || password !== rePassword

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
        disabled={disableSaveButton}
        onClick={handleClickSave}
        className={
          cn(
            "py-4 px-6 mt-8 flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg",
            {
              "bg-disable": disableSaveButton
            }
          )
        }
      >
        {translation.t('Save')}
        {status === "requesting" && <IconSpinner />}
      </button>
    </div>
    {status === "failure" && <p className={"text-danger"}>{errorMessage}</p>}
    {status === 'success' && 
      <DialogSuccessFullscreen 
        title='Update password successfully!' 
        onClose={() => setStatus('typing')} 
        actionElement={<button className='bg-primary w-full text-white rounded-lg py-3' onClick={() => setStatus('typing')}>Close</button>} 
      />
    }
  </>
}

