import { useValidate } from "../hooks-ui/useValidateCaller";
import { classNames } from "../services-ui/tailwindcss";
import { FormFieldProps, OptionInfo } from "../types/common";
import { IconCheck, IconAltArrowDown } from "./icons";
import { useTranslation } from "react-i18next";
import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";
import { cn } from "src/utils/cn.util";

type Props<T extends React.Key> = FormFieldProps<T> & {
  optionInfos: OptionInfo<T>[],
} & Partial<{
  minWidth: string
}>

export function FormFieldSelect<T extends React.Key>(props: Props<T>) {
  const translation = useTranslation()
  const [shouldShowError, setShouldShowError] = useValidate(
    props.id,
    props.isRequired,
    props.value,
    props.validateCaller
  )
  function onChangeOption(option: T) {
    props.onChange(option)
    setShouldShowError(!option)
  }

  function findOptionInfo(value: T | undefined) {
    return props.optionInfos.find(info => info.value === value)
  }

  const statusClassName = shouldShowError
    ? "border-danger bg-red-50"
    : "bg-white"
  return <div>
    <Listbox onChange={onChangeOption}>
      {({ open }) => (
        <>
          {!!props.label && <Listbox.Label className="flex text-cBase font-bold gap-1 mb-2">
            <span>{translation.t(props.label)}</span>
            {props.isRequired && <span className="text-danger">*</span>}
          </Listbox.Label>}
          <div className="relative">
            <Listbox.Button
              onFocus={setShouldShowError.bind(undefined, false)}
              className={clsx(
                "relative w-full min-h-10 cursor-default rounded-md text-left text-gray-900 sm:text-sm sm:leading-6",
                statusClassName,
                props.isFixedValue
                  ? "border-0 outline-none pointer-events-none"
                  : "border border-solid focus:outline-none focus:ring-2 focus:ring-indigo-500 py-2 pl-3 pr-10"
              )}
              style={{ minWidth: props.minWidth || "0px" }}
            >
                <span className="flex items-center gap-1">
                  {findOptionInfo(props.value)?.iconElement}
                  <span
                    className={
                      cn("block truncate", !props.value ? "text-gray-400" : "text-cBase", props.className)
                    }
                  >
                    {translation.t(
                      findOptionInfo(props.value)?.label ||
                      props.placeholder ||
                      ""
                    )}
                  </span>
                </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  {!props.isFixedValue && (
                    <IconAltArrowDown className="text-gray-400" />
                  )}
                </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={clsx(
                  "absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                )}
              >
                {props.optionInfos.map((option, index) => (
                  <Listbox.Option
                    key={option.value + "_" + index}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={option.value}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          {option.iconElement}
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block"
                            )}
                          >
                              {translation.t(option.label)}
                            </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <IconCheck className="text-success" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
          {!!props.errorMessage && <p>{translation.t(props.errorMessage)}</p>}
        </>
      )}
    </Listbox>
  </div>
}
