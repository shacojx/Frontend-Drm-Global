import React from "react";
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { NATION_PHONE_INFOS } from "../constants/SelectionOptions";
import { NationPhone } from "../services-business/api/generate-api-param/generatePhone";
import { classNames } from "../services-ui/tailwindcss";
import { IconCheck, IconAltArrowDown } from "./icons";

type Props = {
  onChange: (value: NationPhone) => void
} & Partial<{
  value: NationPhone,
  placeholder: string,
}>

export function FormFieldSelectNationPhone(props: Props) {
  const [nationValue, setNationValue] = useState<NationPhone | undefined>(props.value)

  function onChangeOption(option: NationPhone) {
    setNationValue(option)
    props.onChange(option)
  }

  function findInfo(value: NationPhone | undefined) {
    return NATION_PHONE_INFOS.find(info => info.value === value)
  }

  return <div>
    <Listbox onChange={onChangeOption}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                {findInfo(nationValue)?.flag}
                <span className={"ml-3 block truncate " + (!nationValue ? 'text-gray-400' : 'text-cBase font-bold')}>
                  {findInfo(nationValue)?.label || NATION_PHONE_INFOS[0].label}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <IconAltArrowDown className="text-gray-400"/>
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
                {NATION_PHONE_INFOS.map((info) => (
                  <Listbox.Option
                    key={info.value}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={info.value}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {info.label}
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
