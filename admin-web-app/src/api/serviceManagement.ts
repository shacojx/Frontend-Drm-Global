import { ServiceSearchFilter } from '../types/serviceSearchFilter';
import { Service } from '../types/service';

export async function callApiGetServiceDetail(param?: ServiceSearchFilter) {
  const mockOutput: Service[] = [
    {
      id: '1',
      status: 'PENDING',
      kyc: 'PENDING',
      corporationProfile: 'PENDING',
      payment: 'PENDING',
      serviceName: 'Service AAA',
      customerName: 'Nguyễn Văn A',
      phoneNumber: '0123456789',
      customerEmail: 'anv@gmail.com',
    },
    {
      id: '2',
      status: 'IN_PROGRESS',
      kyc: 'PENDING',
      corporationProfile: 'PENDING',
      payment: 'PENDING',
      serviceName: 'Service ABC',
      customerName: 'Nguyễn Văn B',
      phoneNumber: '0123456789',
      customerEmail: 'anv@gmail.com',
    },
    {
      id: '3',
      status: 'APPROVED',
      kyc: 'PENDING',
      corporationProfile: 'PENDING',
      payment: 'PENDING',
      serviceName: 'Service 123',
      customerName: 'Nguyễn Văn A',
      phoneNumber: '0123456789',
      customerEmail: 'anv@gmail.com',
    },
  ];
  return Promise.resolve(mockOutput);
}
