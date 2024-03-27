import { Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ApiMasterServiceParam,
  CompanyTypeValue,
  ServiceCycle,
  ServiceStep,
} from '../../api/types';
import { FormFieldText } from '../../components/FormFieldText';
import { NATION_INFOS } from '../../constants/SelectionOptions';
import { useValidateCaller } from '../../hooks-ui/useValidateCaller';
import { ErrorMessage } from '../ErrorMessage';
import { FormFieldMultiSelect } from '../FormFieldMultiSelect';
import { FormFieldSelect } from '../FormFieldSelect';
import { OptionInfo } from '../../types/common';

export type ServiceInformationProps = {
  appliedNation: string[];
  applyCompanyType: string[];
  serviceType: string;
  enable: boolean;
  serviceName: string;
  serviceDescription: string;
  onUpdateBody: (
    name: string,
    value:
      | string
      | string[]
      | number
      | ServiceCycle[]
      | ServiceStep[]
      | boolean,
  ) => void;
  validatorSchema: {
    error: Record<keyof ApiMasterServiceParam, boolean>;
    isError: boolean;
  };
  isSubmitted: boolean;
};

export const APPLY_COMPANY_TYPE: OptionInfo<CompanyTypeValue>[] = [
  { label: 'LLC', value: 'LLC' },
  { label: 'PLC', value: 'PLC' },
]

export const SERVICE_TYPE: OptionInfo<string>[] = [
  { label: 'Based', value: 'Based' },
  { label: 'Add-on', value: 'Add-on' },
]

export function ServiceInformation(props: ServiceInformationProps) {
  const translation = useTranslation();
  const { validateCaller } = useValidateCaller();
  const onUpdateAppliedNation = React.useCallback(
    (v: string[]) => {
      props.onUpdateBody('appliedNation', v);
    },
    [props.onUpdateBody],
  );

  const onUpdateAppliedCompanyType = React.useCallback(
    (v: string[]) => {
      props.onUpdateBody('appliedCompanyType', v);
    },
    [props.onUpdateBody],
  );

  const onUpdateServiceDescription = React.useCallback(
    (v: string) => {
      props.onUpdateBody('serviceDescription', v);
    },
    [props.onUpdateBody],
  );
  const onUpdateServiceType = React.useCallback(
    (v: string) => {
      props.onUpdateBody('serviceType', v);
    },
    [props.onUpdateBody],
  );

  const onUpdateServiceName = React.useCallback(
    (v: string) => {
      props.onUpdateBody('serviceName', v);
    },
    [props.onUpdateBody],
  );

  return (
    <div
      className={
        'flex flex-col grow bg-white rounded justify-start items-center'
      }
    >
      <div
        className={
          'w-full flex flex-row justify-between items-center gap-10 mb-4'
        }
      >
        <div
          className={'w-full flex flex-row justify-start items-end gap-10 mb-4'}
        >
          <Grid container spacing={2}>
            <Grid item md={2}>
              <FormFieldMultiSelect
                id={'appliedNation'}
                isRequired={true}
                validateCaller={validateCaller}
                label={translation.t('masterService.appliedNation')}
                onChange={onUpdateAppliedNation}
                value={props.appliedNation as string[]}
                defaultValue={NATION_INFOS?.at(0)?.value}
                optionInfos={NATION_INFOS}
                placeholder={translation.t(
                  'masterService.appliedNationPlaceholder',
                )}
                errorComponent={
                  <ErrorMessage
                    message={translation.t('masterService.appliedNationError')}
                    isError={!props.appliedNation.length}
                    showErrorMessage={props.isSubmitted}
                  />
                }
              />
            </Grid>
            <Grid item md={2}>
              <FormFieldMultiSelect
                id={'applyCompanyType'}
                validateCaller={validateCaller}
                isRequired={true}
                label={translation.t('masterService.serviceCompanyType')}
                onChange={onUpdateAppliedCompanyType}
                value={props.applyCompanyType}
                optionInfos={APPLY_COMPANY_TYPE}
                defaultValue={APPLY_COMPANY_TYPE?.at(0)?.value}
                placeholder={translation.t(
                  'masterService.appliedCompanyTypePlaceholder',
                )}
                errorComponent={
                  <ErrorMessage
                    message={translation.t(
                      'masterService.appliedCompanyTypeError',
                    )}
                    isError={!props.applyCompanyType.length}
                    showErrorMessage={props.isSubmitted}
                  />
                }
              />
            </Grid>
            <Grid item md={2}>
              <FormFieldSelect
                id={'serviceType'}
                isRequired={true}
                label={translation.t('masterService.serviceType')}
                validateCaller={validateCaller}
                onChange={onUpdateServiceType}
                value={props.serviceType}
                optionInfos={SERVICE_TYPE}
                placeholder={translation.t(
                  'masterService.serviceTypePlaceholder',
                )}
                errorComponent={
                  <ErrorMessage
                    message={translation.t('masterService.serviceTypeError')}
                    isError={!props.serviceType.length}
                    showErrorMessage={props.isSubmitted}
                  />
                }
              />
            </Grid>
            <Grid item md={2}>
              <FormFieldText
                id={'serviceName'}
                isRequired={true}
                validateCaller={validateCaller}
                label={translation.t('masterService.serviceName')}
                onChange={onUpdateServiceName}
                value={props.serviceName}
                placeholder={translation.t(
                  'masterService.serviceNamePlaceholder',
                )}
                errorComponent={
                  <ErrorMessage
                    message={translation.t('masterService.serviceTypeError')}
                    isError={!props.serviceName.length}
                    showErrorMessage={props.isSubmitted}
                  />
                }
              />
            </Grid>
            <Grid item md={4}>
              <FormFieldText
                id={'description'}
                label={translation.t('masterService.description')}
                placeholder={translation.t(
                  'masterService.serviceDescriptionPlaceholder',
                )}
                validateCaller={{}}
                onChange={onUpdateServiceDescription}
                value={props.serviceDescription}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
