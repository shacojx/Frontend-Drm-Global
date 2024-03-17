import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridValueGetterParams
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { callApiGetKyc } from "../api/kycManagement";
import { ApiGetKycParam, KycDetail, RawResultGetKyc } from "../api/types";
import { DialogContainer } from "../components/DialogContainer";
import { DialogConfirmFullScreen } from "../components/DialogFormStatusFullscreen";
import { generateFormatDate } from "../services-ui/date";

type Props = {}
const sampleRow:RawResultGetKyc = {
  "content": [
    {
      "id": 2,
      "llcInNation": "United States",
      "username": "shacojx0011@gmail.com",
      "email": "shacojx0011@gmail.com",
      "codePhone": "+84",
      "phone": "383052825",
      "companyType": "Buon lau",
      "companyName": "",
      "entityEnding": "",
      "industry": "",
      "website": "",
      "companyDescription": "",
      "enable": 1,
      "firstName": "Sample",
      "lastName": "Row",
      "avatarImage": null,
      "kycStatus": "In-progress",
      "passport": null,
      "pictureHoldPassport": null,
      "requestKYCAt": "2024-03-17T09:03:41.000+00:00",
      "roles": [
        {
          "id": 1,
          "name": "ROLE_USER"
        }
      ]
    },
    {
      "id": 1,
      "llcInNation": "USA",
      "username": "toanvv1@gmail.com",
      "email": "toanvv1@gmail.com",
      "codePhone": "+84",
      "phone": "383052877",
      "companyType": "LLC",
      "companyName": "LuxPay",
      "entityEnding": "demo entityEnding",
      "industry": "Demo industry",
      "website": "luxpay.com",
      "companyDescription": "công ty thanh toán tiền tệ",
      "enable": 1,
      "firstName": "Sample",
      "lastName": "Row",
      "avatarImage": "picture-1-1710614359562.jpg",
      "kycStatus": "In-progress",
      "passport": "passport-1-1710664838998.jpg",
      "pictureHoldPassport": "picture-1-1710664839017.jpg",
      "requestKYCAt": "2024-03-17T08:40:39.000+00:00",
      "roles": [
        {
          "id": 3,
          "name": "ROLE_ADMIN"
        }
      ]
    }
  ],
  "totalPages": 2,
  "totalElements": 4,
}
export function KycContent(props: Props) {
  const translation = useTranslation()
  const [tableData, setTableData] = useState<KycDetail[]>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 25,
    page: 0,
  });
  const [kycCount, setKycCount] = useState<number>()
  const [shouldShowConfirmDialog, setShouldShowConfirmDialog] = useState<boolean>()
  const [shouldShowPictureDialog, setShouldShowPictureDialog] = useState<boolean>()
  const [isApproved, setIsApproved] = useState<boolean>()
  const [idSelected, setIdSelected] = useState<number>()
  const [pictureIndexInit, setPictureIndexInit] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      const param: ApiGetKycParam = {
        page: paginationModel.page,
        size: paginationModel.pageSize
      }
      const rawResult = await callApiGetKyc(param)
      setTableData([...rawResult.content, ...sampleRow.content]);
      setKycCount(rawResult.totalElements)
    };

    fetchData().catch(e=> console.log(e))
  }, [paginationModel]);

  function handleClickReject(id: number) {
    setIsApproved(false)
    setIdSelected(id)
    setShouldShowConfirmDialog(true)
  }

  function handleClickApproved(id: number) {
    setIsApproved(true)
    setIdSelected(id)
    setShouldShowConfirmDialog(true)
  }

  function handleCancel() {
    setIsApproved(undefined)
    setIdSelected(undefined)
    setShouldShowConfirmDialog(false)
  }

  function handleConfirm() {
    // TODO: implement
    try {

    } catch (e) {
      console.error(e)
    }
    setIsApproved(undefined)
    setShouldShowConfirmDialog(false)
  }

  function handleClickPhoto(id: number, type: 'passport' | 'holdPassport') {
    if (type === 'passport') {
      setPictureIndexInit(0)
    } else {
      setPictureIndexInit(1)
    }
    setShouldShowPictureDialog(true)
  }

  // TODO: add i18n for columns
  const kycColumns: GridColDef[] = [
    {
      field: 'kycStatus',
      headerName: 'Status',
      sortable: false,
      type: 'string',
      width: 120,
      renderCell: (params: GridRenderCellParams) => {
        if (params.value === 'In-progress') {
          return <div><div className={"text-yellow-700 bg-yellow-100 py-2 px-3 rounded-xl"}>{params.value}</div></div>
        } else if (params.value === 'Approved') {
          return <div><div className={"text-green-500 bg-green-100 py-2 px-3 rounded-xl"}>{params.value}</div></div>
        } else {
          return <div><div>{params.value}</div></div>
        }
      },
    },
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
      field: 'requestKYCAt',
      headerName: 'Requested on',
      sortable: false,
      type: 'string',
      width: 120,
      valueGetter: (params: GridValueGetterParams) =>
        `${generateFormatDate(new Date(params.row.requestKYCAt))}`,
    },
    {
      field: 'photos',
      headerName: 'Photos',
      sortable: false,
      type: 'string',
      width: 120,
      renderCell: (params: GridRenderCellParams) => {
        return <div className={"flex flex-col gap-1"}>
          <p className={"underline text-blue-500 cursor-pointer"} onClick={handleClickPhoto.bind(undefined, params.row.id, params.row)}>Passport</p>
          <p className={"underline text-blue-500 cursor-pointer"} onClick={handleClickPhoto.bind(undefined, params.row.id, params.row)}>Hold Passport</p>
        </div>
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      type: 'string',
      width: 200,
      renderCell: (params: GridRenderCellParams) => {
        return <div className={"flex flex-row gap-3"}>
          <button onClick={handleClickReject.bind(undefined, params.row.id)}
               className={"py-2 px-3 rounded-lg cursor-pointer bg-red-100 hover:bg-red-200 text-danger"}
          >
            Reject
          </button>
          <button onClick={handleClickApproved.bind(undefined, params.row.id)}
               className={"py-2 px-3 rounded-lg cursor-pointer bg-green-100 hover:bg-green-200 text-success"}
          >
            Approved
          </button>
        </div>
      }
    },
  ];

  return <div className={"w-full grow flex flex-col p-3"}>
    <div
      className={"flex flex-col grow overflow-x-scroll overflow-y-scroll bg-white rounded justify-start items-center py-6 px-4 sm:px-8"}>
      <p className={"text-h4 w-full text-start mb-6"}>{translation.t('KYC Management')}</p>
      <div className={"w-full grow"} key={tableData.map(value => value.id).join("_")}>
        <DataGrid
          paginationMode="server"
          rows={tableData}
          columns={kycColumns}
          pageSizeOptions={[25]}
          rowCount={kycCount || 0}
          paginationModel={paginationModel}
          onPaginationModelChange={(model) => setPaginationModel(model)}
        />
      </div>
    </div>
    {shouldShowConfirmDialog && <DialogConfirmFullScreen
      onClose={setShouldShowConfirmDialog.bind(undefined, false)}
      title={isApproved ? "Approve KYC Request?" : "Reject KYC Request?"}
      content={"This action cannot be undone"}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />}
    {shouldShowPictureDialog && <DialogContainer
      handleClickOverlay={setShouldShowPictureDialog.bind(undefined, false)}
      isAutoSize
      isCloseOnClickOverlay
    >
      <div className="w-full max-w-[400px] justify-center items-center py-8 px-4 flex flex-col">
        <div className="w-full mx-4 flex justify-center items-center flex-col gap-y-8">
        </div>
      </div>
    </DialogContainer>
    }
  </div>;
}
