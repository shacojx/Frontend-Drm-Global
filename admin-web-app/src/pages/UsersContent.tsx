import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ApiSearchUserParam, ApiViewUserParam, ViewedUser } from '../api/types';
import { callApiSearchUser, callApiLViewUser } from '../api/userManagement';
import { DialogContainer } from '../components/DialogContainer';
import { FormCreateAdminAccount } from '../components/FormCreateAdminAccount';
import { FormFieldEmail } from '../components/FormFieldEmail';
import { FormFieldPhoneNumber } from '../components/FormFieldPhoneNumber';
import { UserDetailAndEdit } from '../components/UserDetailAndEdit';
import { useValidateCaller } from '../hooks-ui/useValidateCaller';
import { extractPhone, RNPhoneValue } from '../services-business/api/generate-api-param/account';
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridPaginationModel,
  GridRowEventLookup,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { useApiGetUsers } from '../hooks/api/user';
import { capitalize } from 'lodash-es';

type Props = {};

export function UsersContent(props: Props) {
  const translation = useTranslation();
  const { validateCaller } = useValidateCaller();
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<RNPhoneValue | undefined>();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 25,
    page: 0,
  });

  const [userClicked, setUserClicked] = useState<ViewedUser>();
  const [shouldShowCreateUser, setShouldShowCreateUser] = useState<boolean>();

  const { data, isLoading: gettingUsers, refetch } = useApiGetUsers({
    page: paginationModel.page,
    size: paginationModel.pageSize,
    phone: phone ? extractPhone(phone).localPhone : '',
    codePhone: phone ? extractPhone(phone).nationPhone : '',
    email
  });
  const tableData = data?.content || [];
  const userCount = data?.totalElements;

  const handleClickSearch = async () => {
    await refetch()
  }

  function handleRowClick(params: GridRowEventLookup['rowClick']['params']) {
    setUserClicked(params.row);
  }

  async function handleEdit() {
    const param: ApiViewUserParam = {
      page: paginationModel.page,
      size: paginationModel.pageSize,
    };
    const { data } = await refetch()
    const updatedUserClicked = data?.content.find((user) => user.id === userClicked?.id);
    if (updatedUserClicked) {
      setUserClicked(updatedUserClicked);
    }
  }

  async function handleCreated() {
    const param: ApiViewUserParam = {
      page: paginationModel.page,
      size: paginationModel.pageSize,
    };
    const rawResult = await callApiLViewUser(param);
    // setTableData(rawResult.content);
  }

  const handleClear = () => {
    setPhone(undefined)
    setEmail('')
  }

  // TODO: add i18n for columns
  const userColumns: GridColDef<ViewedUser>[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'roles',
      headerName: 'Role',
      sortable: false,
      type: 'string',
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>{
        const role = (params.row.roles[params.rowNode.depth].name || '') as string;
        
        return capitalize(role.split('_')[1])
      },
    },
    {
      field: 'enable',
      headerName: 'Status',
      sortable: false,
      type: 'string',
      width: 80,
      valueGetter: (params: GridValueGetterParams) => (params.row.enable ? 'Active' : 'Inactive'),
      cellClassName: (params: GridCellParams) => {
        if (params.value === 'Active') {
          return 'text-success';
        }
        return 'text-danger';
      },
    },
    {
      field: 'name',
      headerName: 'Full Name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      // width: 160,
      flex: 1, 
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'email',
      headerName: 'Email',
      sortable: false,
      type: 'string',
      // width: 200,
      flex: 1
    },
    {
      field: 'phone',
      headerName: 'Phone',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.codePhone || ''} ${params.row.phone || ''}`,
    },
    {
      field: 'llcInNation',
      headerName: 'Nation',
      sortable: false,
      type: 'string',
      width: 120,
    },
    {
      field: 'kycStatus',
      headerName: 'KYC Status',
      sortable: false,
      type: 'string',
      width: 120,
    },
  ];

  return (
    <div className={'w-full grow flex flex-col p-3'}>
      <div
        className={
          'flex flex-col grow overflow-x-hidden overflow-y-scroll bg-white rounded justify-start items-center py-6 px-4 sm:px-8'
        }
      >
        <p className={'text-h4 w-full text-start mb-6'}>{translation.t('User Management')}</p>
        <div className={'w-full flex flex-row justify-between items-center gap-10 mb-4'}>
          <div className={'flex flex-row justify-start items-end gap-4 mb-4'}>
            <FormFieldEmail
              id={'email'}
              validateCaller={validateCaller}
              onChange={setEmail}
              value={email}
            />
            <FormFieldPhoneNumber
              id={'phone'}
              validateCaller={validateCaller}
              onChange={setPhone}
              value={phone}
              placeholder={'Input number'}
            />
            <button
              onClick={handleClickSearch}
              className="h-10 px-6 flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg shrink-0"
            >
              {translation.t('Search')}
            </button>
            <button
              onClick={handleClear}
              className="h-10 px-6 flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg shrink-0"
            >
              {translation.t('Clear')}
            </button>
          </div>
          <button
            onClick={setShouldShowCreateUser.bind(undefined, true)}
            className="h-10 px-6 flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg w-max line-clamp-1"
          >
            {translation.t('Create new')}
          </button>
        </div>
        <div className={'w-full grow'} key={tableData.map((value) => value.id).join('_')}>
          <DataGrid
            paginationMode="server"
            rows={tableData}
            columns={userColumns}
            pageSizeOptions={[25]}
            rowCount={userCount || 0}
            paginationModel={paginationModel}
            onPaginationModelChange={(model) => setPaginationModel(model)}
            onRowClick={handleRowClick}
            loading={gettingUsers}
          />
        </div>
      </div>
      {userClicked && (
        <DialogContainer
          isAutoSize
          handleClickOverlay={(shouldOpen: boolean) => !shouldOpen && setUserClicked(undefined)}
        >
          <div className="w-full max-w-[1000px] justify-center items-center py-8 px-4 flex flex-col">
            <div className="w-full mx-4 flex justify-center items-center flex-col gap-y-8">
              <UserDetailAndEdit
                userInfo={userClicked}
                onClose={setUserClicked.bind(undefined, undefined)}
                onEdit={handleEdit}
              />
            </div>
          </div>
        </DialogContainer>
      )}
      {shouldShowCreateUser && (
        <DialogContainer
          isAutoSize
          handleClickOverlay={(shouldOpen: boolean) =>
            !shouldOpen && setShouldShowCreateUser(false)
          }
        >
          <div className="w-full max-w-[1600px] justify-center items-center py-8 px-4 flex flex-col">
            <div className="w-full mx-4 flex justify-center items-center flex-col gap-y-8">
              <FormCreateAdminAccount onCreated={handleCreated} />
            </div>
          </div>
        </DialogContainer>
      )}
    </div>
  );
}
