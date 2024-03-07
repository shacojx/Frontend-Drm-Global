import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { callApiCreateAccount } from "../api/account";
import { CompanyTypeValue, EntityEnding, Industry, NationValue } from "../api/types";
import { DialogContainer } from "../components/DialogContainer";
import {
  DialogFailureFullscreen,
  DialogRequestingFullscreen,
  DialogSuccessFullscreen
} from "../components/DialogFormStatusFullscreen";
import { FormFieldTextArea } from "../components/FormFieldArea";
import { FormFieldEmail } from "../components/FormFieldEmail";
import { FormFieldPassword } from "../components/FormFieldPassword";
import { FormFieldPhoneNumber } from "../components/FormFieldPhoneNumber";
import { FormFieldSelect } from "../components/FormFieldSelect";
import { FormFieldText } from "../components/FormFieldText";
import { IconAddCircle, IconArrowLeft } from "../components/icons";
import { COMPANY_TYPE_INFOS, ENTITY_ENDING_INFOS, INDUSTRY_INFOS, NATION_INFOS } from "../constants/SelectionOptions";
import { useValidateCaller } from "../hooks-ui/useValidateCaller";
import { PageLayoutOneForm } from "../layouts/PageLayoutOneForm";
import { RNPhoneValue } from "../services-business/api/generate-api-param/generatePhone";
import { generateRegisterParam } from "../services-business/api/generate-api-param/generateRegisterParam";
import { FormStatus } from "../types/common";
import { RoutePaths } from "./router";

export function RegisterPage() {
  const translation = useTranslation()
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState<number>(1)
  const {validateCaller: validateNationStepCaller, validateAll: validateNationStepAll} = useValidateCaller()
  const [nation, setNation] = useState<NationValue>()
  const [isNationError, setIsNationError] = useState<boolean>()
  // step 2
  const [email, setEmail] = useState<string>()
  const [phone, setPhone] = useState<RNPhoneValue>()
  const [companyType, setCompanyType] = useState<CompanyTypeValue>()
  const [firstName, setFirstName] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  // step 3
  const [companyName, setCompanyName] = useState<string>()
  const [entityEnding, setEntityEnding] = useState<EntityEnding>()
  const [industry, setIndustry] = useState<Industry>()
  const [website, setWebsite] = useState<string>()
  const [companyDescription, setCompanyDescription] = useState<string>()
  // step 4
  const [password, setPassword] = useState<string>('')
  const [rePassword, setRePassword] = useState<string>('')

  const [status, setStatus] = useState<FormStatus>('typing')
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  const SelectNationStepIndex = 1
  const AccountInformationStepIndex = 2
  const CompanyInformationStepIndex = 3
  const CreateAccountStepIndex = 4
  const FirstStep = SelectNationStepIndex
  const LastStep = CreateAccountStepIndex

  function handleClickNextStep() {
    if (stepIndex < LastStep) {
      setStepIndex(stepIndex + 1)
    }
  }
  function handleClickBackStep() {
    if (stepIndex > FirstStep) {
      setStepIndex(stepIndex - 1)
    }
  }
  function handleChangeNation(nation: NationValue) {
    setNation(nation)
    setIsNationError(false)
  }

  function handleClickNextAtNation() {
    if (validateNationStepAll()) {
      handleClickNextStep()
    }
  }

  async function handleClickCreateAccount() {
    if (!nation || !email || !phone || !companyType || !password || !rePassword || !firstName || !lastName) {
      return
    }
    setStatus('requesting')
    const createAccountParam = generateRegisterParam(
      nation,
      email,
      phone,
      companyType,
      firstName,
      lastName,
      password,
      rePassword,
      companyName,
      entityEnding,
      industry,
      website,
      companyDescription,
    )
    try {
      await callApiCreateAccount(createAccountParam)
      setStatus('success')
    } catch (e: unknown) {
      setStatus("failure")
      setErrorMessage(e?.toString())
      console.error(e)
    }
  }

  function handleClickBackToLogin() {
    navigate(RoutePaths.login)
  }

  return <PageLayoutOneForm>
    <p className="text-h4 text-center">{translation.t('Launch your new LLC in')}</p>
    <FormFieldSelect
      id={"nationSelect"}
      isRequired
      placeholder={translation.t('Choose nation')}
      value={nation}
      optionInfos={NATION_INFOS}
      onChange={handleChangeNation}
      validateCaller={validateNationStepCaller}
    />
    {stepIndex === SelectNationStepIndex && <button
      onClick={handleClickNextAtNation}
      className="h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
    >
      {translation.t('Continue')}
    </button>}
    {stepIndex === AccountInformationStepIndex &&
      <AccountInformationStep
        onClickNextStep={handleClickNextStep}
        onClickPreviousStep={handleClickBackStep}
        email={email}
        phone={phone}
        companyType={companyType}
        firstName={firstName}
        lastName={lastName}
        setEmail={setEmail}
        setPhone={setPhone}
        setCompanyType={setCompanyType}
        setFirstName={setFirstName}
        setLastName={setLastName}
      />
    }
    {stepIndex >= CompanyInformationStepIndex &&
      <CompanyInformationStep
        onClickNextStep={handleClickNextStep}
        onClickPreviousStep={handleClickBackStep}
        companyName={companyName}
        setCompanyName={setCompanyName}
        entityEnding={entityEnding}
        setEntityEnding={setEntityEnding}
        industry={industry}
        setIndustry={setIndustry}
        website={website}
        setWebsite={setWebsite}
        companyDescription={companyDescription}
        setCompanyDescription={setCompanyDescription}
      />
    }
    {stepIndex === CreateAccountStepIndex &&
      <CreateAccountStep
        onClickCreateAccount={handleClickCreateAccount}
        onClickPreviousStep={handleClickBackStep}
        password={password}
        setPassword={setPassword}
        rePassword={rePassword}
        setRePassword={setRePassword}
      />
    }
    {status === 'requesting' &&
      <DialogRequestingFullscreen />
    }
    {status === 'success' &&
      <DialogSuccessFullscreen
        title={"Account successfully created"}
        subTitle={"Start your journey with us!"}
        actionElement={
          <button
            onClick={handleClickBackToLogin}
            className="w-full h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
          >
            <IconArrowLeft className={"text-white"}/>
            <span>{translation.t('Back to Log in')}</span>
          </button>
        }
      />
    }
    {status === 'failure' &&
      <DialogFailureFullscreen
        title="Failure!"
        subTitle={errorMessage || "Could not create account"}
        actionElement={
          <button
            onClick={handleClickCreateAccount}
            className="w-full min-w-[300px] h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
          >
            <span>{translation.t('Try again')}</span>
          </button>
        }
      />
    }
  </PageLayoutOneForm>
}

