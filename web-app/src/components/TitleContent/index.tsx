import React from 'react'

type Props = {
    label: string
}

export default function TitleContent({
    label
}: Props) {
    return (
        <div>
            <h1 className="font-bold text-lg w-full text-start ">{label}</h1>
            <div className='border-b border-primary border-2 w-[70px] mt-2 font-bold'></div>
        </div>
    )
}
