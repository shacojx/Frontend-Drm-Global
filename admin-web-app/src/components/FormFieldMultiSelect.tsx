import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useValidate } from "../hooks-ui/useValidateCaller";
import { classNames } from "../services-ui/tailwindcss";
import { FormFieldMultiProps, OptionInfo } from "../types/common";
import { IconAltArrowDown, IconCheck } from "./icons";

type Props<T extends React.Key> = FormFieldMultiProps<T> & {
  optionInfos: OptionInfo<T>[];
} & Partial<{
    minWidth: string;
  }>;

export function FormFieldMultiSelect<T extends React.Key>(props: Props<T>) {
  const translation = useTranslation();
  const [shouldShowError, setShouldShowError] = useValidate(
    props.id,
    props.isRequired,
    props.value,
    props.validateCaller
  );
  function onChangeOption(option: T[]) {
    props.onChange(option);
    setShouldShowError(!option);
  }

  function findMultiOptionInfo(values: T[] | undefined) {
    return props.optionInfos.filter((info) => values?.includes(info.value));
  }

  const statusClassName = shouldShowError
    ? "border border-danger bg-red-50"
    : "bg-white";
  return (
    <div>
      <Listbox multiple onChange={onChangeOption} disabled={props.isFixedValue}>
        {({ open }) => (
          <>
            {!!props.label && (
              <Listbox.Label className="flex text-cBase font-bold gap-1 mb-2">
                <span>{translation.t(props.label)}</span>
                {props.isRequired && <span className="text-danger">*</span>}
              </Listbox.Label>
            )}
            <div className="relative">
              <Listbox.Button
                onFocus={setShouldShowError.bind(undefined, false)}
                className={
                  "relative w-full min-h-10 cursor-default rounded-md py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 " +
                  statusClassName
                }
                style={{ minWidth: props.minWidth || "0px" }}
              >
                <span className="flex items-center">
                  <span
                    className={
                      "ml-3 block truncate " +
                      (!Boolean(props?.value?.length)
                        ? "text-gray-400"
                        : "text-cBase font-bold")
                    }
                  >
                    {props?.value?.length ? props?.value?.join(", ") : props?.placeholder}
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <IconAltArrowDown className="text-gray-400" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                                "ml-3 block truncate"
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
            {!!props.errorComponent && props.errorComponent}
          </>
        )}
      </Listbox>
    </div>
  );
}
