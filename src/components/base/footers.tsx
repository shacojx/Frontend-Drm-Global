import { I18nLanguage } from "../I18nLanguage";

export function FooterDefault() {
  const year = new Date().getFullYear();
  return <div className="w-full flex justify-between">
    <p>
      © DRMGlobal, {year}. All rights reserved.
    </p>
    <I18nLanguage />
  </div>
}
