import { Currency, RawService } from "../../../api/types";
import { Service } from "../../../pages/ServicesContent/ServicesContent";

// TODO fix type
export function filterServiceToDisplay(allServices: RawService[], allPaidService: any[]): Service[] {
  const hasBaseService = allPaidService.find(service => service.serviceType === 'Based')
  const filterService = hasBaseService
    ? allServices.filter(service => service.serviceType !== 'Based')
    : allServices
  const priceMap: Record<string, any> = {}
  allPaidService.forEach(service => {
    if (!priceMap[service.serviceId as string]) {
      priceMap[service.serviceId as string] = {
        cycleNumber: service.cycleNumber,
        pricePerCycle: service.pricePerCycle,
      }
    }
    const oldCycle = priceMap[service.serviceId as string]['cycleNumber']
    if (service.cycleNumber > oldCycle) {
      priceMap[service.serviceId as string] = {
        cycleNumber: service.cycleNumber,
        pricePerCycle: service.pricePerCycle,
      }
    }

  })
  const a =  filterService
    .map(service => {
      return {
        id: service.id.toString(),
        label: service.serviceName,
        description: service.serviceDescription,
        agents: service.serviceStep.map((step: any) => step.name),
        price: priceMap[service.id.toString()]?.['pricePerCycle'] || 0,
        currency: 'USD',
      }
    })
    .filter(service => service.price > 0)
  return a as Service[]
}

