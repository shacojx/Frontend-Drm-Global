export type NationPhone = '+84'
export type LocalPhone = string
type SplitCharacter = '_'
export type RNPhoneValue = `${NationPhone}${SplitCharacter}${LocalPhone}`

export function generateApiPhone(nationPhone: NationPhone, localPhone: LocalPhone) {
  return `${nationPhone}${localPhone}`
}

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
