export enum statusTab {
    Pending = 1,
    InProgress = 2,
    Issued = 3
}

export type TabType = {
    id: number,
    icon: React.ReactNode,
    header: string,
    deatail: string,
    status: statusTab,
    color: string
}


export enum statusStep {
    draf = 1,
    peding = 2,
    success = 3
}

export type StepType = {
    id: number,
    header: string,
    deatail: string,
    status: statusStep,
}
