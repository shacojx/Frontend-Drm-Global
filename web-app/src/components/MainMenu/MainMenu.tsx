import { Disclosure, Menu } from '@headlessui/react';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { AltArrowRightIcon, IconMyCompany, IconMyService, IconService } from 'src/components/icons'
import { RoutePaths } from 'src/constants/routerPaths'
import { cn } from 'src/utils/cn.util';

type Props = {
    isOpenOnSmallScreen: boolean
}

type MenuType = {
    iconElement: JSX.Element;
    path?: string;
    label: string;
    items?: MenuType[];
}

export default function MainMenu({ isOpenOnSmallScreen }: Props) {
    const menuDefault: MenuType[] = [
        {
            iconElement: <IconService />,
            path: RoutePaths.services,
            label: "Services",
        },
        {
            iconElement: <IconMyService />,
            label: 'My Services',
            items: [
                {
                    path: RoutePaths.myServicesItem,
                    iconElement: <IconMyService />,
                    label: 'LLC Formation Services',
                },
            ]
        },
        {
            path: RoutePaths.myCompany,
            iconElement: <IconMyCompany />,
            label: "My Company",
        },
    ]

    return (
        <div>
            {isOpenOnSmallScreen ? (
                <>
                    <Disclosure>
                        {({ open }) => (
                            <>
                                {menuDefault.map((tabOption) => (
                                    <div className="relative group " key={tabOption.path}>
                                        <TabOptionDisclosure {...tabOption} open={open}
                                        />
                                        {tabOption.items && (
                                            <>
                                                {tabOption?.items?.map((itemChildren) => (
                                                    <TabOptionDisclosureItem
                                                        {...itemChildren}
                                                    />
                                                ))}
                                            </>
                                        )}
                                    </div>
                                ))}
                            </>
                        )}
                    </Disclosure>
                </>
            ) : (
                <>

                    {menuDefault.map((tabOption) => (
                        <>
                            <Menu as="div" className="relative">
                                <div className="relative group " key={tabOption.path}>
                                    <TabOption
                                        {...tabOption}
                                    />
                                    {tabOption.items && (
                                        <>
                                            {tabOption.items?.map((itemChildren) => (
                                                <TabOptionItem
                                                    {...itemChildren}
                                                />
                                            ))}
                                        </>
                                    )}
                                </div>
                            </Menu>
                        </>
                    ))}
                </>
            )}
        </div>
    )
}


type TabOptionDisclosureProps = MenuType & {
    open: boolean
}
function TabOptionDisclosure(props: TabOptionDisclosureProps) {
    const translation = useTranslation();
    return (
        <>
            {Boolean(props.items) ?
                <>
                    <Disclosure.Button
                        className={"h-[50px] w-full px-4 py-2 "}
                    >
                        <div
                            className={cn("w-full h-full flex flex-row gap-3 px-3 items-center rounded-md cursor-pointer hover:bg-gray-300 ")}
                        >
                            <div className={"hidden lg:block"}>{props.iconElement}</div>
                            <span>{props.label}</span>
                            {Boolean(props.items) && (
                                <div className={`${props.open ? "rotate-90 " : ""} ml-auto`}>
                                    <AltArrowRightIcon />
                                </div>
                            )}
                        </div>
                    </Disclosure.Button>
                </>
                : <>
                    <Disclosure.Button
                        className={"h-[50px] w-full px-4 py-2 "}
                    >
                        <NavLink
                            to={props.path as string}
                            className={({ isActive }) => cn("w-full h-full flex flex-row gap-3 px-3 items-center rounded-md cursor-pointer hover:bg-gray-300 ",
                                {
                                    "bg-gray-300": isActive
                                }
                            )
                            }
                        >
                            <div className={"hidden lg:block"}>{props.iconElement}</div>
                            <span>{translation.t(props.label)}</span>
                        </NavLink>
                    </Disclosure.Button>
                </>
            }
        </>

    );
}

function TabOptionDisclosureItem(props: MenuType) {
    const translation = useTranslation();
    return (
        <Disclosure.Panel
            className={"h-[50px] w-full px-4 py-2"}
        >
            <NavLink
                to={props.path as string}
                className={({ isActive }) => cn("w-full h-full flex flex-row gap-3 px-3 items-center rounded-md cursor-pointer hover:bg-gray-300 ",
                    {
                        "bg-gray-300": isActive
                    }
                )
                }
            >
                <div className={"hidden lg:block"}>{props.iconElement}</div>
                <span>{translation.t(props.label)}</span>
            </NavLink>

        </Disclosure.Panel>
    );
}

function TabOption(props: MenuType) {
    const translation = useTranslation();
    return (
        <>
            {Boolean(props.items) ?
                <>
                    <Menu.Button
                        className={"h-[50px] w-full px-4 py-2"}
                    >
                        <div
                            className={cn("w-full h-full flex flex-row gap-3 px-3 items-center rounded-md cursor-pointer hover:bg-gray-300 ",
                            )
                            }
                        >
                            <div className={"hidden lg:block"}>{props.iconElement}</div>
                            <span>{translation.t(props.label)}</span>
                        </div>
                        <div className="absolute top-1/2 -translate-y-2/4 right-5">
                            <AltArrowRightIcon />
                        </div>
                    </Menu.Button>
                </>
                : <>
                    <Menu.Button
                        className={"h-[50px] w-full px-4 py-2"}
                    >
                        <NavLink
                            to={props.path as string}
                            className={({ isActive }) => cn("w-full h-full flex flex-row gap-3 px-3 items-center rounded-md cursor-pointer hover:bg-gray-300 ",
                                {
                                    "bg-gray-300": isActive
                                }
                            )
                            }
                        >
                            <div className={"hidden lg:block"}>{props.iconElement}</div>
                            <span>{translation.t(props.label)}</span>
                        </NavLink>
                    </Menu.Button>
                </>
            }
        </>
    );
}

function TabOptionItem(props: MenuType) {
    const translation = useTranslation();
    return (
        <Menu.Items
            className="absolute w-[-156px] h-[50px] left-auto -right-[230px] top-[50px] lg:top-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-10"

        >
            <Menu.Item>
                {({ active, close }) => (
                    <Menu.Button
                    className={'h-full p-2'}
                    >
                        <NavLink
                            to={props.path as string}
                            onClick={close}
                            className={({ isActive }) => cn("w-full h-full flex flex-row gap-3 px-3 items-center rounded-md cursor-pointer hover:bg-gray-300 ",
                                {
                                    "bg-gray-300": isActive || active
                                }
                            )
                            }
                        >
                            <div className={"hidden lg:block"}>{props.iconElement}</div>
                            <span>{translation.t(props.label)}</span>
                        </NavLink>
                    </Menu.Button>
                )}
            </Menu.Item>
        </Menu.Items>
    );
}