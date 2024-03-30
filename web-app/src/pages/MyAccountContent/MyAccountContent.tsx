import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { callApiGetUserProfile } from 'src/api/account';
import { getFile, uploadAvatar } from 'src/api/upload';
import { IconAccountCircle, IconPencil, IconSpinner } from 'src/components/icons';
import { AuthContext } from 'src/contexts/AuthContextProvider';
import ChangePasswordForm from 'src/pages/MyAccountContent/components/ChangePasswordForm';
import GeneralInformationForm from 'src/pages/MyAccountContent/components/GeneralInformationForm';
import KYCBox from 'src/pages/MyAccountContent/components/KYCBox';
import { cn } from 'src/utils/cn.util';

export default function MyAccountContent() {
  const { user, saveAuthUser } = useContext(AuthContext);
  const translation = useTranslation();

  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [loadingAvatar, setLoadingAvatar] = useState(false);

  useEffect(() => {
    const fetchAvatar = async () => {        
      if (!user?.avatar) return;
      setLoadingAvatar(true)
      const blob = await getFile(user?.avatar, { download: false });
      blob && setAvatarUrl(URL.createObjectURL(blob));
      setLoadingAvatar(false)
    };

    fetchAvatar();
  }, [user?.avatar]);

  const handleChangeAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    setLoadingAvatar(true);
    const file = event.currentTarget.files?.item(0);
    if (!file) return;

    await uploadAvatar(file);    
    const newUser = await callApiGetUserProfile()
    saveAuthUser(newUser)
    setLoadingAvatar(false);
  };

  return (
    <div className={'w-full grow flex flex-col p-3 border-solid border-t border-l bg-white'}>
      <div
        className={
          'flex flex-col grow overflow-x-hidden overflow-y-scroll bg-white rounded justify-start items-center py-6 px-4 sm:px-8'
        }
      >
        <div className="relative">
          {loadingAvatar && (
            <div className="absolute size-full top-0 left-0 z-50 flex justify-center items-center bg-gray-500/50 rounded-full">
              <IconSpinner />
            </div>
          )}
          {avatarUrl ? (
            <div className="size-20 relative">
              <img src={avatarUrl} alt="" className="size-full rounded-full object-cover" />
              <label
                htmlFor="avt"
                className={cn('absolute bottom-0 right-0 rounded-full bg-gray-100 p-1 shadow-sm cursor-pointer', {
                  'pointer-events-none': loadingAvatar,
                })}
              >
                <IconPencil />
                <input
                  className="hidden"
                  id="avt"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleChangeAvatar}
                />
              </label>
            </div>
          ) : (
            <IconAccountCircle className={'w-16 h-16'} />
          )}
        </div>
        <p className={'font-bold text-h4 my-3'}>
          {translation.t('Hello')} {user?.lastName}
        </p>
        <p>{translation.t('Manage your information, privacy and security so DRMGlobal works for you')}.</p>
        <div className={'flex flex-col md:flex-row mt-8 gap-2 grow w-full'}>
          <div className={'border rounded-lg grow md:w-1/3 p-6 flex flex-col'}>
            <GeneralInformationForm />
          </div>
          <div className={'border rounded-lg grow md:w-1/3 p-6 flex flex-col'}>
            <ChangePasswordForm />
          </div>
          <div className={'border rounded-lg grow md:w-1/3 p-6 flex flex-col'}>
            <KYCBox />
          </div>
        </div>
      </div>
    </div>
  );
}
