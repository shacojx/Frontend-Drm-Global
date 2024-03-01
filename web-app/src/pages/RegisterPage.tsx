import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormFieldEmail } from "../components/FormFieldEmail";
import { FormFieldPhoneNumber } from "../components/FormFieldPhoneNumber";
import { FormFieldSelect } from "../components/FormFieldSelect";
import { IconArrowLeft } from "../components/icons";
import { COMPANY_TYPE_INFOS, NATION_INFOS } from "../constants/SelectionOptions";
import { PageLayoutOneForm } from "../layouts/PageLayoutOneForm";
import { RNPhoneValue } from "../services-business/api/generate-api-param/generatePhone";

type Props = {}

export function RegisterPage(props: Props) {
  const translation = useTranslation()
  const [nation, setNation] = useState<NationValue>()
  const [stepIndex, setStepIndex] = useState<number>(2) // TODO set init to 1

  const SelectNationStepIndex = 1
  const AccountInformationStepIndex = 2

  function handleChangeNation(nation: NationValue) {
    setNation(nation)
  }

  function handleClickNextStep() {
    setStepIndex(index => index + 1)
  }
  function handleClickBackStep() {
    setStepIndex(index => index - 1)
  }

  return <PageLayoutOneForm>
    <p className="text-h4 text-center">{translation.t('Launch your new LLC in')}</p>
    <FormFieldSelect
      placeholder={translation.t('Choose nation')}
      value={nation}
      optionInfos={NATION_INFOS}
      onChange={handleChangeNation}
    />
    {stepIndex === SelectNationStepIndex && <button
      onClick={handleClickNextStep}
      className="h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
    >
      {translation.t('Continue')}
    </button>}
    {stepIndex === AccountInformationStepIndex &&
      <AccountInformationStep
        onClickNextStep={handleClickNextStep}
        onClickPreviousStep={handleClickBackStep}
      />
    }
  </PageLayoutOneForm>
}

type AccountInformationStepProps = {
  onClickNextStep: () => void
  onClickPreviousStep: () => void
}
function AccountInformationStep(props: AccountInformationStepProps) {
  const translation = useTranslation()
  const [email, setEmail] = useState<string>()
  const [phone, setPhone] = useState<RNPhoneValue>()
  const [companyType, setCompanyType] = useState<CompanyTypeValue>()

  return <div className="flex flex-col gap-y-8">
    <div className="flex flex-col w-fit gap-y-2">
      <p className="text-cLg font-bold">{translation.t('Account information')}</p>
      <div className="w-1/2 border-2 border-primary"></div>
    </div>
    <FormFieldEmail isRequired value={email} onChange={setEmail} />
    <FormFieldPhoneNumber value={phone} onChange={setPhone} />
    <FormFieldSelect
      isRequired
      label={'Company Type'}
      placeholder={'LLC'}
      value={companyType}
      optionInfos={COMPANY_TYPE_INFOS}
      onChange={setCompanyType}
    />
    <button
      onClick={props.onClickNextStep}
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

function CompanyInformationStep() {

}
