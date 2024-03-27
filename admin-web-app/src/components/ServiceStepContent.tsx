import { useTranslation } from 'react-i18next';
import { StatusBadge } from './StatusBadge';
import { Service, ServiceStep } from '../types/service';
import { Fragment, useEffect, useId, useRef, useState } from 'react';
import {
  callApiUpdateAdminRemark,
  callApiUploadStatusStep,
} from '../api/serviceManagement';
import { Status } from '../constants/StatusBadge';
import { ResultDocument } from './service/ResultDocument';
import { toast } from 'react-toastify';
import { UploadedDocumentType } from '../api/types';
import { DialogFailureFullscreen } from './DialogFormStatusFullscreen';
import { getFile } from '../api/upload';
import InputFile from './InputFile';
import { NONE_REQUIRED } from '../constants/global';
import {
  useApiServiceUpdateAdminRemark,
  useApiServiceUploadFinalContract,
  useApiServiceUploadStatusStep,
} from '../hooks-api/useServiceApi';
import { QueryClient, UseQueryResult } from '@tanstack/react-query';
import KeyFactory, {
  QueryKeyApi,
} from '../services-base/reactQuery/keyFactory';
import { FormFieldSelect } from './FormFieldSelect';
import { useValidateCaller } from '../hooks-ui/useValidateCaller';
import { IconAltArrowDown } from './icons';
import { Button, ButtonGroup, Grow, MenuItem, MenuList, Paper, Popover, Popper } from '@mui/material';
import ButtonCs from './ButtonCs';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

type Props = {
  serviceStep: ServiceStep | null;
  serviceId?: number | null;
  resGetServiceId?: UseQueryResult<Service, Error>;
};

