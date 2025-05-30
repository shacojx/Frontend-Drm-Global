import { Disclosure, Menu } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { DialogFailureFullscreen } from 'src/components/DialogFormStatusFullscreen';
import {
  AltArrowRightIcon,
  IconMyCompany,
  IconMyService,
  IconService,
} from 'src/components/icons';
import { RoutePaths } from 'src/constants/routerPaths';
import { useApiLLCService } from 'src/hooks-api/useLlcService';
import { cn } from 'src/utils/cn.util';

type Props = {
  isOpenOnSmallScreen: boolean;
};

type MenuType = {
  id: string;
  iconElement: JSX.Element;
  path?: string;
  label: string;
  items?: MenuType[];
};

export default function MainMenu({ isOpenOnSmallScreen }: Props) {
  const [menuData, setMenuData] = useState<MenuType[]>([]);
  const { t } = useTranslation();

  const menuDefault: MenuType[] = [
    {
      id: RoutePaths.services,
      iconElement: <IconService />,
      path: RoutePaths.services,
      label: 'Services',
    },
    {
      id: RoutePaths.myServices,
      iconElement: <IconMyService />,
      label: 'My Services',
      items: [],
    },
    {
      id: RoutePaths.myCompany,
      path: RoutePaths.myCompany,
      iconElement: <IconMyCompany />,
      label: 'My Company',
    },
  ];

  const resApiLLCService = useApiLLCService();

  useEffect(() => {
    if (resApiLLCService.data) {
      let newMenu = menuDefault.map((item) => {
        if (item.id === RoutePaths.myServices) {
          const itemArr: MenuType[] = [];
          resApiLLCService.data.forEach(
            (itemService: { id: number; serviceName: string }) => {
              itemArr.push({
                id: `${RoutePaths.myServices}/${itemService.id}`,
                path: `${RoutePaths.myServices}/${itemService.id}`,
                iconElement: <IconMyService />,
                label: itemService.serviceName,
              });
            }
          );
          if (resApiLLCService.data.length === 0) {
            itemArr.push({
              id: `#`,
              path: `#`,
              iconElement: <></>,
              label: 'No Service',
            });
          }
          item.items = itemArr;
        }
        return item;
      });
      setMenuData(newMenu);
    }
  }, [resApiLLCService.data, resApiLLCService.isFetching]);

  const handleClickSubmit = () => {
    resApiLLCService.refetch();
  };

  return (
    <div>
      {resApiLLCService.isError ? (
        <DialogFailureFullscreen
          title="Failure!"
          subTitle={resApiLLCService?.error?.message}
          actionElement={
            <button
              onClick={handleClickSubmit}
              className="w-full min-w-[300px] h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
            >
              <span>{t('Try again')}</span>
            </button>
          }
        />
      ) : (
        <>
          {isOpenOnSmallScreen ? (
            <>
              <Disclosure>
                {({ open }) => (
                  <>
                    {menuData.map((tabOption) => (
                      <div className="relative group " key={tabOption.id}>
                        <TabOptionDisclosure {...tabOption} open={open} />
                        {tabOption.items && (
                          <>
                            {tabOption?.items?.map((itemChildren) => (
                              <TabOptionDisclosureItem {...itemChildren} />
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
              {menuData.map((tabOption) => (
                <Fragment key={tabOption.id}>
                  <Menu as="div" className="relative">
                    <div className="relative group " key={tabOption.id}>
                      <TabOption {...tabOption} />
                      {tabOption.items && (
                        <>
                          <Menu.Items
                            className={`
                      absolute w-[260px] -right-[250px] top-[50px] lg:top-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-10
                      `}
                            style={{
                              height: tabOption.items.length * 65 + 'px',
                            }}
                          >
                            <div className="flex flex-col">
                              {tabOption.items?.map((itemChildren) => (
                                <TabOptionItem
                                  key={itemChildren.id}
                                  {...itemChildren}
                                />
                              ))}
                            </div>
                          </Menu.Items>
                        </>
                      )}
                    </div>
                  </Menu>
                </Fragment>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}

type TabOptionDisclosureProps = MenuType & {
  open: boolean;
};
function TabOptionDisclosure(props: TabOptionDisclosureProps) {
  const translation = useTranslation();
  return (
    <>
      {Boolean(props.items) ? (
        <>
          <Disclosure.Button className={'h-[50px] w-full px-4 py-2 '}>
            <div
              className={cn(
                'w-full h-full flex flex-row gap-3 px-3 items-center rounded-md cursor-pointer hover:bg-gray-300 '
              )}
            >
              <div className={'hidden lg:block'}>{props.iconElement}</div>
              <span>{props.label}</span>
              {Boolean(props.items) && (
                <div className={`${props.open ? 'rotate-90 ' : ''} ml-auto`}>
                  <AltArrowRightIcon />
                </div>
              )}
            </div>
          </Disclosure.Button>
        </>
      ) : (
        <>
          <Disclosure.Button className={'h-[50px] w-full px-4 py-2 '}>
            <NavLink
              to={props.path as string}
              className={({ isActive }) =>
                cn(
                  'w-full h-full flex flex-row gap-3 px-3 items-center rounded-md cursor-pointer hover:bg-gray-300 ',
                  {
                    'bg-gray-300': isActive,
                  }
                )
              }
            >
              <div className={'hidden lg:block'}>{props.iconElement}</div>
              <span>{translation.t(props.label)}</span>
            </NavLink>
          </Disclosure.Button>
        </>
      )}
    </>
  );
}

function TabOptionDisclosureItem(props: MenuType) {
  const translation = useTranslation();
  return (
    <Disclosure.Panel
      className={'h-[50px] w-full px-4 py-2'}
      key={`menu-panel${props.id}`}
    >
      <NavLink
        to={props.path as string}
        className={({ isActive }) =>
          cn(
            'w-full h-full flex flex-row gap-3 px-3 items-center rounded-md cursor-pointer hover:bg-gray-300 ',
            {
              'bg-gray-300': isActive,
            }
          )
        }
      >
        <div className={'hidden lg:block'}>{props.iconElement}</div>
        <span>{translation.t(props.label)}</span>
      </NavLink>
    </Disclosure.Panel>
  );
}

function TabOption(props: MenuType) {
  const translation = useTranslation();
  return (
    <>
      {Boolean(props.items) ? (
        <>
          <Menu.Button className={'h-[50px] w-full px-4 py-2'}>
            <div
              className={cn(
                'w-full h-full flex flex-row gap-3 px-3 items-center rounded-md cursor-pointer hover:bg-gray-300 '
              )}
            >
              <div className={'hidden lg:block'}>{props.iconElement}</div>
              <span>{translation.t(props.label)}</span>
            </div>
            <div className="absolute top-1/2 -translate-y-2/4 right-5">
              <AltArrowRightIcon />
            </div>
          </Menu.Button>
        </>
      ) : (
        <>
          <Menu.Button className={'h-[50px] w-full px-4 py-2'}>
            <NavLink
              to={props.path as string}
              className={({ isActive }) =>
                cn(
                  'w-full h-full flex flex-row gap-3 px-3 items-center rounded-md cursor-pointer hover:bg-gray-300 ',
                  {
                    'bg-gray-300': isActive,
                  }
                )
              }
            >
              <div className={'hidden lg:block'}>{props.iconElement}</div>
              <span>{translation.t(props.label)}</span>
            </NavLink>
          </Menu.Button>
        </>
      )}
    </>
  );
}

function TabOptionItem(props: MenuType) {
  const translation = useTranslation();
  return (
    <Menu.Item key={`menu${props.id}`}>
      {({ active, close }) => (
        <Menu.Button className={'h-full p-2 inline-block'}>
          <NavLink
            to={props.path as string}
            onClick={close}
            className={({ isActive }) =>
              cn(
                'w-full h-full flex flex-row gap-3 p-3 items-center rounded-md cursor-pointer hover:bg-gray-300 ',
                {
                  'bg-gray-300': isActive || active,
                }
              )
            }
          >
            <div className={'hidden lg:block'}>{props.iconElement}</div>
            <span className="line-clamp-1 text-start" title={translation.t(props.label)}>
              {translation.t(props.label)}
            </span>
          </NavLink>
        </Menu.Button>
      )}
    </Menu.Item>
  );
}
