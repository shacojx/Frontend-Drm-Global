import { Outlet } from "react-router-dom";
import { IMAGE_LINKS } from "../assets/imageLinks";
import { FooterDefault } from "../components/base/footers";

export function OneFormLayout() {
  return <div className="w-screen h-screen p-4 bg-cover flex flex-col" style={{backgroundImage: `url(${IMAGE_LINKS.siteBackground})`}}>
    <div className="flex flex-col items-center justify-center grow">
      <Outlet/>
    </div>
    <FooterDefault />
  </div>

}
