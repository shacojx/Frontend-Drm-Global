import { Currency, MyServiceType, RawService } from "../../../api/types";
import { Service } from "../../../pages/ServicesContent/ServicesContent";

// TODO fix type
export function filterServiceToDisplay(allServices: RawService[], allMyServices: MyServiceType[]): Service[] {
  const hasBaseService = !!allMyServices.find(service => service.serviceType === 'Based')
  // Logic: 1 user - 1 base service
  const servicesAfterFilterType = hasBaseService
    ? allServices.filter(service => service.serviceType !== 'Based')
    : allServices

  // Logic: can register new service only when the before was Issued
  const pendingService: number[] = []
  allMyServices.forEach(service => {
    if (service.statusService !== 'Issued') {
      pendingService.push(service.serviceId)
    }
  })
  const serviceAfterFilterTypeAndStatus = servicesAfterFilterType
    .filter(service => !pendingService.includes(service.id))

  // Logic: price of next or last cycle
  const lastPaidCycleMap: Record<MyServiceType['serviceId'], MyServiceType['cycleNumber']> = {}
  allMyServices.forEach(myService => {
    if (!lastPaidCycleMap[myService.serviceId]) {
      lastPaidCycleMap[myService.serviceId] = myService.cycleNumber
    } else {
      const oldCycle: number = lastPaidCycleMap[myService.serviceId]
      if (myService.cycleNumber > oldCycle) {
        lastPaidCycleMap[myService.serviceId] = myService.cycleNumber
      }
    }
  })

  let appliedCycleMap: Record<string, any> = {}
  serviceAfterFilterTypeAndStatus
    .forEach(service => {
      const cycleSorted = service.serviceCycle
        .sort((a, b) => a.id - b.id)
      const hasPaid = lastPaidCycleMap[service.id]
      const firstCycle = cycleSorted[0]
      if (!hasPaid) {
        appliedCycleMap[service.id] = firstCycle
        return
      }
      const lastCycle = service.serviceCycle
        .find(serviceCycle => serviceCycle.cycleNumber == lastPaidCycleMap[service.id])
      const afterLastCycle = service.serviceCycle
        .find(serviceCycle => serviceCycle.cycleNumber == (lastPaidCycleMap[service.id] + 1))

      appliedCycleMap[service.id] = lastCycle
        ? afterLastCycle || lastCycle
        : firstCycle //TODO: it should be upgrade a better logic when cant find last cycle
    })
  return serviceAfterFilterTypeAndStatus
    .map(service => {
      return {
        id: service.id,
        label: service.serviceName,
        description: service.serviceDescription,
        agents: service.serviceStep.map((step: any) => step.name),
        price: appliedCycleMap[service.id].pricePerCycle,
        cycleNumber: appliedCycleMap[service.id].cycleNumber,
        currency: 'USD',
        serviceType: service.serviceType,
        serviceCycle: service.serviceCycle
      }
    }) as Service[]
}

