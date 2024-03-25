import {ServiceSearchFilter} from '../types/serviceSearchFilter';
import {callApi} from '../services-base/api';
import {RawResult, ViewedUser} from './types';
import {Service} from '../types/service';

export async function callApiGetListService(
  param?: Partial<ServiceSearchFilter>,
): Promise<RawResult<Service[]>> {
  const path = '/api/admin/get-paid-service';
  return await callApi<RawResult<Service[]>>(
    'GET',
    path,
    param as Partial<ServiceSearchFilter>,
    true,
  );
  // const mockOutput: Service[] = [
  //   {
  //     updatedAt: '2024-03-24T16:14:15.000+00:00',
  //     createdAt: '2024-03-24T16:14:15.000+00:00',
  //     id: 1,
  //     userId: 2,
  //     serviceId: 1,
  //     serviceType: 'Based',
  //     serviceName: 'Dev MS 1',
  //     serviceDescription: 'Dev create for dev',
  //     statusService: 'Pending',
  //     cycleNumber: 1,
  //     pricePerCycle: 1000,
  //     transitionId: 1711296855259,
  //     statusPayment: 'Pending',
  //     statusContract: 'Pending',
  //     contractFile: null,
  //     pic: null,
  //     serviceStep: [
  //       {
  //         id: 1,
  //         stepNo: 1,
  //         stepName: 'Step 1',
  //         statusStep: 'Pending',
  //         estimatedCompletionTime: '2 to 4 days',
  //         description: 'Step 1 des',
  //         adminRemark: null,
  //         customerDocument: [
  //           {
  //             id: 1,
  //             requiredDocument: 'Doc 1',
  //             fileDocument: null,
  //           },
  //         ],
  //         result: [
  //           {
  //             id: 1,
  //             requiredDocument: 'Doc 1 Result',
  //             fileDocument: null,
  //           },
  //         ],
  //       },
  //       {
  //         id: 2,
  //         stepNo: null,
  //         stepName: 'Step 2',
  //         statusStep: 'Pending',
  //         estimatedCompletionTime: '1 to 2 days',
  //         description: 'Last step without doc required',
  //         adminRemark: null,
  //         customerDocument: [],
  //         result: [
  //           {
  //             id: 2,
  //             requiredDocument: 'Step 2 Result',
  //             fileDocument: null,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     updatedAt: '2024-03-24T16:14:15.000+00:00',
  //     createdAt: '2024-03-24T16:14:15.000+00:00',
  //     id: 2,
  //     userId: 2,
  //     serviceId: 2,
  //     serviceType: 'Add-on',
  //     serviceName: 'Dev Add-on 1',
  //     serviceDescription: '',
  //     statusService: 'Pending',
  //     cycleNumber: 1,
  //     pricePerCycle: 300,
  //     transitionId: 1711296855259,
  //     statusPayment: 'Pending',
  //     statusContract: 'Pending',
  //     contractFile: null,
  //     pic: null,
  //     serviceStep: [
  //       {
  //         id: 3,
  //         stepNo: 1,
  //         stepName: 'Step 1',
  //         statusStep: 'Pending',
  //         estimatedCompletionTime: '3-4 days',
  //         description: 'Add-on des',
  //         adminRemark: null,
  //         customerDocument: [],
  //         result: [],
  //       },
  //       {
  //         id: 4,
  //         stepNo: null,
  //         stepName: 'Step 2',
  //         statusStep: 'Pending',
  //         estimatedCompletionTime: '1-2 days',
  //         description: 'Des step 2',
  //         adminRemark: null,
  //         customerDocument: [],
  //         result: [],
  //       },
  //     ],
  //   },
  // ];
  // return Promise.resolve(mockOutput);
}

export async function callApiGetServiceDetail(serviceId: number) {
  const path = '/api/admin/get-paid-service/' + serviceId;
  return await callApi<Service>(
    'GET',
    path,
    {} as Partial<ServiceSearchFilter>,
    true,
  );
}

export async function callApiUpdatePic(data: { id: number; email: string }) {
  const path = '/api/admin/update-pic';
  return await callApi<ViewedUser[]>('POST', path, data, true);
}

export async function callApiUpdateAdminRemark(data: {
  id: number;
  adminRemark: string;
}) {
  const path = '/api/admin/update-admin-remark';
  return await callApi<ViewedUser[]>('POST', path, data, true);
}

export async function callApiUploadStatusStep(data: {
  id: number;
  status: string;
}) {
  const path = '/api/admin/update-status-step';
  return await callApi('POST', path, data, true);
}
