import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import { FormFieldSelect } from 'src/components/FormFieldSelect'
import TitleConent from 'src/components/TitleConent'
import { BuildingIcon, DiplomaVerifiedIcon, DocumentIcon, IconCheck, IconRefreshCircle, IconUpload, IdentityIcon, MoneyIcon, NotificationUnreadLinesIcon } from 'src/components/icons'
import { useValidateCaller } from 'src/hooks-ui/useValidateCaller'
import { cn } from 'src/utils/cn.util'

enum statusTab {
    draf = 1,
    success = 2
}

type TabType = {
    icon: React.ReactNode,
    header: string,
    deatail: string,
    status: statusTab,
    color: string
}


enum statusStep {
    draf = 1,
    peding = 2,
    success = 3
}

type StepType = {
    header: string,
    deatail: string,
    status: statusStep,
}


export default function MyService() {
    const [cycle, setCycle] = useState<string>()
    const { validateCaller, validateAll } = useValidateCaller()

    const dataTab: TabType[] = [
        {
            icon:
                <DocumentIcon className='w-6 h-6' />,
            header: 'CONTRACT',
            deatail: 'Click here to start KYC >',
            status: statusTab.draf,
            color: '#094B72'
        },
        {
            icon:
                <IdentityIcon className='w-6 h-6' />,
            header: 'KYC',
            deatail: 'Click here to start KYC >',
            status: statusTab.draf,
            color: '#FF5722'
        },
        {
            icon:
                <MoneyIcon className='w-6 h-6' />,
            header: 'Payment',
            deatail: 'Click here to view payment >',
            status: statusTab.draf,
            color: '#FFC327'
        },
        {
            icon:
                <BuildingIcon className='w-6 h-6' />,
            header: 'Corporation profile',
            deatail: 'Click to view >',
            status: statusTab.success,
            color: '#5D50C6'
        }
    ]

    const dataStep: StepType[] = [
        {

            header: 'State Filings',
            deatail: '2 - 5 days',
            status: statusStep.draf,
        },
        {
            header: 'Communication',
            deatail: '2 - 5 days',
            status: statusStep.peding,
        },
        {

            header: 'EIN',
            deatail: '2 - 5 days',
            status: statusStep.success,
        },
        {

            header: 'Bank account',
            deatail: '2 - 5 days',
            status: statusStep.peding,
        }
    ]
    const onChangeCycle = (value: string) => {
        setCycle(value)
    }

    const CYCLE_INFOS = [
        { id: 1, value: '1', label: '1' },
        { id: 2, value: '2', label: '2' },

    ]
    return (
        <div className='w-full flex grow relative overflow-y-scroll'>
            <div className="w-full grow flex flex-col p-3">
                <div className='p-5 md:p-6 bg-white rounded grow overflow-y-scroll overflow-x-hidden '>
                    <div className='flex gap-4 flex-col md:flex-row justify-between'>
                        <TitleConent label='LLC Formation Services' />
                        <div className='flex justify-between md:justify-normal gap-md'>
                            <div className='flex gap-md items-center'>
                                <div>
                                    Cycle:
                                </div>
                                <FormFieldSelect
                                    id={"cycleSelect"}
                                    isRequired
                                    placeholder={'--'}
                                    value={cycle}
                                    optionInfos={CYCLE_INFOS}
                                    onChange={onChangeCycle}
                                    validateCaller={validateCaller}
                                />
                            </div>
                            <div className='flex gap-md items-center'>
                                <div>
                                    Status:
                                </div>
                                <div className='flex bg-[#5D50C6]/15 p-[6px] gap-[6px] rounded-lg'>
                                    <div>
                                        <IconRefreshCircle />
                                    </div>
                                    <div>
                                        In-progress
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='hidden bg-[#5D50C6]/25 bg-[#094B72]/25  bg-[#FFC327]/25  bg-[#FF5722]/25 '></div>
                    {/* tab */}
                    <div className='mt-xl'>
                        <div className='grid gap-md grid-cols-12'>
                            {dataTab.map((item, index) => (
                                <div className='col-span-6 md:col-span-3' key={index}>
                                    <div className='md:border relative md:border-primary_25 rounded-xl flex flex-col md:flex-row justify-center md:justify-normal gap-6 pl-xl py-[1.375rem] text-center md:text-left'>
                                        <div>
                                            <div className={cn(
                                                "inline-flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full ",
                                                `bg-[${item.color}]/25`,
                                            )}
                                            >
                                                {item.icon}
                                            </div>
                                        </div>
                                        <div className='flex-1'>
                                            <div className='font-bold'>{item.header}</div>
                                            <Link to={'/'} className='text-sm text-[#A0AEC0]'>
                                                {item.deatail}
                                            </Link>
                                        </div>
                                        <div className='absolute top-0 right-0'>
                                            <div className={cn("inline-flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-bl-[12px] rounded-br-none  rounded-t-0 rounded-r-[9px] ",
                                                {
                                                    "bg-primary/15 text-primary_25": item.status === 1
                                                },
                                                {
                                                    "bg-[#1DD75B]/15 text-primary": item.status === 2
                                                },
                                            )}
                                            >
                                                <IconCheck />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}


                        </div>
                    </div>

                    {/* content */}
                    <div className='flex flex-col md:flex-row gap-8 md:gap-3 mt-6'>
                        {/* step */}
                        <div className='flex flex-col gap-md'>
                            {dataStep.map((item, index) => (
                                <div className=' ' key={index}>
                                    <div className='border relative border-primary_25 rounded-xl flex items-center gap-6 pl-xl px-md py-sm'>
                                        <div>
                                            <div className={cn(
                                                "inline-flex items-center text-white justify-center flex-shrink-0 w-5 h-5 rounded-full ",
                                                {
                                                    "bg-[#CCCCCC] ": item.status === statusStep.draf
                                                },
                                                {
                                                    "bg-[#FF5722]/25": item.status === statusStep.peding
                                                },
                                                {
                                                    "bg-success": item.status === statusStep.success
                                                },
                                            )}
                                            >
                                                <IconCheck className='w-3 h-3' />
                                            </div>
                                        </div>
                                        <div className='flex-1'>
                                            <div className=''>{item.header}</div>
                                            <div className='text-sm text-[#A0AEC0]'>
                                                {item.deatail}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='border border-primary_25 rounded-xl py-lg px-xl flex-grow'>
                            <div className='flex justify-between flex-grow mb-md'>
                                <TitleConent label='State filling' />
                                <div>
                                    <div className='flex gap-md items-center'>
                                        <div>
                                            Status:
                                        </div>
                                        <div className='flex bg-success p-[6px] gap-[6px] rounded-lg text-white'>
                                            <div>
                                                <IconCheck />
                                            </div>
                                            <div>
                                                Issued
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=''>
                                <div className="flex items-start py-md">
                                    <DiplomaVerifiedIcon className="mr-4 self-center" />
                                    <div className="flex-1">
                                        <div>
                                            State filings are done in the state you picked for your formation. We take care of registered agents in the state and all necessary filings with the Secretary of State.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-rootRootPadding'>
                                <div className="flex items-start border border-primary_25 bg-primary/10 p-md rounded-lg">
                                    <NotificationUnreadLinesIcon className="mr-4 self-center" />
                                    <div className="flex-1">
                                        <div>
                                            State filings are done in the state you picked for your formation. We take care of registered agents in the state and all necessary filings with the Secretary of State.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-rootRootPadding'>
                                <div className='text-base font-bold leading-6'>
                                    Customer document
                                </div>
                                <div className='border rounded-md border-primary_25 mt-md'>
                                    <div className='border-b  border-primary_25 flex justify-around items-center py-md'>
                                        <div>Required document</div>
                                        <div>Uploaded document</div>
                                    </div>
                                    <div className='flex justify-around items-center py-md'>
                                        <div className='text-[#3B3F48]/85'>None</div>
                                        <div>
                                            <Button
                                                icon={<IconUpload />}
                                                label='Upload' />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='mt-rootRootPadding'>
                                <div className='text-base font-bold leading-6'>
                                    Service Result
                                </div>
                                <div className='border rounded-md border-primary_25 mt-md'>
                                    <div className='border-b  border-primary_25 flex justify-around items-center py-md'>
                                        <div>Required document</div>
                                        <div>Uploaded document</div>
                                    </div>
                                    <div className='flex justify-around items-center py-md'>
                                        <div className='text-[#3B3F48]/85'>
                                            1. State Filling Information
                                        </div>
                                        <div>
                                            <a href='#' className='text-primary font-bold hover:underline'>
                                                1. EEE Company_State Filling Information.pdf
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
