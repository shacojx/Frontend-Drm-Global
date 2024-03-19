import { ChangeEvent, createRef, LegacyRef, RefObject, useState } from "react";

type Props = {
  otpLength: number,
  onInputOtp: (otp: string) => void,
}

export function FormFieldOtp(props: Props) {
  const [focusIndex, setFocusIndex] = useState<number>(0)
  const [otp, setOtp] = useState<string[]>([])
  const [inputRefsArray] = useState(() =>
    Array.from({ length: props.otpLength }, () => createRef<HTMLInputElement>())
  );
  function handleEnterOtp(index: number, value: string) {
    const otpEnter = [...otp]
    otpEnter[index] = value
    setOtp(otpEnter)
    props.onInputOtp(otpEnter.join(''))
    if (value) {
      console.log(index + 1)
      inputRefsArray[index + 1].current?.focus()
    }
  }

  const optInputCount = '0123456789'.slice(0, props.otpLength)

  return <div className={"flex flex-row justify-center gap-4"}>
    {optInputCount.split('').map(otpIndex =>
      <OtpCharacter
        ref={inputRefsArray[+otpIndex]}
        value={otp[+otpIndex] || ''}
        isFocus={focusIndex === +otpIndex}
        onEnter={character => handleEnterOtp(+otpIndex, character)}
        onClick={setFocusIndex.bind(undefined, +otpIndex)}
      />
    )}

  </div>
}

type OtpCharacterProps = {
  value: string,
  isFocus: boolean,
  onEnter: (character: string) => void,
  onClick: () => void,
  ref: RefObject<HTMLInputElement> | undefined
}

export function OtpCharacter(props: OtpCharacterProps) {
  function handleKeyDown(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    if (!value) {
      props.onEnter('')
    } else {
      props.onEnter(value[value.length - 1])
    }
  }

  return <div onClick={props.onClick} className={"w-12 h-12 bg-[#ffffff] rounded-xl flex items-center justify-center border focus:bg-primary_25 " + (props.isFocus ? "bg-primary_25" : "")}>
    <input
      ref={props.ref}
      value={props.value}
      onChange={handleKeyDown}
      className={"w-2 font-bold bg-[#ffffff] focus:outline-none"}
    />
  </div>
}
