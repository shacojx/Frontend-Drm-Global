import React from 'react'
import { StepType, statusStep } from '../../types/my-service.type'
import { IconCheck } from 'src/components/icons'
import { cn } from 'src/utils/cn.util'

type Props = {
    item: StepType,
}

export default function StepService({ item }: Props) {
    return (
        <div className=' ' key={item.id}>
            <div className='border relative border-primary_25 rounded-xl flex items-center gap-6 pl-xl px-md py-sm '>
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
    )
}
