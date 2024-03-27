import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { callApiChangeUserProfile } from 'src/api/account'
import { ApiChangeUserProfile } from 'src/api/types'
import { DialogSuccessFullscreen } from 'src/components/DialogFormStatusFullscreen'
import { FormFieldEmail } from 'src/components/FormFieldEmail'
import { FormFieldPhoneNumber } from 'src/components/FormFieldPhoneNumber'
import { FormFieldText } from 'src/components/FormFieldText'
import { IconEdit, IconSpinner } from 'src/components/icons'
import { AuthContext } from 'src/contexts/AuthContextProvider'
import { useValidateCaller } from 'src/hooks-ui/useValidateCaller'
import { RNPhoneValue, extractPhone, generatePhone } from 'src/services-business/api/generate-api-param/account'
import { FormStatus } from 'src/types/common'
import { cn } from 'src/utils/cn.util'
import { DialogEditEmail } from './DialogEditEmail'

export default function GeneralInformationForm() {
    const translation = useTranslation()
    const { t } = translation
    const { user, saveAuthUser } = useContext(AuthContext)
    const { validateCaller, validateAll } = useValidateCaller()

    const initialPhone = generatePhone(user?.codePhone || '+84', user?.phone?.slice(user?.codePhone?.length) || '')
    const [phone, setPhone] = useState<RNPhoneValue | undefined>(initialPhone)
    const [firstName, setFirstName] = useState<string>(user?.firstName || '')
    const [lastName, setLastName] = useState<string>(user?.lastName || '')
    const [status, setStatus] = useState<FormStatus>('typing')
    const [errorMessage, setErrorMessage] = useState<string | undefined>()

    const [showEditEmailDialog, setShowEditEmailDialog] = useState(false)

    const disabledSaveButton = user?.firstName === firstName && user?.lastName === lastName  && initialPhone === phone

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
        const { nationPhone, localPhone } = extractPhone(phone)
        const param: ApiChangeUserProfile = {
            email: user.email,
            codePhone: nationPhone,
            phone: localPhone,
            firstName: firstName,
            lastName: lastName
        }
        try {
            const updatedUser = await callApiChangeUserProfile(param)
            saveAuthUser(updatedUser)
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
        <div className={"space-y-6 grow"}>
            
            <div className='flex gap-2'>
                <div className='grow'>
                    <FormFieldEmail value={user?.email} id={'email'} isRequired validateCaller={validateCaller} onChange={() => { }} isFixedValue />
                </div>
                <button className='w-10 h-10 shrink-0 cursor-pointer' onClick={() => setShowEditEmailDialog(true)}>
                    <IconEdit className='text-2xl mt-10' />
                </button>
            </div>

            <FormFieldPhoneNumber
                id={"phoneNumber"}
                placeholder={"Input number"}
                isRequired
                value={phone}
                onChange={handleChangePhone}
                validateCaller={validateCaller}
                ignoreValues={[initialPhone]}
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
                    isFixedValue={user?.kycStatus !== 'Pending'}
                />
                <FormFieldText
                    id={"LastName"}
                    isRequired
                    label="Last Name"
                    value={lastName}
                    onChange={handleChangeLastName}
                    placeholder="Enter last name"
                    validateCaller={validateCaller}
                    isFixedValue={user?.kycStatus !== 'Pending'}
                />
            </div>
        </div>
        <div className={"flex justify-end"}>
            <button
                onClick={handleClickSave}
                className={cn(
                    "py-4 px-6 mt-8 flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg",
                    {
                        'bg-disable': disabledSaveButton
                    }
                )}
                disabled={disabledSaveButton}
            >
                {translation.t('Save')}
                {status === "requesting" && <IconSpinner />}
            </button>
        </div>
        {status === "failure" && <p className={"text-danger"}>{errorMessage}</p>}

        {status === 'success' && <DialogSuccessFullscreen onClose={() => setStatus('typing')} title='Update profile successfully!' />}

        <DialogEditEmail open={showEditEmailDialog} onClose={() => setShowEditEmailDialog(false)} />
    </>
}