type AccountInformationStepProps = {
  onClickNextStep: () => void,
  onClickPreviousStep: () => void,
  email: string | undefined,
  setEmail: (value: string) => void,
  firstName: string | undefined,
  setFirstName: (value: string) => void,
  lastName: string | undefined,
  setLastName: (value: string) => void,
  phone: RNPhoneValue | undefined,
  setPhone: (value: RNPhoneValue) => void,
  companyType: CompanyTypeValue | undefined,
  setCompanyType: (value: CompanyTypeValue) => void,
}
function AccountInformationStep(props: AccountInformationStepProps) {
  const translation = useTranslation()
  const {validateCaller, validateAll} = useValidateCaller()

  function handleClickNext() {
    if (validateAll()) {
      props.onClickNextStep()
    }
  }

  return <div className="flex flex-col gap-y-8">
    <div className="flex flex-col w-fit gap-y-2">
      <p className="text-cLg font-bold">{translation.t('Account information')}</p>
      <div className="w-1/2 border-2 border-primary"></div>
    </div>
    <FormFieldEmail id="accountEmail" isRequired value={props.email} onChange={props.setEmail} validateCaller={validateCaller}/>
    <FormFieldPhoneNumber
      id={"phoneNumber"}
      placeholder={"Input number"}
      isRequired
      value={props.phone}
      onChange={props.setPhone}
      validateCaller={validateCaller}
    />
    <FormFieldSelect
      id={"companySelect"}
      isRequired
      label={'Company Type'}
      placeholder={'LLC'}
      value={props.companyType}
      optionInfos={COMPANY_TYPE_INFOS}
      onChange={props.setCompanyType}
      validateCaller={validateCaller}
    />
    <div className={"w-full flex gap-4"}>
      <FormFieldText
        id={"FirstName"}
        isRequired
        label="First Name"
        value={props.firstName}
        onChange={props.setFirstName}
        placeholder="Enter first name"
        validateCaller={validateCaller}
      />
      <FormFieldText
        id={"LastName"}
        isRequired
        label="Last Name"
        value={props.lastName}
        onChange={props.setLastName}
        placeholder="Enter last name"
        validateCaller={validateCaller}
      />
    </div>
    <button
      onClick={handleClickNext}
      className="h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
    >
      {translation.t('Next')}
    </button>
    <div className="flex w-full justify-center">
      <button onClick={props.onClickPreviousStep} className="flex items-center w-fit text-gray-400 text-sm gap-1 px-1">
        <IconArrowLeft/>
        <span>{translation.t('Previous step')}</span>
      </button>
    </div>
  </div>
}

