import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { callApiCreateAdminAccount } from '../api/account';
import { ApiRegisterAdminAccountParam, AdminRoleValue } from '../api/types';
import { useValidateCaller } from '../hooks-ui/useValidateCaller';
import { extractPhone, RNPhoneValue } from '../services-business/api/generate-api-param/account';
import { FormStatus, OptionInfo } from '../types/common';
import { FormFieldEmail } from './FormFieldEmail';
import { FormFieldPassword } from './FormFieldPassword';
import { FormFieldPhoneNumber } from './FormFieldPhoneNumber';
import { FormFieldSelect } from './FormFieldSelect';
import { FormFieldText } from './FormFieldText';
import { IconCheck, IconSpinner } from './icons';
import { useApiCreateUser } from '../hooks/api/user';
import { toast } from 'react-toastify';

type Props = {
  onCreated: () => void;
};

export function FormCreateAdminAccount({ onCreated }: Props) {
  const translation = useTranslation();
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<RNPhoneValue>();
  const [role, setRole] = useState<AdminRoleValue>();
  const [password, setPassword] = useState<string>();
  const { validateCaller, validateAll } = useValidateCaller();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  
  

  const { mutateAsync: createUser, isPending, isSuccess } = useApiCreateUser();

  const onClickCreate = async () => {
    if (!validateAll()) {
      return;
    }

    if (!email || !phone || !password || !role || !firstName || !lastName) {
      return;
    }

    
    try {
      const { nationPhone, localPhone } = extractPhone(phone);
      await createUser({
        email,
        firstName,
        lastName,
        password,
        codePhone: nationPhone,
        phone: localPhone,
        role,
      })
      onCreated();
    } catch (e: unknown) {
      toast.error(String(e))
    }
  }

  const ROLES: OptionInfo<AdminRoleValue>[] = [
    {
      value: 'admin',
      label: 'ADMIN',
    },
    {
      value: 'mod',
      label: 'MODERATOR',
    },
  ];


  return (
    <div className={'flex flex-col gap-y-8 px-8'}>

      <FormFieldEmail
        id="accountEmail"
        isRequired
        value={email}
        onChange={setEmail}
        validateCaller={validateCaller}
      />
      <FormFieldPhoneNumber
        id={'phoneNumber'}
        placeholder={'Input number'}
        isRequired
        value={phone}
        onChange={setPhone}
        validateCaller={validateCaller}
      />
      <FormFieldSelect
        id={'companySelect'}
        isRequired
        label={'Role'}
        value={role}
        optionInfos={ROLES}
        onChange={setRole}
        validateCaller={validateCaller}
      />
      <FormFieldPassword
        id={'password'}
        isRequired
        value={password}
        validateCaller={validateCaller}
        onChange={setPassword}
      />
      <div className={'w-full flex gap-4'}>
        <FormFieldText
          id={'FirstName'}
          isRequired
          label="First Name"
          value={firstName}
          onChange={setFirstName}
          placeholder="Enter first name"
          validateCaller={validateCaller}
        />
        <FormFieldText
          id={'LastName'}
          isRequired
          label="Last Name"
          value={lastName}
          onChange={setLastName}
          placeholder="Enter last name"
          validateCaller={validateCaller}
        />
      </div>
      <div className={'w-full flex justify-center items-center'}>
        <button
          onClick={onClickCreate}
          className="px-4 py-2 flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
        >
          {translation.t('Create Admin Account')}
          {isPending && <IconSpinner />}
          {isSuccess && <IconCheck className={'text-success'} />}
        </button>
      </div>
    </div>
  );
}
