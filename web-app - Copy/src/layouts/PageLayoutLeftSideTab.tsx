import { Fragment, JSX, MutableRefObject, PropsWithChildren, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import logo_full from "../assets/images/logo_full.png";
import { FooterVertical } from "../components/base/footers";
import { AltArrowRightIcon, IconX } from "../components/icons";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import clsx from "clsx";

export type TabOption<TabId> = {
  iconElement: JSX.Element,
  id: TabId,
  label: string,
  items?: TabOption<any>[];
}

type Props<T> = PropsWithChildren<{
  tabIdSelected: TabOption<T>["id"],
  tabOptions: TabOption<T>[],
  onClickTabOption: (tabLabel: TabOption<T>["id"]) => void,
  openCallerRef: MutableRefObject<() => void>
}>
export function PageLayoutLeftSideTab<T extends string>(props: Props<T>) {
  const translation = useTranslation()
  const [isOpenOnSmallScreen, setIsOpenOnSmallScreen] = useState<boolean>(false)

  useEffect(() => {
    props.openCallerRef.current = setIsOpenOnSmallScreen.bind(undefined, true)
  }, [props.openCallerRef]);



  return <div className={"w-full h-full bg-surface flex flex-row"}>
    {isOpenOnSmallScreen && <div className={"lg:none bg-black absolute z-50 top-0 left-0 w-screen h-screen opacity-40"}></div>}
    <div className={
      "absolute top-0 left-0 z-50 lg:flex lg:relative lg:w-full max-w-[260px] min-h-screen h-full bg-white flex-col justify-between "
      + (isOpenOnSmallScreen ? "w-full flex" : "w-0 hidden")
    }>
      <div className={"grow"}>
        <div
          className={"flex flex-row items-center mx-4 mt-6 justify-between lg:justify-start"}>
          <img className="w-[150px] cursor-pointer" src={logo_full} alt="logo_full" />
          <div className={"block lg:hidden p-2 bg-gray-100 rounded-full cursor-pointer"}>
            <IconX onClick={setIsOpenOnSmallScreen.bind(undefined, false)} />
          </div>
        </div>
        <div className={"mt-10"}>
          <p className={"ml-4 h-10 uppercase font-bold"}>
            {translation.t("OVERVIEW")}
          </p>
          {isOpenOnSmallScreen ? (
            <>
              <Disclosure>
                {({ open }) => (
                  <>
                    {props.tabOptions.map((tabOption) => (
                      <div className="relative group " key={tabOption.id}>
                        <TabOptionDisclosure
                          key={tabOption.id}
                          id={tabOption.id}
                          isOpen={tabOption.id === props.tabIdSelected}
                          iconElement={tabOption.iconElement}
                          label={tabOption.label}
                          onClick={props.onClickTabOption}
                          open={open}
                          items={tabOption.items}
                        />
                        {tabOption.items && (
                          <>
                            {tabOption?.items?.map((itemChildren) => (
                              <TabOptionDisclosureItem
                                key={itemChildren.id}
                                id={itemChildren.id}
                                isOpen={
                                  itemChildren.id === props.tabIdSelected
                                }
                                iconElement={itemChildren.iconElement}
                                label={itemChildren.label}
                                onClick={props.onClickTabOption}
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

              {props.tabOptions.map((tabOption) => (
                <>
                  <Menu as="div" className="relative">
                    <div className="relative group " key={tabOption.id}>
                      <TabOption
                        key={tabOption.id}
                        id={tabOption.id}
                        isOpen={tabOption.id === props.tabIdSelected}
                        iconElement={tabOption.iconElement}
                        label={tabOption.label}
                        onClick={props.onClickTabOption}
                        items={tabOption.items}
                      />
                      {tabOption.items && (
                        <>
                          {tabOption.items?.map((itemChildren) => (
                            <TabOptionItem
                              key={itemChildren.id}
                              id={itemChildren.id}
                              isOpen={itemChildren.id === props.tabIdSelected}
                              iconElement={itemChildren.iconElement}
                              label={itemChildren.label}
                              onClick={props.onClickTabOption}
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
      </div>
      <div className={"w-full p-4"}>
        <FooterVertical />
      </div>
    </div>
    {props.children}
  </div>
}

type TabOptionProps<T> = TabOption<T> & {
  isOpen: boolean,
  onClick: (tabLabel: TabOption<T>["id"]) => void,
  open?: boolean;
}
function TabOptionDisclosure<T>(props: TabOptionProps<T>) {
  const translation = useTranslation();
  return (
    <>
      {Boolean(props.items) ?
        <>
          <Disclosure.Button
            className={"h-[50px] w-full px-4 py-2 "}
          >
            <div
              className={
                "w-full h-full flex flex-row gap-3 px-3 items-center rounded-md cursor-pointer hover:bg-gray-300 " +
                (props.isOpen ? "bg-gray-300" : "")
              }
            >
              <div className={"hidden lg:block"}>{props.iconElement}</div>
              <span>{translation.t(props.label)}</span>
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
            onClick={props.onClick.bind(undefined, props.id)}
            className={"h-[50px] w-full px-4 py-2 "}
          >
            <div
              className={
                "w-full h-full flex flex-row gap-3 px-3 items-center rounded-md cursor-pointer hover:bg-gray-300 " +
                (props.isOpen ? "bg-gray-300" : "")
              }
            >
              <div className={"hidden lg:block"}>{props.iconElement}</div>
              <span>{translation.t(props.label)}</span>
            </div>
          </Disclosure.Button>
        </>
      }
    </>

  );
}

function TabOptionDisclosureItem<T>(props: TabOptionProps<T>) {
  const translation = useTranslation();
  return (
    <Disclosure.Panel
      onClick={props.onClick.bind(undefined, props.id)}
      className={"h-[50px] w-full px-4 py-2"}
    >
      <div
        className={
          "w-full h-full flex flex-row gap-3 px-3 items-center rounded-md cursor-pointer hover:bg-gray-300 " +
          (props.isOpen ? "bg-gray-300" : "")
        }
      >
        <div className={"hidden lg:block"}>{props.iconElement}</div>
        <span>{translation.t(props.label)}</span>
      </div>
    </Disclosure.Panel>
  );
}

function TabOption<T>(props: TabOptionProps<T>) {
  const translation = useTranslation();
  return (
    <>
      {Boolean(props.items) ?
        <>
          <Menu.Button
            className={"h-[50px] w-full px-4 py-2"}
          >
            <div
              className={
                "w-full h-full flex flex-row gap-3 px-3 items-center rounded-md cursor-pointer hover:bg-gray-300 " +
                (props.isOpen ? "bg-gray-300" : "")
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
            onClick={props.onClick.bind(undefined, props.id)}
            className={"h-[50px] w-full px-4 py-2"}
          >
            <div
              className={
                "w-full h-full flex flex-row gap-3 px-3 items-center rounded-md cursor-pointer hover:bg-gray-300 " +
                (props.isOpen ? "bg-gray-300" : "")
              }
            >
              <div className={"hidden lg:block"}>{props.iconElement}</div>
              <span>{translation.t(props.label)}</span>
            </div>
          </Menu.Button>
        </>
      }
    </>
  );
}

function TabOptionItem<T>(props: TabOptionProps<T>) {
  const translation = useTranslation();
  return (
    <Menu.Items
      className="absolute w-[-156px] h-[50px] left-auto -right-[219px] top-[50px] lg:top-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-10"

    >
      <Menu.Item>
        {({ active }) => (
          <Menu.Button
            onClick={props.onClick.bind(undefined, props.id)}
            className={clsx(
              "w-full h-full flex flex-row gap-3 px-3 items-center rounded-md cursor-pointer hover:bg-gray-300 ",
              {
                "bg-gray-300": props.isOpen || active,
              }
            )}
          >
            <div className={"hidden lg:block"}>{props.iconElement}</div>
            <span>{translation.t(props.label)}</span>
          </Menu.Button>
        )}
      </Menu.Item>
    </Menu.Items>
  );
}
