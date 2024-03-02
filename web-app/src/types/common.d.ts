import React from "react";

export type FormStatus = 'typing' | 'requesting' | 'success' | 'error'
type OptionInfo<T extends React.Key > = {
  value: T,
  label: string,
  iconElement?: JSX.Element,
}
type ValidateHock = () => boolean
type ValidateCaller = Record<string, ValidateHock>
type FormFieldProps<T> = {
  id: string,
  validateCaller: ValidateCaller
  onChange: (value: T) => void,
} & Partial<{
  value: T,
  isRequired: boolean,
}>
