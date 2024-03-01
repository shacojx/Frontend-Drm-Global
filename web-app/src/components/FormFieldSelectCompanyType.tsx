import React from "react";
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { useTranslation } from "react-i18next";
import { COMPANY_TYPE_INFOS } from "../constants/SelectionOptions";
import { classNames } from "../services-ui/tailwindcss";
import { IconCheck, IconAltArrowDown } from "./icons";

type Props = {
  onChange: (value: CompanyTypeValue) => void
} & Partial<{
  value: CompanyTypeValue,
  placeholder: string,
}>

export function FormFieldSelectCompanyType(props: Props) {
  const translation = useTranslation()

  function onChangeOption(option: CompanyTypeValue) {
    props.onChange(option)
  }

  function findLabel(value: CompanyTypeValue | undefined) {
    return COMPANY_TYPE_INFOS.find(info => info.value === value)?.label
  }

  return <div>
    <Listbox onChange={onChangeOption}>
      {({ open }) => (
        <>
          <Listbox.Label className="flex text-cBase font-bold gap-1">
            <span>{translation.t('Company Type')}</span>
            <span className="text-danger">*</span>
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button
              className="relative w-full cursor-default rounded-md bg-white py-2.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className={"ml-3 block truncate " + (!props.value ? 'text-gray-400' : 'text-cBase font-bold')}>
                  {findLabel(props.value) || props.placeholder}
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
                {COMPANY_TYPE_INFOS.map((nationInfo) => (
                  <Listbox.Option
                    key={nationInfo.value}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={nationInfo.value}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {nationInfo.label}
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
