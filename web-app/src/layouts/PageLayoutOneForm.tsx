import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import logo_full from "../assets/images/logo_full.png";
import { FooterDefault } from "../components/base/footers";
import { RoutePaths } from "../pages/router";

export function PageLayoutOneForm(props: PropsWithChildren<{}>) {
  const navigate = useNavigate()
  function handleClickLogo() {
    navigate(RoutePaths.home)
  }
  return <div
    className="w-screen h-screen p-4 bg-cover flex flex-col"
  >
    <div className="flex flex-col items-center justify-center grow my-4">
      <div className="w-full max-w-[400px]">
        <img onClick={handleClickLogo} className="mb-8 cursor-pointer" src={logo_full} alt="logo_full"/>
        <div className="flex flex-col gap-y-8 py-12 px-8 shadow-form rounded-3xl">
          {props.children}
        </div>
      </div>
    </div>
    <FooterDefault />
  </div>

}
