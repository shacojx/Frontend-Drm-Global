import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { FormFieldText } from '../../FormFieldText';
import { OwnerInformation } from '../../../api/types';
import { useValidateCaller } from '../../../hooks-ui/useValidateCaller';
import { cn } from '../../../utils/cn.util';
import { IconEssential, IconXCircle } from '../../icons';
import { FormFieldNumber } from '../../FormFieldNumber';
import { FormFieldMultipleUpload } from '../../FormFieldMultipleUpload';
import React from 'react';
import ButtonCs from '../../ButtonCs';

type OwnerInformationTabProps = {
  readonly: boolean;
  owners?: Partial<OwnerInformation>[];
  onChange?: (owners: Partial<OwnerInformation>[]) => void;
};

export function OwnerInformationTab({
  readonly,
  owners = [],
  onChange,
}: OwnerInformationTabProps) {
  const { t } = useTranslation();
  const totalShare = owners?.reduce(
    (acc, cur) => acc + (cur.ownership ?? 0),
    0,
  );

  const handleFormChange = <K extends keyof OwnerInformation>(
    id: string = '',
    key: K,
    value: OwnerInformation[K],
  ) => {
    const newOwnersInfo = owners?.map((owner) =>
      owner.id !== id ? owner : { ...owner, [key]: value },
    );
    onChange?.(newOwnersInfo);
  };

  const { validateCaller } = useValidateCaller();

  const handleAddOwner = () => {
    onChange?.([
      ...owners,
      {
        id: Date.now().valueOf().toString(),
        companyName: '',
        ownership: 0,
        document: [],
        type: 'Company',
      },
    ]);
  };

  return (
    <div>
      {totalShare > 100 && (
        <div className="text-danger mb-2">
          {t('Total ownership must be less than or equal 100.')}
        </div>
      )}
      {owners?.map((owner, idx) => (
        <div key={owner.id}>
          <div className="grid grid-cols-[1fr,20px] xl:flex xl:justify-between">
            <div className="underline text-lg font-bold mb-6">
              {t('Owner')} {idx + 1}
            </div>

            <button
              className={cn(
                'cursor-pointer mt-auto mb-6 block xl:hidden ml-auto',
                {
                  invisible: owners.length === 1,
                },
              )}
              onClick={() => {
                onChange?.(owners.filter((o) => o.id !== owner.id));
              }}
            >
              <IconXCircle />
            </button>

            <div
              className={clsx('flex gap-3 mb-4', {
                'pointer-events-none': readonly,
              })}
            >
              <label
                htmlFor={`company-${owner.id}`}
                className="flex gap-1 items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="type"
                  id={`company-${owner.id}`}
                  className="accent-primary w-5 h-5 border-surface rounded-lg"
                  checked={owner.type === 'Company'}
                  onChange={(event) => {
                    if (owner.type === 'Company') return;
                    const isChecked = event.currentTarget.checked;
                    if (!isChecked) return;
                    handleFormChange(owner.id, 'type', 'Company');
                  }}
                />
                <span>{t('Company')}</span>
              </label>

              <label
                htmlFor={`individual-${owner.id}`}
                className="flex gap-1 items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="type"
                  id={`individual-${owner.id}`}
                  className="accent-primary w-5 h-5 border-surface rounded-lg"
                  checked={owner.type === 'Individual'}
                  onChange={(event) => {
                    if (owner.type === 'Individual') return;
                    const isChecked = event.currentTarget.checked;
                    if (!isChecked) return;
                    handleFormChange(owner.id, 'type', 'Individual');
                  }}
                />
                <span>{t('Individual')}</span>
              </label>
            </div>
          </div>

          <div
            className={cn(
              'gap-x-4 gap-y-6 mb-8 grid grid-cols-1 xl:grid-cols-[repeat(4,minmax(0,1fr)),20px]',
            )}
          >
            {owner.type === 'Company' ? (
              <div className=" col-span-1 xl:col-span-2">
                <FormFieldText
                  isFixedValue={readonly}
                  label={t('Company Name')}
                  isRequired
                  validateCaller={validateCaller}
                  id="companyName"
                  value={owner.companyName}
                  onChange={(value) =>
                    handleFormChange(owner.id, 'companyName', value)
                  }
                />
              </div>
            ) : (
              <>
                <div className="">
                  <FormFieldText
                    isFixedValue={readonly}
                    label={t('First Name')}
                    isRequired
                    validateCaller={validateCaller}
                    id="firstName"
                    value={owner.firstName}
                    onChange={(value) =>
                      handleFormChange(owner.id, 'companyName', value)
                    }
                  />
                </div>

                <div className="">
                  <FormFieldText
                    isFixedValue={readonly}
                    label={t('Last Name')}
                    isRequired
                    validateCaller={validateCaller}
                    id="lastName"
                    value={owner.lastName}
                    onChange={(value) =>
                      handleFormChange(owner.id, 'companyName', value)
                    }
                  />
                </div>
              </>
            )}

            <div className="col-span-1">
              <FormFieldNumber
                isFixedValue={readonly}
                label={t('Ownership (%)')}
                isRequired
                validateCaller={validateCaller}
                id="ownership"
                value={owner.ownership}
                onChange={(value) =>
                  handleFormChange(owner.id, 'ownership', value)
                }
              />
            </div>

            <div className="col-span-1">
              <FormFieldMultipleUpload
                maxFiles={3}
                isFixedValue={readonly}
                label={t('Document')}
                isRequired
                validateCaller={validateCaller}
                id={`document-${owner.id}`}
                onChange={(value) =>
                  handleFormChange(
                    owner.id,
                    'document',
                    value?.map((f) => f.name),
                  )
                }
                value={owner?.document?.map((doc) => ({
                  id: doc,
                  name: doc,
                  url: doc,
                }))}
              />
            </div>

            {owners.length > 1 && (
              <button
                className="cursor-pointer mt-auto mb-2 xl:block hidden"
                onClick={() => {
                  onChange?.(owners?.filter((o) => o.id !== owner.id));
                }}
              >
                <IconXCircle />
              </button>
            )}
          </div>
        </div>
      ))}

      {!readonly && (
        <ButtonCs
          className={cn(
            '',
            {
              'bg-disable cursor-not-allowed': totalShare >= 100,
            },
          )}
          onClick={handleAddOwner}
          disabled={totalShare >= 100}
          icon={ <IconEssential />}
        >
          {t('Add Owner')}
        </ButtonCs>
      )}
    </div>
  );
}
