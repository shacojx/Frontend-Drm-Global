import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ApiSearchUserParam, ApiViewUserParam, ViewedUser } from "../api/types";
import { callApiSearchUser, callApiLViewUser } from "../api/userManagement";
import { FormFieldEmail } from "../components/FormFieldEmail";
import { FormFieldPhoneNumber } from "../components/FormFieldPhoneNumber";
import { useValidateCaller } from "../hooks-ui/useValidateCaller";
import { extractPhone, RNPhoneValue } from "../services-business/api/generate-api-param/account";
import { DataGrid, GridColDef, GridPaginationModel, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef<ViewedUser>[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'name',
    headerName: 'Full Name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'email',
    headerName: 'Email',
    sortable: false,
    type: 'string',
    width: 200,
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
    field: 'companyType',
    headerName: 'Company Type',
    sortable: false,
    type: 'string',
    width: 120,
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
  {
    field: 'roles',
    headerName: 'Role',
    sortable: false,
    type: 'string',
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.roles[params.rowNode.depth].name || ''}`,
  },
];

type Props = {}

export function UsersContent(props: Props) {
  const translation = useTranslation()
  const {validateCaller, validateAll} = useValidateCaller()
  const [email,setEmail] = useState<string>('')
  const [phone, setPhone] = useState<RNPhoneValue | undefined>()
  const [tableData, setTableData] = useState<ViewedUser[]>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });
  const [userCount, setUserCount] = useState<number>()

  useEffect(() => {
    const fetchData = async () => {

      const param: ApiViewUserParam = {
        page: paginationModel.page,
        size: paginationModel.pageSize
      }
      const rawResult = await callApiLViewUser(param)
      setTableData(rawResult.content);
      setUserCount(rawResult.totalElements)
    };

    fetchData();
  }, [paginationModel]);

  async function handleClickSearch() {
    const {localPhone, nationPhone} = phone
      ? extractPhone(phone)
      : {localPhone: '', nationPhone: ''}
    const param: ApiSearchUserParam = {
      phone: localPhone,
      codePhone: nationPhone,
      email,
    }
    const rawResult = await callApiSearchUser(param)
    if (rawResult) {
      setTableData([rawResult]);
      setUserCount(1)
    }
  }

  return <div className={"w-full grow flex flex-col p-3"}>
    <div
      className={"flex flex-col grow overflow-x-hidden overflow-y-scroll bg-white rounded justify-start items-center py-6 px-4 sm:px-8"}>
      <p className={"text-h4 w-full text-start mb-6"}>{translation.t('User Management')}</p>
      <div className={"w-full flex flex-row justify-start items-end gap-10 mb-4"}>
        <FormFieldEmail id={"email"} validateCaller={validateCaller} onChange={setEmail} value={email}/>
        <FormFieldPhoneNumber id={"phone"} validateCaller={validateCaller} onChange={setPhone} value={phone}
                              placeholder={"Input number"}/>
        <button onClick={handleClickSearch}
                className="h-[52px] px-6 flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg">
          {translation.t('Search')}
        </button>
      </div>
      <div className={"w-full grow"} key={tableData.map(value => value.id).join("_")}>
        <DataGrid
          paginationMode="server"
          rows={tableData}
          columns={columns}
          pageSizeOptions={[10]}
          rowCount={userCount || 0}
          paginationModel={paginationModel}
          onPaginationModelChange={(model) => setPaginationModel(model)}
        />
      </div>
    </div>
  </div>
}
