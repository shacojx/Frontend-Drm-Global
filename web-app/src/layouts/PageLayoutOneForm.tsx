import { PropsWithChildren } from "react";
import background from "../assets/images/background.png";
import logo_full from "../assets/images/logo_full.png";
import { FooterDefault } from "../components/base/footers";

export function PageLayoutOneForm(props: PropsWithChildren<{}>) {
  return <div className="w-screen h-screen p-4 bg-cover flex flex-col" style={{backgroundImage: `url(${background})`}}>
    <div className="flex flex-col items-center justify-center grow">
      <div className="w-full max-w-[400px]">
        <img className="mb-8" src={logo_full} alt="logo_full"/>
        <div className="flex flex-col gap-y-8 py-12 px-8 shadow-form rounded-3xl">
          {props.children}
        </div>
      </div>
    </div>
    <FooterDefault />
  </div>

}
