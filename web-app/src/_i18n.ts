import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import viTranslation from './locales/vi.json';

const Vietnamese = {
  fileName: 'vi',
  label: 'Tiếng Việt'
} as const
const English = {
  fileName: 'en',
  label: 'English'
} as const

export const SUPPORTED_LANGUAGE = [
  English,
  Vietnamese
]

export type Language = typeof SUPPORTED_LANGUAGE[number]

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      vi: {
        translation: viTranslation,
      },
    },
    lng: 'en', // if you're using a language detector, you might not set this
    fallbackLng: 'en',
  })
  .catch(error => {
    SUPPORTED_LANGUAGE.forEach(i => SUPPORTED_LANGUAGE.pop())
    SUPPORTED_LANGUAGE.push(English)
  })
