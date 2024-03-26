import React, { ChangeEvent, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useValidate } from "../hooks-ui/useValidateCaller";
import { FormFieldProps } from "../types/common";
import clsx from "clsx";
import { IconInfoCircle } from "./icons";

type FormFieldTextProps = FormFieldProps<string> & {
  min?: number
  max?: number
  tooltip?: ReactNode
}

export function FormFieldText(props: FormFieldTextProps) {
  const translation = useTranslation();
  const [shouldShowError, setShouldShowError] = useValidate(
    props.id,
    props.isRequired,
    props.value,
    props.validateCaller
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const text = event.target.value;
    props.onChange(text);
  }

  const isTextValid = !props.isRequired || !!props.value;
  const statusClassName = shouldShowError
    ? "border-danger bg-red-50"
    : "bg-white";
  return <div className={clsx("flex flex-col gap-2", props.className)}>
    {!!props.label && (
      <p className="flex text-cBase font-bold gap-1 items-center">
        <span>{translation.t(props.label)}</span>
        {props.isRequired && <span className="text-danger">*</span>}
        {props.tooltip && (
          <div className="relative group/tooltip">
            <IconInfoCircle  />
            <div className="z-20 min-w-72 max-w-96 absolute font-normal hidden group-hover/tooltip:block bg-white p-3 px-6 rounded-xl shadow-form">
              {props.tooltip}
            </div>
          </div>
        )}
      </p>
    )}
    <input
      type="text"
      value={props.value || ""}
      onChange={handleChange}
      onFocus={setShouldShowError.bind(undefined, false)}
      onBlur={setShouldShowError.bind(undefined, !isTextValid)}
      placeholder={props.placeholder}
      className={clsx(
        "w-full h-[40px] rounded-lg",
        statusClassName,
        props.isFixedValue ? "border-none outline-none" : "border py-1 px-2"
      )}
      readOnly={props.isFixedValue}
      minLength={props.min}
      maxLength={props.max}
    />
  </div>
}
