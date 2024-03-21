import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ApiDeactiveParam, CompanyTypeValue, EntityEnding, Industry, NationValue, ViewedMasterService, ApiDeactiveMasterServiceParam, AppliedNation } from "../api/types";
import { callApiDeactiveMasterService, callApiEditMasterService } from "../api/masterServiceManagement";
import { FormFieldTextArea } from "./FormFieldArea";
import { FormFieldEmail } from "./FormFieldEmail";
import { FormFieldPhoneNumber } from "./FormFieldPhoneNumber";
import { FormFieldSelect } from "./FormFieldSelect";
import { FormFieldText } from "./FormFieldText";
import { IconSpinner } from "./icons";
import { COMPANY_TYPE_INFOS, ENTITY_ENDING_INFOS, INDUSTRY_INFOS, NATION_INFOS } from "../constants/SelectionOptions";
import { useValidateCaller } from "../hooks-ui/useValidateCaller";
import {
  generatePhone,
  RNPhoneValue
} from "../services-business/api/generate-api-param/account";
import { generateEditMasterServiceParam } from "../services-business/api/generate-api-param/masterServiceManagement";

type Props = {
  masterServiceInfo: ViewedMasterService,
  onClose: () => void,
  onEdit: () => void,
}

export function MasterServiceDetailAndEdit(props: Props) {
  const translation = useTranslation()
  const {validateCaller, validateAll} = useValidateCaller()
  // const [nation, setNation] = useState<AppliedNation[]>(props.masterServiceInfo.appliedNation)
  // // step 2
  // const [email, setEmail] = useState<string>(props.masterServiceInfo.email)
  // const [phone, setPhone] = useState<RNPhoneValue>(generatePhone(props.masterServiceInfo.codePhone, props.masterServiceInfo.phone))
  // const [companyType, setCompanyType] = useState<CompanyTypeValue>(props.masterServiceInfo.companyType)
  // const [firstName, setFirstName] = useState<string>(props.masterServiceInfo.firstName)
  // const [lastName, setLastName] = useState<string>(props.masterServiceInfo.lastName)
  // // step 3
  // const [companyName, setCompanyName] = useState<string>(props.masterServiceInfo.companyName)
  // const [entityEnding, setEntityEnding] = useState<EntityEnding>(props.masterServiceInfo.entityEnding)
  // const [industry, setIndustry] = useState<Industry>(props.masterServiceInfo.industry)
  // const [website, setWebsite] = useState<string>(props.masterServiceInfo.website)
  // const [companyDescription, setCompanyDescription] = useState<string>(props.masterServiceInfo.companyDescription)
  // // step 4

  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isRequestingEnableOrDisable, setIsRequestingEnableOrDisable] = useState<boolean>(false)
  const [isViewMode, setIsViewMode] = useState<boolean>(true)

  // function handleChangeNation(nation: NationValue) {
  //   setNation(nation)
  // }

  async function handleClickSave() {
    if (!validateAll()) {
      return
    }
    setErrorMessage('')
    setIsSaving(true)
    try {
      // const body = generateEditMasterServiceParam(
      //   props.masterServiceInfo.id,
      //   props.masterServiceInfo.enable,
      //   nation,
      //   email,
      //   phone,
      //   companyType,
      //   firstName,
      //   lastName,
      //   companyName,
      //   entityEnding,
      //   industry,
      //   website,
      //   companyDescription,
      // )

      // await callApiEditMasterService(body)
      setIsSaving(false)
      setIsViewMode(true)
      props.onEdit()
    } catch (e: unknown) {
      setIsSaving(false)
      setErrorMessage(e?.toString())
      console.error(e)
    }
  }

  // async function changeEnableMasterService(isEnable: boolean) {
  //   setErrorMessage('')
  //   setIsRequestingEnableOrDisable(true)
  //   try {
  //     const body: ApiDeactiveParam = {
  //       idUser: props.masterServiceInfo.id,
  //       enable: isEnable ? 1 : 0
  //     }
  //     await callApiDeactiveMasterService(body)
  //     setIsRequestingEnableOrDisable(false)
  //     props.onEdit()
  //   } catch (e: unknown) {
  //     setIsRequestingEnableOrDisable(false)
  //     setErrorMessage(e?.toString())
  //     console.error(e)
  //   }
  // }

  return <div className={"flex flex-col gap-y-8 px-8"}>
    <div className={"flex flex-row justify-between items-end"}>
      <div className={"flex flex-row gap-3 items-end"}>
        <p className="text-h4 text-center">{translation.t('MasterService Detail')}</p>
        {isViewMode
          ? <button
            onClick={setIsViewMode.bind(undefined, false)}
            className="px-4 py-2 flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
          >
            {translation.t('Edit')}
          </button>
          : <button
            onClick={handleClickSave}
            className="px-4 py-2 flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
          >
            {translation.t('Save')}
            {isSaving && <IconSpinner/>}
          </button>
        }
      </div>
      {props.masterServiceInfo.enable
        ? <button
          onClick={() => {}}
          className="px-4 py-2 flex justify-center items-center gap-2 bg-danger text-white font-semibold rounded-lg"
        >
          {translation.t('Disable')}
          {isRequestingEnableOrDisable && <IconSpinner/>}
        </button>
        : <button
          onClick={() => {}}
          className="px-4 py-2 flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
        >
          {translation.t('Enable')}
          {isRequestingEnableOrDisable && <IconSpinner/>}
        </button>
      }
    </div>
    <p className={"text-danger -my-6"}>{errorMessage}</p>
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col w-fit gap-y-2">
        <p className="text-cLg font-bold">{translation.t('MasterService information')}</p>
        <div className="w-1/2 border-2 border-primary"></div>
      </div>
      <div className={"w-full flex gap-4"}>
      </div>
    </div>
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col w-fit gap-y-2">
        <p className="text-cLg font-bold">{translation.t('Company information')}</p>
        <div className="w-1/2 border-2 border-primary"></div>
      </div>
    </div>
  </div>
}
