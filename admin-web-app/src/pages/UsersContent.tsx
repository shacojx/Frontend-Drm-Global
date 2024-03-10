import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormFieldEmail } from "../components/FormFieldEmail";
import { FormFieldPhoneNumber } from "../components/FormFieldPhoneNumber";
import { useValidateCaller } from "../hooks-ui/useValidateCaller";
import { generatePhone, RNPhoneValue } from "../services-business/api/generate-api-param/account";

type Props = {}

export function UsersContent(props: Props) {
  const translation = useTranslation()
  const {validateCaller, validateAll} = useValidateCaller()
  const [email,setEmail] = useState<string>('')
  const [phone, setPhone] = useState<RNPhoneValue | undefined>()

  function handleClickSearch() {

  }

  return <div className={"w-full grow flex flex-col p-3"}>
    <div className={"flex flex-col grow overflow-x-hidden overflow-y-scroll bg-white rounded justify-start items-center py-6 px-4 sm:px-8"}>
      <p className={"text-h4 w-full text-start mb-6"}>{translation.t('User Management')}</p>
      <div className={"w-full flex flex-row justify-start items-end gap-10 mb-4"}>
        <FormFieldEmail id={"email"} validateCaller={validateCaller} onChange={setEmail} value={email}/>
        <FormFieldPhoneNumber id={"phone"} validateCaller={validateCaller} onChange={setPhone} value={phone} placeholder={"Input number"}/>
        <button onClick={handleClickSearch} className="h-[52px] px-6 flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg">
          {translation.t('Search')}
        </button>
      </div>

    </div>
  </div>
}
