import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { DialogFailureFullscreen, DialogSuccessFullscreen } from 'src/components/DialogFormStatusFullscreen'
import { IconCheck, IconDangerCircle, IconRefreshCircle, IconSpinner } from 'src/components/icons'
import { RoutePaths } from 'src/constants/routerPaths'
import { AuthContext } from 'src/contexts/AuthContextProvider'
import { useVerifyKYC } from 'src/hooks-api/useVerifyKYC'
import TakeOrUploadPhoto from 'src/pages/KYCUploadContent/components/TakeOrUploadPhoto'
import { callApiGetUserProfile } from "../../api/account";

export default function KYCUploadContent() {
    const translation = useTranslation()
    const navigate = useNavigate()
    const { user, saveAuthUser } = useContext(AuthContext)
    const [passport, setPassport] = useState<File | null>(null);
    const [pictureHoldPassport, setPictureHoldPassport] = useState<File | null>(null);

    const [showSuccessDialog, setShowSuccessDialog] = useState(false)
    const [showErrorDialog, setShowErrorDialog] = useState(false)

    const { mutateAsync: uploadKYC, isPending, error } = useVerifyKYC({
        onError: () => setShowErrorDialog(true),
        onSuccess: () => setShowSuccessDialog(true)
    })


    const handleClickSend = async () => {
        if (!passport || !pictureHoldPassport) return
        try {
            await uploadKYC({passport: passport, picture: pictureHoldPassport})
            const user = await callApiGetUserProfile()
            saveAuthUser(user)
        } catch (e: unknown) {
            console.error(e)
        }
    }


    function handleCloseSuccessKyc() {
        setShowSuccessDialog(false)
        navigate(RoutePaths.myAccount)
    }

    const isDisableSend = !passport || !pictureHoldPassport || user?.kycStatus === 'In-progress'

    return <>
        <div className={"w-full grow flex flex-col p-3 bg-white border border-solid border-t border-l"}>
            <div className={"flex flex-col grow overflow-x-hidden overflow-y-scroll bg-white rounded justify-start items-center py-6 px-4"}>
                <div className={"w-full max-w-[800px] flex flex-col gap-y-6"}>
                    <div className={"flex flex-row justify-between"}>
                        <div className={"space-y-1"}>
                            <p className={"font-bold"}>{translation.t('KYC')}</p>
                            <div className={"h-[2px] w-[70px] bg-primary"}></div>
                        </div>
                        <div className={"flex flex-row gap-3 items-center"}>
                            <span>{translation.t('Status')}:</span>
                            {user?.kycStatus === 'Pending' &&
                                <div className={"flex flex-row gap-1 items-center bg-[#5D50C626] p-2 rounded-lg"}>
                                    <IconDangerCircle className={"shrink-0 text-black w-5 h-5"} />
                                    <span className={"font-bold"}>{translation.t('Pending')}</span>
                                </div>}
                            {user?.kycStatus === "In-progress" &&
                                <div className={"flex flex-row gap-1 items-center bg-[#FF572240] p-2 rounded-lg"}>
                                    <IconRefreshCircle className={"shrink-0 text-black w-5 h-5"} />
                                    <span className={"font-bold"}>{translation.t('In-progress')}</span>
                                </div>}
                            {user?.kycStatus === "Approved" &&
                                <div className={"flex flex-row gap-1 items-center bg-success p-2 rounded-lg"}>
                                    <IconCheck className={"shrink-0 text-white w-5 h-5"} />
                                    <span className={"font-bold text-white"}>{translation.t('Approved')}</span>
                                </div>}
                        </div>
                    </div>
                    <p className={"font-bold"}>1. {translation.t('Upload your Passport')}</p>
                    <TakeOrUploadPhoto onUpload={setPassport} />
                    <p className={"font-bold"}>2. {translation.t('Upload your picture holding the passport')}</p>
                    <TakeOrUploadPhoto onUpload={setPictureHoldPassport} />
                    <div className={"flex flex-row justify-end gap-4"}>
                        <Link to={RoutePaths.myAccount}
                            className={"flex justify-center items-center gap-2 font-semibold rounded-lg py-4 px-6 border text-gray-600"}
                        >
                            <span className={"font-bold"}>{translation.t('Cancel')}</span>
                        </Link>
                        <button
                            disabled={isDisableSend}
                            onClick={handleClickSend}
                            className={"py-4 px-6 flex flex-row justify-center items-center gap-2 text-white font-semibold rounded-lg " + (isDisableSend ? " bg-primary_25" : " bg-primary")}
                        >
                            <span className={"font-bold"}>{translation.t('Send')}</span>
                            {isPending && <IconSpinner />}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {showErrorDialog  && <DialogFailureFullscreen onClose={() => setShowErrorDialog(false)} title='Upload Failed' subTitle={error?.message} />}
        {showSuccessDialog && 
            <DialogSuccessFullscreen 
                onClose={handleCloseSuccessKyc} 
                title='Submitted Successfully!' 
                subTitle='Please wait for reviewing'
                actionElement={<button className='bg-primary w-full rounded-lg py-3 text-white' onClick={handleCloseSuccessKyc}>{translation.t('Close')}</button>}
            /> }
    </>
}
