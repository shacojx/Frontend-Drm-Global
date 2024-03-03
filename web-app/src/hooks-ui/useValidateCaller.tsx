import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FormFieldProps, ValidateCaller, ValidateFunction, ValidateHock } from "../types/common";

export function useValidateCaller(): {validateCaller: ValidateCaller, validateAll: ValidateHock} {
  const validateCallerRef = useRef<ValidateCaller>({})
  function callAllValidate() {
    return Object.values(validateCallerRef.current)
      .map(validateHook => validateHook())
      .find(isValid => !isValid) === undefined
  }

  return {
    validateCaller: validateCallerRef.current,
    validateAll: callAllValidate
  }
}

export function useValidate<T>(
  id: FormFieldProps<T>['id'],
  isRequired: FormFieldProps<T>['isRequired'],
  value: FormFieldProps<T>['value'],
  validateCaller: ValidateCaller,
  validateFunction?: ValidateFunction<T>,
): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [shouldShowError, setShouldShowError] = useState<boolean>(false)

  const defaultValidate: ValidateFunction<T> = function (isRequired, value) {
    return !isRequired || (isRequired && !!value)
  }

  useEffect(() => {
    function validateHook() {
      const isValid = (validateFunction || defaultValidate)(isRequired, value)
      setShouldShowError(!isValid)
      return isValid
    }
    validateCaller[id] = validateHook
  }, [isRequired, value]);

  return [shouldShowError, setShouldShowError]
}
