import { ChangeEvent, useState } from "react";

export function useFormFieldBaseHandler(onChange: (value: string) => void) {
  const [isChanged, setIsChanged] = useState<boolean>(false)
  const [isFocus, setIsFocus] = useState<boolean>(false)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value
    onChange(newValue)
    setIsChanged(true)
  }

  function handleFocus() {
    setIsFocus(true)
  }
  function handleBlur(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value
    onChange(newValue)
    setIsFocus(false)
  }

  return {
    isChanged,
    isFocus,
    handleChange,
    handleFocus,
    handleBlur
  }
}
