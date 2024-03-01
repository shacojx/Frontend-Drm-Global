import React from "react";
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { useTranslation } from "react-i18next";
import { classNames } from "../services-ui/tailwindcss";
import { OptionInfo } from "../types/common";
import { IconCheck, IconAltArrowDown } from "./icons";

type Props<T extends React.Key> = {
  onChange: (value: T) => void,
  optionInfos: OptionInfo<T>[],
} & Partial<{
  label: string,
  value: T,
  placeholder: string,
  isRequired: boolean,
}>

export function FormFieldSelect<T extends React.Key>(props: Props<T>) {
  const translation = useTranslation()
  function onChangeOption(option: T) {
    props.onChange(option)
  }

  function findOptionInfo(value: T | undefined) {
    return props.optionInfos.find(info => info.value === value)
  }

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
              className="relative w-full min-h-10 cursor-default rounded-md py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
            >
              <span className="flex items-center">
                {findOptionInfo(props.value)?.iconElement}
                <span className={"ml-3 block truncate " + (!props.value ? 'text-gray-400' : 'text-cBase font-bold')}>
                  {translation.t(findOptionInfo(props.value)?.label || props.placeholder || '')}
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
                {props.optionInfos.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={option.value}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          {findOptionInfo(props.value)?.iconElement}
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {translation.t(option.label)}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
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
        </>
      )}
    </Listbox>
  </div>
}
