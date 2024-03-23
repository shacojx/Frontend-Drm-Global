import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { IconAccountCircle } from 'src/components/icons'
import { AuthContext } from 'src/contexts/AuthContextProvider'
import ChangePasswordForm from 'src/pages/MyAccountContent/components/ChangePasswordForm'
import GeneralInformationForm from 'src/pages/MyAccountContent/components/GeneralInformationForm'
import KYCBox from 'src/pages/MyAccountContent/components/KYCBox'

export default function MyAccountContent() {
    const { user } = useContext(AuthContext)
    const translation = useTranslation()


    return <div className={"w-full grow flex flex-col p-3"}>
        <div className={"flex flex-col grow overflow-x-hidden overflow-y-scroll bg-white rounded justify-start items-center py-6 px-4 sm:px-8"}>
            <div>
                {user?.avatar
                    ? <img src={user?.avatar} alt="" />
                    : <IconAccountCircle className={"w-16 h-16"} />
                }
            </div>
            <p className={"font-bold text-h4 my-3"}>{translation.t("Hello")} {user?.lastName}</p>
            <p>{translation.t('Manage your information, privacy and security so DRMGlobal works for you')}.</p>
            <div className={"flex flex-col md:flex-row mt-8 gap-2 grow w-full"}>
                <div className={"border rounded-lg grow md:w-1/3 p-6 flex flex-col"}>
                    <GeneralInformationForm />
                </div>
                <div className={"border rounded-lg grow md:w-1/3 p-6 flex flex-col"}>
                    <ChangePasswordForm />
                </div>
                <div className={"border rounded-lg grow md:w-1/3 p-6 flex flex-col"}>
                    <KYCBox />
                </div>
            </div>
        </div>
    </div>
}