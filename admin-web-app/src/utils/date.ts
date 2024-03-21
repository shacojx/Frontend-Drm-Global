import { OptionInfo } from "../../../src/types/common"

export function generateDayInMonth(quantity: number) {
    let index = 1
    let result: OptionInfo<number>[] = [] as OptionInfo<number>[]

    while (index < quantity) {
        result.push({ label: String(index), value: index})

        index++
    }


    return result
}

export type Month = 'january' | 'february' | 'march' | 'april' | 'may' | 'june' | 'july' | 'august' | 'september' | 'october' | 'november' | 'december'
export type DayInMonth = Record<Month, number>

export const DAY_IN_MONTH_LIST: DayInMonth = {
    'january': 31,
    'february': 29,
    'march': 30,
    'april': 31,
    'may': 31,
    'june': 30,
    'july': 30,
    'august': 30,
    'september': 31,
    'october': 31,
    'november': 30,
    'december': 30,
}

export const DAY_IN_MONTH_SELECT = Object.entries(DAY_IN_MONTH_LIST).map(([key, value] )=> {
    return {
        label: key,
        value: key,
        items: generateDayInMonth(value)
    }
})