import React from "react";

export type FormStatus = 'typing' | 'requesting' | 'success' | 'error'
type OptionInfo<T extends React.Key > = {
  value: T,
  label: string,
  iconElement?: JSX.Element,
}
export type ValidateFunction<T> = (isRequired: FormFieldProps<T>['isRequired'], value: FormFieldProps<T>['value']) => boolean
type ValidateHock = () => boolean
type ValidateCaller = Record<string, ValidateHock>
type FormFieldProps<T> = {
  id: string,
  validateCaller: ValidateCaller
  onChange: (value: T) => void,
} & Partial<{
  label: string,
  isRequired: boolean,
  placeholder: string,
  value: T,
  errorMessage: string,
}>
