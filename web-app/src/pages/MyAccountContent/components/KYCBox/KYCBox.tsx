import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { IconCheck, IconDangerCircle, IconRefreshCircle } from 'src/components/icons'
import { RoutePaths } from 'src/constants/routerPaths'
import { AuthContext } from 'src/contexts/AuthContextProvider'


  
export default function KYCBox() {
    const translation = useTranslation()
    const { user } = useContext(AuthContext)
  
    return <>
      <div className={"flex flex-row justify-between mb-8"}>
        <div className={"space-y-1"}>
          <p className={"font-bold"}>{translation.t('KYC')}</p>
          <div className={"h-[2px] w-[70px] bg-primary"}></div>
        </div>
        <div className={"flex flex-row gap-3 items-center"}>
          <span>{translation.t('Status')}:</span>
          {user?.kycStatus === 'Pending' && <div className={"flex flex-row gap-1 items-center bg-[#5D50C626] p-2 rounded-lg"}>
            <IconDangerCircle className={"shrink-0 text-black w-5 h-5"}/>
            <span className={"font-bold"}>{translation.t('Pending')}</span>
          </div>}
          {user?.kycStatus === "In-progress" && <div className={"flex flex-row gap-1 items-center bg-[#FF572240] p-2 rounded-lg"}>
            <IconRefreshCircle className={"shrink-0 text-black w-5 h-5"}/>
            <span className={"font-bold"}>{translation.t('In-progress')}</span>
          </div>}
          {user?.kycStatus === "Approved" && <div className={"flex flex-row gap-1 items-center bg-success p-2 rounded-lg"}>
            <IconCheck className={"shrink-0 text-white w-5 h-5"}/>
            <span className={"font-bold text-white"}>{translation.t('Approved')}</span>
          </div>}
        </div>
      </div>
      <div className={"space-y-6 grow"}>
        {user?.kycStatus === "Pending" && <div className={"flex flex-row gap-4 items-center p-2 bg-red-200 rounded-lg"}>
          <IconDangerCircle className={"shrink-0 text-danger"}/>
          <p>{translation.t('You have not verified your account. Please verify for the best experience')}.</p>
        </div>}
      </div>
      {user?.kycStatus === "Pending" && <div className={"flex justify-end"}>
        <Link to={RoutePaths.KYCUpload}
          className="py-4 px-6 mt-8 flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
        >
          {translation.t('Verify now')}
        </Link>
      </div>}
    </>
  }
