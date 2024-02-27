import { useTranslation } from "react-i18next";

type Props = {}

export function FormFieldEmail(props: Props) {
  const translation = useTranslation()

  return <div className="flex flex-col gap-2">
    <p className="text-cBase font-bold">{translation.t('Email address')}</p>
    <input className="h-[40px] border py-1 px-2 rounded-lg" type="email" placeholder="Example@hotmail.com"/>
  </div>
}
