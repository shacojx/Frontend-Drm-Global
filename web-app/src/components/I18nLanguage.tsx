import i18n from "i18next";
import { Language, SUPPORTED_LANGUAGE } from "../_i18n";

export function I18nLanguage() {
  function handleClickLanguage(language: Language) {
    const errorMessage = i18n.t('Can not change to language. Please choose another', {language: language.label, lng: language.fileName})
    i18n.changeLanguage(language.fileName)
      .catch(e => alert(errorMessage))
  }

  return <></>

  // return <div className="flex gap-4">
  //   {SUPPORTED_LANGUAGE.map(lang =>
  //     <button key={lang.fileName}>
  //       <span onClick={handleClickLanguage.bind(undefined, lang)}>{lang.label}</span>
  //     </button>
  //   )}
  // </div>
}
