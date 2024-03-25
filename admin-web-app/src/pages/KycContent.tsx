import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridValueGetterParams
} from "@mui/x-data-grid";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DialogContainer } from "../components/DialogContainer";
import { DialogConfirmFullScreen, DialogSuccessFullscreen } from "../components/DialogFormStatusFullscreen";
import { useApiApproveKYC, useApiGetKYCs, useApiRejectKYC } from "../hooks/api/kyc";
import { generateFormatDate } from "../services-ui/date";

type Props = {}

export function KycContent(props: Props) {
  const translation = useTranslation()
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 25,
    page: 0,
  });
  const [shouldShowConfirmDialog, setShouldShowConfirmDialog] = useState<false | "approve" | "reject">()
  const [shouldShowPictureDialog, setShouldShowPictureDialog] = useState<boolean>()
  const [idSelected, setIdSelected] = useState<number>()
  const [pictureIndexInit, setPictureIndexInit] = useState<number>(0)

  const [showSuccessDialog, setShowSuccessDialog] = useState<false | "approve" | "reject">(false)

  const {data, isLoading: gettingKYCs, refetch} = useApiGetKYCs({
    page: paginationModel.page,
    size: paginationModel.pageSize
  })

  const tableData = data?.content ?? []
  const kycCount = data?.totalElements 


  const {mutateAsync: approveKYC, isPending: approvingKYC} = useApiApproveKYC()
  const {mutateAsync: rejectKYC,  isPending: rejectingKYC } = useApiRejectKYC()

  const handleClickReject = (id: number) => {
    setIdSelected(id)
    setShouldShowConfirmDialog("reject")
  }

  const handleClickApproved = (id: number) => {
    setIdSelected(id)
    setShouldShowConfirmDialog("approve")
  }

  const handleCancel = () => {
    setIdSelected(undefined)
    setShouldShowConfirmDialog(false)
  }

  const handleConfirm = async () => {
    if (!idSelected) return

    setShouldShowConfirmDialog(false)

    if (shouldShowConfirmDialog === "approve") {
      await approveKYC(idSelected)
      setShowSuccessDialog('approve')
      return
    } {
      await rejectKYC(idSelected)
      setShowSuccessDialog('reject')
      return
    }
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
          <button onClick={() => handleClickReject(params.row.id)}
               className={"py-2 px-3 rounded-lg cursor-pointer bg-red-100 hover:bg-red-200 text-danger"}
          >
            Reject
          </button>
          <button onClick={() => handleClickApproved(params.row.id)}
               className={"py-2 px-3 rounded-lg cursor-pointer bg-green-100 hover:bg-green-200 text-success"}
          >
            Approved
          </button>
        </div>
      }
    },
  ];

  return (
    <div className={'w-full grow flex flex-col p-3'}>
      <div
        className={
          'flex flex-col grow overflow-x-scroll overflow-y-scroll bg-white rounded justify-start items-center py-6 px-4 sm:px-8'
        }
      >
        <p className={'text-h4 w-full text-start mb-6'}>{translation.t('KYC Management')}</p>
        <div className={'w-full grow'} key={tableData.map((value) => value.id).join('_')}>
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
      {shouldShowConfirmDialog && (
        <DialogConfirmFullScreen
          onClose={() => setShouldShowConfirmDialog(false)}
          title={
            shouldShowConfirmDialog === 'approve' ? 'Approve KYC Request?' : 'Reject KYC Request?'
          }
          content={'This action cannot be undone!'}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}

      {shouldShowPictureDialog && (
        <DialogContainer
          handleClickOverlay={() => setShouldShowPictureDialog(false)}
          isAutoSize
          isCloseOnClickOverlay
        >
          <div className="w-full max-w-[400px] justify-center items-center py-8 px-4 flex flex-col">
            <div className="w-full mx-4 flex justify-center items-center flex-col gap-y-8"></div>
          </div>
        </DialogContainer>
      )}

      {showSuccessDialog && <DialogSuccessFullscreen onClose={() => setShowSuccessDialog(false)} title={showSuccessDialog==='approve' ? 'Approved' : 'Rejected'} />}
    </div>
  );
}
