import { ChangeEvent, createRef, RefObject, useState } from "react";

type Props = {
  otpLength: number,
  onInputOtp: (otp: string) => void,
  onLastOtp: () => void
}

export function FormFieldOtp(props: Props) {
  const [focusIndex, setFocusIndex] = useState<number| undefined>(0)
  const [otp, setOtp] = useState<string[]>([])
  const [inputRefsArray] = useState(() =>
    Array.from({ length: props.otpLength }, () => createRef<HTMLInputElement>())
  );
  function handleEnterOtp(index: number, value: string) {
    const otpEnter = [...otp]
    if (otpEnter[index] === value) {
      return
    }
    otpEnter[index] = value
    setOtp(otpEnter)
    props.onInputOtp(otpEnter.join(''))
    if (value) {
      blurInput(index)
      focusInput(index + 1)
    }
    if (index === props.otpLength - 1) {
      props.onLastOtp()
    }
  }

  function handleClickOtpCharacter(index: number) {
    focusInput(index)
  }

  function focusInput(index: number) {
    if (index < inputRefsArray.length) {
      setFocusIndex(index)
      inputRefsArray[index].current?.focus()
      const lengthOfInput = inputRefsArray[index].current?.value.length
      lengthOfInput && inputRefsArray[index].current?.setSelectionRange(lengthOfInput, lengthOfInput);
    }
  }

  function blurInput(index: number) {
    setFocusIndex(undefined)
    inputRefsArray[index].current?.blur()
  }

  const optInputCount = '0123456789'.slice(0, props.otpLength)

  return <div className={"flex flex-row justify-center gap-4"}>
    {optInputCount.split('').map(otpIndex =>
      <OtpCharacter
        key={otpIndex}
        inputRef={inputRefsArray[+otpIndex]}
        value={otp[+otpIndex] || ''}
        isFocus={focusIndex === +otpIndex}
        onEnter={character => handleEnterOtp(+otpIndex, character)}
        onClick={handleClickOtpCharacter.bind(undefined, +otpIndex)}
      />
    )}

  </div>
}

type OtpCharacterProps = {
  value: string,
  isFocus: boolean,
  onEnter: (character: string) => void,
  onClick: () => void,
  inputRef: RefObject<HTMLInputElement> | undefined
}

export function OtpCharacter(props: OtpCharacterProps) {
  function handleKeyDown(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    const number = extractNumbers(value)
    if (number.length > 0) {
      props.onEnter(number[number.length - 1])
    }
  }
  function extractNumbers(text: string): string {
    const regex = /\d+/g;
    const matches = text.match(regex);
    if (matches) {
      return matches.join('');
    }
    return '';
  }

  return <input
      onClick={props.onClick}
      ref={props.inputRef}
      value={props.value}
      onChange={handleKeyDown}
      className={"w-12 h-12 text-center caret-transparent cursor-pointer font-bold text-xl bg-[#ffffff] rounded-xl flex items-center justify-center border focus:outline-none focus:bg-primary_25"}
    />
}
