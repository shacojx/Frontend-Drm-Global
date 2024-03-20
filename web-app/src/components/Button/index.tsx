import React, { ButtonHTMLAttributes } from 'react'
import { cn } from 'src/utils/cn.util'

interface Props extends ButtonHTMLAttributes<any> {
    label: string,
    icon?: React.ReactNode,
}
export default function Button({
    label, icon, onClick, className
}: Props) {
    return (
        <button onClick={onClick} className={cn("flex gap-md bg-primary/50 px-6 py-4 rounded-lg text-white", className)}>
            <div>
                {icon}
            </div>
            <div>
                {label}
            </div>
        </button>
    )
}
