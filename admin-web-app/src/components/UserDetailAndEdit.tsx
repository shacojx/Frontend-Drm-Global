import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ApiDeactiveParam, CompanyTypeValue, EntityEnding, Industry, NationValue, ViewedUser } from "../api/types";
import { callApiDeactiveAccount, callApiEditAccount } from "../api/userManagement";
import { FormFieldTextArea } from "../components/FormFieldArea";
import { FormFieldEmail } from "../components/FormFieldEmail";
import { FormFieldPhoneNumber } from "../components/FormFieldPhoneNumber";
import { FormFieldSelect } from "../components/FormFieldSelect";
import { FormFieldText } from "../components/FormFieldText";
import { IconSpinner } from "../components/icons";
import { COMPANY_TYPE_INFOS, ENTITY_ENDING_INFOS, INDUSTRY_INFOS, NATION_INFOS } from "../constants/SelectionOptions";
import { useValidateCaller } from "../hooks-ui/useValidateCaller";
import {
  generatePhone,
  RNPhoneValue
} from "../services-business/api/generate-api-param/account";
import { generateEditUserParam } from "../services-business/api/generate-api-param/userManagement";
import { DialogSuccessFullscreen } from "./DialogFormStatusFullscreen";
import ButtonCs from "./ButtonCs";

type Props = {
  userInfo: ViewedUser,
  onClose: () => void,
  onEdit: () => void,
}

