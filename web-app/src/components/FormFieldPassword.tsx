import { ChangeEvent, KeyboardEventHandler, useState } from "react";
import { useTranslation } from "react-i18next";
import { useClickOutside } from "../hooks-ui/useClickOutside";
import { useValidate } from "../hooks-ui/useValidateCaller";
import { validateApiPassword } from "../services-business/api/validateApiParam";
import { FormFieldProps, ValidateFunction } from "../types/common";
import { IconEyesClosed, IconEyesOpen, IconInfoCircle } from "./icons";
import { cn } from "src/utils/cn.util";

const validatePassword: ValidateFunction<string> = function (isRequired, pass) {
  if (!isRequired) {
    return true
  }
  if (!pass) {
    return false
  }

  const isValid = validateApiPassword(pass)
  return isValid
}

type Props = FormFieldProps<string> & Partial<{
  onEnter: () => void
  hideTooltip?: boolean
}>

export function FormFieldPassword(props: Props) {
  const translation = useTranslation()
  const [isDisplayPass, setIsDisplayPass] = useState<boolean>(false)
  const [showRules, setShowRules] = useState(false);
  const [shouldShowError, setShouldShowError] = useValidate<string>(
    props.id,
    props.isRequired,
    props.value,
    props.validateCaller,
    validatePassword
  )
  const ref = useClickOutside(() => setShowRules(false));

  function handleChangePassword(event: ChangeEvent<HTMLInputElement>) {
    const pass = event.target.value
    props.onChange(pass)
  }

  function handleClickOpenIcon() {
    setIsDisplayPass(true)
  }

  function handleClickClosedIcon() {
    setIsDisplayPass(false)
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = function (event) {
    if (event.key === 'Enter') {
      props.onEnter?.()
    }
  }

  const statusClassName = shouldShowError ? 'border-danger bg-red-50' : 'bg-white'
  return <div className="flex flex-col gap-2">
    <div className="text-cBase font-bold space-x-1 flex flex-row">
      <span>{translation.t(props.label || 'Password')}</span>
      {props.isRequired && <span className="text-danger">*</span>}
      <div className={"relative flex items-center"}>
        {!props.hideTooltip && <IconInfoCircle onClick={setShowRules.bind(undefined, true)} onBlur={setShowRules.bind(undefined, false)} />}
        {showRules && <div
          ref={ref}
          className={"absolute z-10 top-5 -left-8 w-[330px]"}
        >
          <svg className={"translate-x-8 shadow-form"} width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 8L16 8L9.41421 1.41421C8.63317 0.633164 7.36684 0.633164 6.58579 1.41421L0 8Z" fill="white"/>
          </svg>
          <div className={"bg-white p-3 px-6 rounded-xl shadow-form"}>
            <ul className={"list-disc pl-3 font-normal"}>
              <li>{translation.t('Be at least 8 characters long')}.</li>
              <li>{translation.t('Contain at least one letter and one number')}.</li>
              <li>{translation.t('Not contain any uppercase letters, spaces, or special characters')}.</li>
            </ul>
          </div>
        </div>}
      </div>
    </div>
    <div className="relative">
      <input
        type={isDisplayPass ? 'text' : 'password'}
        placeholder={props.placeholder}
        value={props.value}
        onChange={handleChangePassword}
        onFocus={setShouldShowError.bind(undefined, false)}
        onBlur={setShouldShowError.bind(undefined, !validatePassword(props.isRequired, props.value))}
        onKeyDown={props.onEnter && handleKeyDown}
        className={cn("w-full h-[40px] border py-1 px-2 rounded-lg ", statusClassName, props.className)}
      />
      {isDisplayPass
        ? <IconEyesClosed onClick={handleClickClosedIcon}
                          className="h-[18px] absolute top-[11px] right-[11px] text-gray-400"/>
        : <IconEyesOpen onClick={handleClickOpenIcon}
                        className="h-[18px] absolute top-[11px] right-[11px] text-gray-400"/>
      }
    </div>
  </div>;
}

function PasswordRulesToggle() {
  return (
    <div className="">
      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 8L16 8L9.41421 1.41421C8.63317 0.633164 7.36684 0.633164 6.58579 1.41421L0 8Z" fill="white"/>
      </svg>
      <div className="">
        <h2>Password Rules</h2>
        <p>Your password must:</p>
        <ul>
          <li>Be at least 8 characters long</li>
          <li>Contain at least one uppercase letter</li>
          <li>Contain at least one lowercase letter</li>
          <li>Contain at least one number</li>
          <li>Contain at least one special character</li>
        </ul>
      </div>
    </div>
  );
}
