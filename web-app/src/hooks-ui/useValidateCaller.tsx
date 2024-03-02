import { useRef } from "react";
import { ValidateCaller, ValidateHock } from "../types/common";

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
