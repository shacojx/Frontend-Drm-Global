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

export function FooterVertical() {
  const year = new Date().getFullYear();
  return <div className="w-full flex flex-col gap-y-3 justify-between">
    <I18nLanguage />
    <div>
      <p>
        © DRMGlobal, {year}.
      </p>
      <p>
        All rights reserved.
      </p>
    </div>
  </div>
}