export function ServiceStepContent({
  serviceStep,
  serviceId,
  resGetServiceId,
}: Props) {
  const { t } = useTranslation();

  const [file, setFile] = useState<File[]>([]);

  const [adminRemark, setAdminRemark] = useState('');
  const [statusStep, setStatusStep] = useState('');

  const { validateCaller, validateAll } = useValidateCaller();

  useEffect(() => {
    setAdminRemark(serviceStep?.adminRemark ?? '');
    setStatusStep(serviceStep?.statusStep ?? '');
    // @ts-ignore
    setFile(serviceStep?.result as File[]);
  }, [serviceStep]);

  const queryClient = new QueryClient();

  const mutateUpdateAdminRemark = useApiServiceUpdateAdminRemark();
  const mutateUploadStatusStep = useApiServiceUploadStatusStep();

  const updateAdminRemark = () => {
    if (serviceStep) {
      mutateUpdateAdminRemark.mutate(
        {
          id: serviceStep?.id,
          adminRemark,
        },
        {
          onSuccess: (data) => {
            toast.success(t('Update status remark successfully'));
          },
          onError: (error) => {
            toast.error(String(error));
          },
          onSettled: () => {
            resGetServiceId?.refetch();
          },
        },
      );
    }
  };

  const uploadStatusStep = (status: Status) => {
    if (serviceStep) {
      mutateUploadStatusStep.mutate(
        {
          id: serviceStep?.id,
          status,
        },
        {
          onSuccess: (data) => {
            toast.success(t('Update status step successfully'));
          },
          onError: (error) => {
            // toast.error(t('Update status step failed'));
            toast.error(String(error));
          },
          onSettled: () => {
            resGetServiceId?.refetch();
          },
        },
      );
    }
  };

  const onDownloadServiceUpload = (item: UploadedDocumentType) => {
    try {
      if (item.fileDocument) {
        getFile(item.fileDocument);
      }
    } catch (error) {
      toast.error(String(error));
      console.error('error: ', error);
    }
  };

  const mutateUploadFile = useApiServiceUploadFinalContract();

  // @ts-ignore
  const handleChangeFile = async (file?: File, id: number) => {
    if (!file) {
      setFile((pre) => {
        let newArr: File[] = [...pre];
        // @ts-ignore
        newArr[id] = file;
        return newArr;
      });
      return;
    }
    const formData = new FormData();
    // @ts-ignore
    formData.append('files', file);
    // @ts-ignore
    formData.append('id', id);
    try {
      const res = await mutateUploadFile.mutateAsync(formData);
      if (res) {
        toast.success(res.message);
        setFile((pre) => {
          let newArr: File[] = [...pre];
          // @ts-ignore
          newArr[id] = file;
          return newArr;
        });
        toast.success(t('Update file successfully'));
      }
    } catch (error) {
      toast.error(String(error));
      console.error('error: ', error);
    }
  };

  const SERVICE_STEP_STATUS = [
    {
      value: Status.PENDING,
      label: Status.PENDING,
    },
    {
      value: Status.IN_PROGRESS,
      label: Status.IN_PROGRESS,
    },
    {
      value: Status.READY,
      label: Status.READY,
    },
    {
      value: Status.CONFIRMED,
      label: Status.CONFIRMED,
    },
    {
      value: Status.APPROVED,
      label: Status.APPROVED,
    },
    {
      value: Status.ISSUED,
      label: Status.ISSUED,
    },
  ];

  const id = useId();

  const handleClickSendRemind = () => {};
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {};

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const options = [t('Send Payment Reminder'), t('Send Required Document Reminder')];

  return (
    <div className={'w-full border border-primary_25 rounded-xl py-lg px-xl'}>
      <div className={'flex gap-4 mb-4 items-center'}>
        <div className={'font-bold text-xl mr-auto'}>
          {serviceStep?.stepName}
        </div>

        <ButtonGroup
          variant="contained"
          ref={anchorRef}
          aria-label="Button group with a nested menu"
        >
          <Button onClick={handleClick}>{t('Send Reminder')}</Button>
          <Button
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <AltArrowDown />
          </Button>
        </ButtonGroup>
        <Popper
          sx={{
            zIndex: 1,
          }}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        disabled={index === 2}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <div>
              <Button variant="contained" {...bindTrigger(popupState)}>
                {t('Send Reminder')}
              </Button>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <ButtonCs>
                  <div>{t('Send Payment Reminder')}</div>
                </ButtonCs>
                <ButtonCs>
                  <div>{t('Send Required Document Reminder')}</div>
                </ButtonCs>
              </Popover>
            </div>
          )}
        </PopupState>

        {/* <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-sky-400 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
              {t('Send Reminder')}
              <IconAltArrowDown
                className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-primary text-white' : 'text-primary'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {t('Send Payment Reminder')}
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-primary text-white' : 'text-primary'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {t('Send Required Document Reminder')}
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu> */}
        <FormFieldSelect
          id={'serviceStepStatus'}
          onChange={uploadStatusStep}
          validateCaller={validateCaller}
          optionInfos={SERVICE_STEP_STATUS}
          value={statusStep as Status}
        ></FormFieldSelect>
      </div>
      <div className={'mb-4'}>
        <div className={'flex gap-4 mb-2 items-center'}>
          <span className={'text-lg font-bold'}>{t("Admin's remark")}</span>
          <button
            className="w-[100px] h-[35px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg py-2"
            onClick={updateAdminRemark}
          >
            {t('Save')}
          </button>
        </div>
        <textarea
          className={'w-full p-2 border rounded-xl border-gray-300'}
          maxLength={500}
          value={adminRemark}
          onChange={(e) => setAdminRemark(e.target.value)}
        ></textarea>
      </div>
      <div className="mt-rootRootPadding">
        <div className="text-base font-bold leading-6">
          {t('Customer document')}
        </div>
        <div className="border rounded-md border-primary_25 mt-md">
          <div className="border-b  border-primary_25 grid grid-cols-2 gap-md items-center py-md">
            <div className="px-md text-center">{t('Required document')}</div>
            <div className="px-md text-center">{t('Uploaded document')}</div>
          </div>
          <div className="grid grid-cols-2 gap-md items-center py-md">
            {serviceStep?.customerDocument.map((item, index) => (
              <Fragment key={`result${item.id}`}>
                <div className="text-[#3B3F48]/85 px-md text-center">
                  {index + 1}. {item.requiredDocument}
                </div>
                <div className="px-md text-center">
                  {item.fileDocument && (
                    <a
                      href="#"
                      className="text-primary font-bold hover:underline"
                      onClick={() => onDownloadServiceUpload(item)}
                    >
                      {index + 1}. {item.fileDocument}
                    </a>
                  )}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-rootRootPadding">
        <div className="text-base font-bold leading-6">
          {t('Service Result')}
        </div>
        <div className="border rounded-md border-primary_25 mt-md">
          <div className="border-b  border-primary_25 grid grid-cols-2 gap-md items-center py-md">
            <div className="px-md text-center">{t('Required document')}</div>
            <div className="px-md text-center">{t('Uploaded document')}</div>
          </div>
          <div className="grid grid-cols-2 gap-md items-center py-md">
            {serviceStep?.result.map((item, index) => (
              <Fragment key={`customerDocument${item.id}`}>
                <div className="px-md text-[#3B3F48]/85 text-center">
                  {index + 1}. {item.requiredDocument}
                </div>
                <div className="px-md flex justify-center items-center">
                  <InputFile
                    key={`file${item.id}`}
                    label={t('Upload')}
                    onChange={(file) => handleChangeFile(file, item.id)}
                    file={file?.[item.id]}
                    maxSize={10}
                    accept=".pdf,.png,.jpeg,.jpg,.xls,.docx,.ppt"
                    disabled={item.requiredDocument === NONE_REQUIRED}
                  />
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