export function UserDetailAndEdit(props: Props) {
  const translation = useTranslation()
  const {validateCaller, validateAll} = useValidateCaller()
  const [nation, setNation] = useState<NationValue>(props.userInfo.llcInNation)
  // step 2
  const [email, setEmail] = useState<string>(props.userInfo.email)
  const [phone, setPhone] = useState<RNPhoneValue>(generatePhone(props.userInfo.codePhone, props.userInfo.phone))
  const [companyType, setCompanyType] = useState<CompanyTypeValue>(props.userInfo.companyType)
  const [firstName, setFirstName] = useState<string>(props.userInfo.firstName)
  const [lastName, setLastName] = useState<string>(props.userInfo.lastName)
  // step 3
  const [companyName, setCompanyName] = useState<string>(props.userInfo.companyName)
  const [entityEnding, setEntityEnding] = useState<EntityEnding>(props.userInfo.entityEnding)
  const [industry, setIndustry] = useState<Industry>(props.userInfo.industry)
  const [website, setWebsite] = useState<string>(props.userInfo.website)
  const [companyDescription, setCompanyDescription] = useState<string>(props.userInfo.companyDescription)
  // step 4

  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isRequestingEnableOrDisable, setIsRequestingEnableOrDisable] = useState<boolean>(false)
  const [isViewMode, setIsViewMode] = useState<boolean>(true)

  const [showSuccessModal, setShowSuccessModal] = useState(false)

  function handleChangeNation(nation: NationValue) {
    setNation(nation)
  }

  async function handleClickSave() {
    if (!validateAll()) {
      return
    }
    setErrorMessage('')
    setIsSaving(true)
    try {
      const body = generateEditUserParam(
        props.userInfo.id,
        props.userInfo.enable,
        nation,
        email,
        phone,
        companyType,
        firstName,
        lastName,
        companyName,
        entityEnding,
        industry,
        website,
        companyDescription,
      )

      await callApiEditAccount(body)
      setIsSaving(false)
      setIsViewMode(true)
      props.onEdit()
    } catch (e: unknown) {
      setIsSaving(false)
      setErrorMessage(e?.toString())
      console.error(e)
    }
  }

  async function changeEnableUser(isEnable: boolean) {
    setErrorMessage('')
    setIsRequestingEnableOrDisable(true)
    try {
      const body: ApiDeactiveParam = {
        idUser: props.userInfo.id,
        enable: isEnable ? 1 : 0
      }
      await callApiDeactiveAccount(body)
      setIsRequestingEnableOrDisable(false)
      setShowSuccessModal(true)
      props.onEdit()
    } catch (e: unknown) {
      setIsRequestingEnableOrDisable(false)
      setErrorMessage(e?.toString())
      console.error(e)
    }
  }

  return <div className={"flex flex-col gap-y-8"}>
    <div className={"flex flex-row justify-between items-end"}>
      <div className={"flex flex-row gap-3 items-end"}>
        <p className="text-h4 text-center">{translation.t('User Detail')}</p>
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
      {props.userInfo.enable
        ? <button
          onClick={changeEnableUser.bind(undefined, false)}
          className="px-4 py-2 flex justify-center items-center gap-2 bg-danger text-white font-semibold rounded-lg"
        >
          {translation.t('Inactive')}
          {isRequestingEnableOrDisable && <IconSpinner/>}
        </button>
        : <button
          onClick={changeEnableUser.bind(undefined, true)}
          className="px-4 py-2 flex justify-center items-center gap-2 bg-success text-white font-semibold rounded-lg"
        >
          {translation.t('Active')}
          {isRequestingEnableOrDisable && <IconSpinner/>}
        </button>
      }
    </div>
    <p className={"text-danger -my-6"}>{errorMessage}</p>
    <FormFieldSelect
      id={"nationSelect"}
      isRequired
      value={nation}
      optionInfos={NATION_INFOS}
      onChange={handleChangeNation}
      validateCaller={validateCaller}
      isFixedValue={isViewMode}
    />
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col w-fit gap-y-2">
        <p className="text-cLg font-bold">{translation.t('Account information')}</p>
        <div className="w-1/2 border-2 border-primary"></div>
      </div>
      <FormFieldEmail
        id="accountEmail"
        isRequired
        value={email}
        onChange={setEmail}
        validateCaller={validateCaller}
        isFixedValue={isViewMode}
      />
      <FormFieldPhoneNumber
        id={"phoneNumber"}
        placeholder={"Input number"}
        isRequired
        value={phone}
        onChange={setPhone}
        validateCaller={validateCaller}
        isFixedValue={isViewMode}
      />
      <FormFieldSelect
        id={"companySelect"}
        isRequired
        label={'Company Type'}
        placeholder={'LLC'}
        value={companyType}
        optionInfos={COMPANY_TYPE_INFOS}
        onChange={setCompanyType}
        validateCaller={validateCaller}
        isFixedValue={isViewMode}
      />
      <div className={"w-full flex gap-4"}>
        <FormFieldText
          id={"FirstName"}
          isRequired
          label="First Name"
          value={firstName}
          onChange={setFirstName}
          placeholder="Enter first name"
          validateCaller={validateCaller}
          isFixedValue={isViewMode}
        />
        <FormFieldText
          id={"LastName"}
          isRequired
          label="Last Name"
          value={lastName}
          onChange={setLastName}
          placeholder="Enter last name"
          validateCaller={validateCaller}
          isFixedValue={isViewMode}
        />
      </div>
    </div>
    {/* <div className="flex flex-col gap-y-8">
      <div className="flex flex-col w-fit gap-y-2">
        <p className="text-cLg font-bold">{translation.t('Company information')}</p>
        <div className="w-1/2 border-2 border-primary"></div>
      </div>
      <FormFieldText
        id={"companyName"}
        label="Company name"
        value={companyName}
        onChange={setCompanyName}
        placeholder="Input company name"
        validateCaller={validateCaller}
        isFixedValue={isViewMode}
      />
      <FormFieldSelect
        id={"entityEndingSelect"}
        label={'Entity Ending'}
        placeholder={'Choose ending'}
        value={entityEnding}
        optionInfos={ENTITY_ENDING_INFOS}
        onChange={setEntityEnding}
        validateCaller={validateCaller}
        isFixedValue={isViewMode}
      />
      <FormFieldSelect
        id={"industrySelect"}
        label={'Industry'}
        placeholder={'Choose industry'}
        value={industry}
        optionInfos={INDUSTRY_INFOS}
        onChange={setIndustry}
        validateCaller={validateCaller}
        isFixedValue={isViewMode}
      />
      <FormFieldText
        id={"website"}
        label="Website"
        value={website}
        onChange={setWebsite}
        placeholder="Company.com"
        validateCaller={validateCaller}
        isFixedValue={isViewMode}
      />
      <FormFieldTextArea
        id={"companyDescription"}
        label="Company description"
        value={companyDescription}
        onChange={setCompanyDescription}
        placeholder="Describe your company"
        validateCaller={validateCaller}
        isFixedValue={isViewMode}
      />
    </div> */}

    {showSuccessModal && <DialogSuccessFullscreen 
      onClose={() => setShowSuccessModal(false)} 
      title="Update user status successfully!" 
      actionElement={<ButtonCs onClick={() => setShowSuccessModal(false)}>Close</ButtonCs>}
    />}
  </div>
}
