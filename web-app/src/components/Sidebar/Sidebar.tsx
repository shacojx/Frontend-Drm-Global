import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo_full from "src/assets/images/logo_full.png";
import MainMenu from 'src/components/MainMenu';
import { FooterVertical } from 'src/components/base/footers';
import { IconX } from 'src/components/icons';
import { RoutePaths } from 'src/constants/routerPaths';

export default function Sidebar() {

    const translation = useTranslation()
    const [isOpenOnSmallScreen, setIsOpenOnSmallScreen] = useState<boolean>(false)
    // useEffect(() => {
    //     props.openCallerRef.current = setIsOpenOnSmallScreen.bind(undefined, true)
    // }, [props.openCallerRef]);

    return <>
        {isOpenOnSmallScreen && <div className={"lg:none bg-black absolute z-50 top-0 left-0 w-screen h-screen opacity-40"}></div>}
        <div className={
            "absolute top-0 left-0 z-50 lg:flex lg:relative lg:w-full max-w-[260px] min-h-screen h-full bg-white flex-col justify-between "
            + (isOpenOnSmallScreen ? "w-full flex" : "w-0 hidden")
        }>
            <div className={"grow"}>
                <div
                    className={"flex flex-row items-center mx-4 mt-6 justify-between lg:justify-start"}>
                    <Link to={RoutePaths.services}>
                        <img className="w-[150px] cursor-pointer" src={logo_full} alt="logo_full" />
                    </Link>
                    <div className={"block lg:hidden p-2 bg-gray-100 rounded-full cursor-pointer"}>
                        <IconX onClick={setIsOpenOnSmallScreen.bind(undefined, false)} />
                    </div>
                </div>
                <div className={"mt-10"}>
                    <p className={"ml-4 h-10 uppercase font-bold"}>
                        {translation.t("OVERVIEW")}
                    </p>
                    <MainMenu isOpenOnSmallScreen={isOpenOnSmallScreen} />
                </div>
            </div>
            <div className={"w-full p-4"}>
                <FooterVertical />
            </div>
        </div>
    </>

}



