import { Popover, Transition } from '@headlessui/react';
import { Fragment, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { callApiLogout } from 'src/api/account';
import { getFile } from 'src/api/upload';
import { IconAccountCircle, IconLogout, IconSupport, IconThreeLines, IconUser, IconX } from 'src/components/icons';
import { RoutePaths } from 'src/constants/routerPaths';
import { AuthContext } from 'src/contexts/AuthContextProvider';
import { removeAuthInfo } from 'src/services-business/api/authentication';

type Props = {
  setIsOpenOnSmallScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ setIsOpenOnSmallScreen }: Props) {
  const { user, removeAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const translation = useTranslation();

  const [avatarUrl, setAvatarUrl] = useState<string>();

  function handleClickLogout() {
    callApiLogout().catch((e) => console.error(e));
    navigate(RoutePaths.login);
    removeAuthInfo();
    removeAuthUser();
  }

  const toggleMenu = () => {
    setIsOpenOnSmallScreen((pre) => !pre);
  };

  useEffect(() => {
    const fetchAvatar = async () => {
      if (!user?.avatar) return;
      const blob = await getFile(user?.avatar, { download: false });
      blob && setAvatarUrl(URL.createObjectURL(blob));
    };

    fetchAvatar();
  }, [user?.avatar]);

  return (
    <div className=" w-full h-20 shrink-0  bg-white flex justify-between lg:justify-end items-center px-6">
      <div className="flex justify-between w-full items-center">
        <div>
          <IconThreeLines className={'block lg:hidden w-5 h-5 cursor-pointer'} onClick={toggleMenu} />
        </div>
        <div className={'flex items-start gap-4'}>
          <Link
            to={RoutePaths.support}
            className={'w-10 h-10 rounded-full bg-gray-300 flex justify-center items-center cursor-pointer'}
          >
            <IconSupport />
          </Link>
          <Popover className="relative">
            {({ open, close }) => (
              <>
                <Popover.Button className={''}>
                  <div>
                    {user?.avatar !== 'avt-default.jpg' ? (
                      <img src={avatarUrl} className="size-10 rounded-full object-cover" />
                    ) : (
                      <IconAccountCircle className={'w-10 h-10 cursor-pointer'} />
                    )}
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
                  <Popover.Panel className={'absolute right-6 z-[1000]'}>
                    <div className="flex flex-col gap-3 items-center bg-[#E9EEF6] rounded-3xl p-3">
                      <div
                        onClick={close}
                        className={'absolute top-2 right-2 p-2 bg-gray-300 rounded-full cursor-pointer'}
                      >
                        <IconX />
                      </div>
                      <p className={'text-gray-700 text-cLg'}>{user?.email}</p>
                      <div>
                        {user?.avatar !=="avt-default.jpg" ? (
                          <img src={avatarUrl} className="size-10 rounded-full object-cover" />
                        ) : (
                          <IconAccountCircle className={'w-10 h-10 cursor-pointer'} />
                        )}
                      </div>
                      <p className={'font-bold text-cLg'}>
                        {translation.t('Hello')} {user?.firstName},
                      </p>
                      <Link
                        to={RoutePaths.myAccount}
                        onClick={close}
                        className={'flex flex-row gap-2 w-[290px] bg-white px-6 py-4 mt-3 rounded-xl cursor-pointer'}
                      >
                        <IconUser />
                        <span className={'font-bold'}>{translation.t('Account')}</span>
                      </Link>
                      <div
                        onClick={handleClickLogout}
                        className={'flex flex-row gap-2 w-[290px] bg-white px-6 py-4 rounded-xl cursor-pointer'}
                      >
                        <IconLogout />
                        <span className={'font-bold'}>{translation.t('Log out')}</span>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      </div>
    </div>
  );
}
