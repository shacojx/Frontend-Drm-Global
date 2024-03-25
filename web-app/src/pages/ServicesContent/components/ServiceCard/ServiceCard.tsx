import React from 'react'
import { IconSelectCard } from 'src/components/icons'
import { Service } from 'src/pages/ServicesContent/ServicesContent'

type ServiceCardProps = {
    isSelected: boolean,
    service: Service,
    onSelect: (id: number) => void
}


export default function ServiceCard(props: ServiceCardProps) {
    return <div
        className={"relative pl-8 sm:pl-14 w-full flex cursor-pointer border rounded-2xl " + (props.isSelected ? 'border-primary' : 'border-gray-300')}
        onClick={props.onSelect.bind(undefined, props.service.id)}
    >
        {props.isSelected && <IconSelectCard className={"absolute -top-[1px] left-0"} />}
        <div className={"flex flex-col grow py-6 gap-3"}>
            <p className={"text-cLg sm:text-h4 font-bold"}>{props.service.label}</p>
            <div>
                <div>
                    <p className={"sm:text-lg"}>{props.service.description}</p>
                    <ul className={"flex flex-col sm:flex-row gap-2 sm:gap-12 list-disc text-violet pl-8"}>
                        {props.service?.agents?.map((agent, index) => <li key={agent + index}><span>{agent}</span></li>)}
                    </ul>
                </div>
            </div>
        </div>
        <div className={"p-6 text-orange flex items-center justify-center shrink-0"}>
            <span className={"text-h4 font-bold"}>{props.service.currency} {props.service.price}</span>
        </div>
    </div>
}