type CompanyInformationStepProps = {
  onClickNextStep: () => void,
  onClickPreviousStep: () => void,
  companyName: string | undefined,
  setCompanyName: (value: string) => void,
  entityEnding: EntityEnding | undefined,
  setEntityEnding: (value: EntityEnding) => void,
  industry: Industry | undefined,
  setIndustry: (value: Industry) => void,
  website: string | undefined,
  setWebsite: (value: string) => void,
  companyDescription: string | undefined,
  setCompanyDescription: (value: string) => void,
}
function CompanyInformationStep(props: CompanyInformationStepProps) {
  const translation = useTranslation()
  const {validateCaller, validateAll} = useValidateCaller()
  function handleClickNext() {
    if (validateAll()) {
      props.onClickNextStep()
    }
  }

  const hasAnyValue = !!(props.companyName || props.entityEnding || props.industry || props.website || props.companyDescription)
  return <div className="flex flex-col gap-y-8">
    <div className="flex flex-col w-fit gap-y-2">
      <p className="text-cLg font-bold">{translation.t('Company information')}</p>
      <div className="w-1/2 border-2 border-primary"></div>
    </div>
    <FormFieldText
      id={"companyName"}
      label="Company name"
      value={props.companyName}
      onChange={props.setCompanyName}
      placeholder="Input company name"
      validateCaller={validateCaller}
    />
    <FormFieldSelect
      id={"entityEndingSelect"}
      label={'Entity Ending'}
      placeholder={'Choose ending'}
      value={props.entityEnding}
      optionInfos={ENTITY_ENDING_INFOS}
      onChange={props.setEntityEnding}
      validateCaller={validateCaller}
    />
    <FormFieldSelect
      id={"industrySelect"}
      label={'Industry'}
      placeholder={'Choose industry'}
      value={props.industry}
      optionInfos={INDUSTRY_INFOS}
      onChange={props.setIndustry}
      validateCaller={validateCaller}
    />
    <FormFieldText
      id={"website"}
      label="Website"
      value={props.website}
      onChange={props.setWebsite}
      placeholder="Company.com"
      validateCaller={validateCaller}
    />
    <FormFieldTextArea
      id={"companyDescription"}
      label="Company description"
      value={props.companyDescription}
      onChange={props.setCompanyDescription}
      placeholder="Describe your company"
      validateCaller={validateCaller}
    />
    <button
      onClick={handleClickNext}
      className="h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
    >
      {!hasAnyValue ? `${translation.t('Skip')} & ` : ''}{translation.t('Create account')}
    </button>
    <div className="flex w-full justify-center">
      <button onClick={props.onClickPreviousStep} className="flex items-center w-fit text-gray-400 text-sm gap-1 px-1">
        <IconArrowLeft/>
        <span>{translation.t('Previous step')}</span>
      </button>
    </div>
  </div>
}

type CreateAccountStepProps = {
  onClickCreateAccount: () => void,
  onClickPreviousStep: () => void,
  password: string | undefined,
  setPassword: (value: string) => void,
  rePassword: string | undefined,
  setRePassword: (value: string) => void,
}
function CreateAccountStep(props: CreateAccountStepProps) {
  const translation = useTranslation()
  const {validateCaller, validateAll} = useValidateCaller()
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true)

  function handleClickNext() {
    if (props.password !== props.rePassword) {
      setIsPasswordMatch(false)
      return
    }
    if (validateAll()){
      props.onClickCreateAccount()
    }
  }

  function handleChangeRePassword(rePass: string) {
    props.setRePassword(rePass)
    setIsPasswordMatch(true)
  }

  return <DialogContainer isCloseOnClickOverlay={false}>
    <div className="w-full justify-center items-center py-8 px-4 flex flex-col">
      <div className="w-full max-w-[400px] mx-4 flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-2">
          <p className="text-h4 text-center">{translation.t('Create account')} ?</p>
          <p className="text-cBase">{translation.t('To start your journey, enter your password in the box below')}!</p>
        </div>
        <FormFieldPassword
          id={"password"}
          label={"New password"}
          isRequired
          value={props.password}
          onChange={props.setPassword}
          validateCaller={validateCaller}
        />
        <div className={"space-y-2"}>
          <FormFieldPassword
            id={"rePassword"}
            label={"Re-enter password"}
            isRequired
            value={props.rePassword}
            onChange={handleChangeRePassword}
            onEnter={handleClickNext}
            validateCaller={validateCaller}
          />
          {!isPasswordMatch && <p className={"text-danger"}>{translation.t("The entered passwords do not match")}!</p>}
        </div>
        <button
          onClick={handleClickNext}
          className="h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
        >
          <IconAddCircle />
          {translation.t('Create account')}
        </button>
        <div className="flex w-full justify-center">
          <button onClick={props.onClickPreviousStep}
                  className="flex items-center w-fit text-gray-400 text-sm gap-1 px-1">
            <IconArrowLeft />
            <span>{translation.t('Previous step')}</span>
          </button>
        </div>
      </div>
    </div>
  </DialogContainer>
}
