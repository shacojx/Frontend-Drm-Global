import { useState } from "react";
import { useTranslation } from "react-i18next";
import { RawResultGetUserProfile } from "../api/types";
import { FormFieldEmail } from "../components/FormFieldEmail";
import { FormFieldPhoneNumber } from "../components/FormFieldPhoneNumber";
import { useValidateCaller } from "../hooks-ui/useValidateCaller";
import { RNPhoneValue } from "../services-business/api/generate-api-param/account";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

// TODO: remove sample data
const columns: GridColDef<RawResultGetUserProfile & {id: number}>[] = [
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
    field: 'kycStatus',
    headerName: 'KYC Status',
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
];

const rows: (RawResultGetUserProfile & {id: number})[] = [
  {id: 1, llcInNation:	"USA", email:	"dev@drm.com", codePhone:"+84", phone:	"12345678", companyType:	"LLC", firstName:	"Hoang", lastName:	"Nguyen Van", kycStatus: "pending",},
  {id: 2, llcInNation:	"USA", email:	"dev@drm.com", codePhone:"+84", phone:	"12345678", companyType:	"LLC", firstName:	"Hoang", lastName:	"Nguyen Van", kycStatus: "pending",},
  {id: 3, llcInNation:	"USA", email:	"dev@drm.com", codePhone:"+84", phone:	"12345678", companyType:	"LLC", firstName:	"Hoang", lastName:	"Nguyen Van", kycStatus: "pending",},
  {id: 4, llcInNation:	"USA", email:	"dev@drm.com", codePhone:"+84", phone:	"12345678", companyType:	"LLC", firstName:	"Hoang", lastName:	"Nguyen Van", kycStatus: "pending",},
  {id: 5, llcInNation:	"USA", email:	"dev@drm.com", codePhone:"+84", phone:	"12345678", companyType:	"LLC", firstName:	"Hoang", lastName:	"Nguyen Van", kycStatus: "pending",},
  {id: 6, llcInNation:	"USA", email:	"dev@drm.com", codePhone:"+84", phone:	"12345678", companyType:	"LLC", firstName:	"Hoang", lastName:	"Nguyen Van", kycStatus: "pending",},
  {id: 7, llcInNation:	"USA", email:	"dev@drm.com", codePhone:"+84", phone:	"12345678", companyType:	"LLC", firstName:	"Hoang", lastName:	"Nguyen Van", kycStatus: "pending",},
  {id: 8, llcInNation:	"USA", email:	"dev@drm.com", codePhone:"+84", phone:	"12345678", companyType:	"LLC", firstName:	"Hoang", lastName:	"Nguyen Van", kycStatus: "pending",},
  {id: 9, llcInNation:	"USA", email:	"dev@drm.com", codePhone:"+84", phone:	"12345678", companyType:	"LLC", firstName:	"Hoang", lastName:	"Nguyen Van", kycStatus: "pending",},
  {id: 11, llcInNation:	"USA", email:	"dev@drm.com", codePhone:"+84", phone:	"12345678", companyType:	"LLC", firstName:	"Hoang", lastName:	"Nguyen Van", kycStatus: "pending",},
  {id: 12, llcInNation:	"USA", email:	"dev@drm.com", codePhone:"+84", phone:	"12345678", companyType:	"LLC", firstName:	"Hoang", lastName:	"Nguyen Van", kycStatus: "pending",},
  {id: 13, llcInNation:	"USA", email:	"dev@drm.com", codePhone:"+84", phone:	"12345678", companyType:	"LLC", firstName:	"Hoang", lastName:	"Nguyen Van", kycStatus: "pending",},
  {id: 14, llcInNation:	"USA", email:	"dev@drm.com", codePhone:"+84", phone:	"12345678", companyType:	"LLC", firstName:	"Hoang", lastName:	"Nguyen Van", kycStatus: "pending",},
  {id: 15, llcInNation:	"USA", email:	"dev@drm.com", codePhone:"+84", phone:	"12345678", companyType:	"LLC", firstName:	"Hoang", lastName:	"Nguyen Van", kycStatus: "pending",},
  {id: 16, llcInNation:	"USA", email:	"dev@drm.com", codePhone:"+84", phone:	"12345678", companyType:	"LLC", firstName:	"Hoang", lastName:	"Nguyen Van", kycStatus: "pending",},
  {id: 17, llcInNation:	"USA", email:	"dev@drm.com", codePhone:"+84", phone:	"12345678", companyType:	"LLC", firstName:	"Hoang", lastName:	"Nguyen Van", kycStatus: "pending",},
  {id: 18, llcInNation:	"USA", email:	"dev@drm.com", codePhone:"+84", phone:	"12345678", companyType:	"LLC", firstName:	"Hoang", lastName:	"Nguyen Van", kycStatus: "pending",},
  {id: 19, llcInNation:	"USA", email:	"dev@drm.com", codePhone:"+84", phone:	"12345678", companyType:	"LLC", firstName:	"Hoang", lastName:	"Nguyen Van", kycStatus: "pending",},
];

type Props = {}

export function UsersContent(props: Props) {
  const translation = useTranslation()
  const {validateCaller, validateAll} = useValidateCaller()
  const [email,setEmail] = useState<string>('')
  const [phone, setPhone] = useState<RNPhoneValue | undefined>()

  function handleClickSearch() {

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
      <div className={"w-full grow"}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {page: 0, pageSize: 10},
            },
          }}
        />
      </div>
    </div>
  </div>
}
