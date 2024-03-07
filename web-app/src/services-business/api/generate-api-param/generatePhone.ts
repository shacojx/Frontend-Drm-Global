import { LocalPhone, NationPhone } from "../../../api/types";

type SplitCharacter = '_'
export type RNPhoneValue = `${NationPhone}${SplitCharacter}${LocalPhone}`

export function generatePhone(nationPhone: NationPhone, localPhone: LocalPhone): RNPhoneValue {
  const splitCharacter: SplitCharacter = '_'
  return `${nationPhone}${splitCharacter}${localPhone}`
}

type PhoneExtracted = {
  nationPhone: NationPhone,
  localPhone: LocalPhone,
}
export function extractPhone(phone: RNPhoneValue): PhoneExtracted {
  const splitCharacter: SplitCharacter = '_'
  const [nationPhone, localPhone] = phone.split(splitCharacter) as [NationPhone, LocalPhone]
  return {
    nationPhone,
    localPhone
  }
}
