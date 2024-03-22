import { Menu, Popover, Transition } from '@headlessui/react'
import React, { Fragment, useContext, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useNavigate } from 'react-router-dom'
import { callApiLogout } from 'src/api/account'
import Sidebar from 'src/components/Sidebar'
import { IconAccountCircle, IconLogout, IconThreeLines, IconUser, IconX } from 'src/components/icons'
import { RoutePaths } from 'src/constants/routerPaths'
import { AuthContext } from 'src/contexts/AuthContextProvider'
import { useClickOutside } from 'src/hooks-ui/useClickOutside'
import { removeAuthInfo } from 'src/services-business/api/authentication'

export default function Header() {
    const { user, removeAuthUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const translation = useTranslation()
    const openCallerRef = useRef<() => void>(() => { })
    const [isShowAccountPopup, setIsShowAccountPopup] = useState<boolean>(false)
    const ref = useClickOutside(() => setIsShowAccountPopup(false));

    function handleClickLogout() {
        callApiLogout().catch((e) => console.error(e))
        navigate(RoutePaths.login)
        removeAuthInfo()
        removeAuthUser()
    }

    function handleClickAccountOnPopUp() {
        setIsShowAccountPopup(false)
        navigate(RoutePaths.myAccount)
    }

    const toggle = () => {
        console.log('toggle')
        setIsShowAccountPopup(!isShowAccountPopup)
    }

    return (
        <div className='w-full'>
            <Popover className="relative">
                {({ open, close }) => (
                    <>
                        <Popover.Button
                            className={"w-full h-20 shrink-0 bg-white flex justify-between lg:justify-end items-center px-6"}
                        >
                            <div >
                                <IconThreeLines className={"block lg:hidden w-5 h-5 cursor-pointer"} />
                                <IconAccountCircle className={"w-10 h-10 cursor-pointer"} />
                            </div>
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                className={"absolute z-10 right-6"}
                            >
                                <div className='flex flex-col gap-3 items-center bg-[#E9EEF6] rounded-3xl p-3'>
                                    <div
                                        onClick={close}
                                        className={"absolute top-2 right-2 p-2 bg-gray-300 rounded-full cursor-pointer"}>
                                        <IconX />
                                    </div>
                                    <p className={"text-gray-700 text-cLg"}>{user?.email}</p>
                                    <IconAccountCircle className={"w-14 h-14 mb-3"} />
                                    <p className={"font-bold text-cLg"}>{translation.t("Hello")} {user?.lastName},</p>
                                    <div onClick={() => { handleClickAccountOnPopUp(); close() }} className={"flex flex-row gap-2 w-[290px] bg-white px-6 py-4 mt-3 rounded-xl cursor-pointer"}>
                                        <IconUser />
                                        <span className={"font-bold"}>{translation.t("Account")}</span>
                                    </div>
                                    <div onClick={handleClickLogout} className={"flex flex-row gap-2 w-[290px] bg-white px-6 py-4 rounded-xl cursor-pointer"}>
                                        <IconLogout />
                                        <span className={"font-bold"}>{translation.t("Log out")}</span>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    )
}
