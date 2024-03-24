import { Currency, RawService } from "../../../api/types";
import { Service } from "../../../pages/ServicesContent/ServicesContent";

// TODO fix type
export function filterServiceToDisplay(allServices: RawService[], allPaidService: any[]): Service[] {
  const hasBaseService = !!allPaidService.find(service => service.serviceType === 'Based')
  const filterService = hasBaseService
    ? allServices.filter(service => service.serviceType !== 'Based')
    : allServices
  const cycleMap: Record<string, any> = {}
  allPaidService.forEach(service => {
    if (!cycleMap[service.serviceId as string]) {
      cycleMap[service.serviceId as string] = service.cycleNumber
    } else {
      const oldCycle = cycleMap[service.serviceId as string]['cycleNumber']
      if (service.cycleNumber > oldCycle) {
        cycleMap[service.serviceId as string] = service.cycleNumber
      }
    }
  })
  const pendingService: string[] = []
  allPaidService.forEach(service => {
    if (cycleMap[service.serviceId] && service.statusService !== 'Issued') {
      pendingService.push(service.serviceId)
    }
  })
  return filterService
    .filter(service => !pendingService.includes(service.id.toString()))
    .map(service => {
      const cycleSorted = service.serviceCycle
        .sort((a, b) => a.id - b.id)
      let price
      if (cycleMap[service.id]) {
        const item = service.serviceCycle
            .find(serviceCycle => serviceCycle.cycleNumber == cycleMap[service.id] + 1)
          || service.serviceCycle
            .find(serviceCycle => serviceCycle.cycleNumber == cycleMap[service.id])
        price = !item
          ? cycleSorted[0].pricePerCycle // zero service
          : item.pricePerCycle
      } else {
        price = cycleSorted[0].pricePerCycle // zero service
      }
      return {
        id: service.id.toString(),
        label: service.serviceName,
        description: service.serviceDescription,
        agents: service.serviceStep.map((step: any) => step.name),
        price: price,
        currency: 'USD',
      }
    }) as Service[]
}

