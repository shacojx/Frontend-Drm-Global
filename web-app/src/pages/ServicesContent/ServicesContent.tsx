import { Tab } from '@headlessui/react';
import type { OrderResponseBody } from "@paypal/paypal-js/types/apis/orders";
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { callCaptureOrderPaypal, callCreateOrderBankToBank, callCreateOrderPaypal } from 'src/api/payment';
import { ApiCreateOrderParam, BankAccount, Currency } from 'src/api/types';
import { NATION_INFOS } from 'src/constants/SelectionOptions';
import { AuthContext } from 'src/contexts/AuthContextProvider';
import { cn } from 'src/utils/cn.util';
import { CheckOutPayPal } from "../../components/CheckOutPayPal";
import { IconPaypal, IconQR, IconSpinner } from "../../components/icons";
import { useApiLLCService } from "../../hooks-api/useLlcService";
import { useApiGetAvailableServices } from "../../hooks-api/useServices";
import ServiceCard from './components/ServiceCard';
import { useValidateCaller } from 'src/hooks-ui/useValidateCaller';
import { useApiGetBanks } from 'src/hooks-api/useBanks';
import { FormFieldSelect } from 'src/components/FormFieldSelect';


export type Service = {
    id: number,
    label: string,
    description: string,
    agents: string[],
    price: number,
    cycleNumber: number,
    currency: Currency,
    serviceType: string
    serviceCycle: Array<{
        id: number;
        cycleNumber: number;
        pricePerCycle: number;
    }>
}

export default function ServicesContent() {
    const navigate = useNavigate()
    const allServiceQuery = useApiGetAvailableServices()
    const bunchOfAvailableServices: Service[] = allServiceQuery.data || []
    const translation = useTranslation()
    const { user } = useContext(AuthContext)
    const [bunchOfServiceIdSelected, setBunchOfServiceIdSelected] = useState<number[]>([])
    const [stepIndex, setStepIndex] = useState<number>(1)
    const [isRequestingCreateOrder, setIsRequestingCreateOrder] = useState<boolean>(false)
    const [errorMessageConfirm, setErrorMessageConfirm] = useState<string | undefined>()

    const { validateCaller } = useValidateCaller()

    const [activeTab, setActiveTab] = useState<'visa'|'paypal'|'bank'>('paypal')

    const { data: bankAccounts } = useApiGetBanks()
    const [bankAccount, setBankAccount] = useState<BankAccount | undefined>()

    const myServiceQuery = useApiLLCService()

    const SelectServiceStepIndex = 1
    const PayServiceStepIndex = 2

  useEffect(() => {
    if (!bankAccount && bankAccounts) {
      setBankAccount(bankAccounts[0])
    }
  }, [bankAccounts]);

    function handleSelectService(id: number) {
        if (!bunchOfServiceIdSelected.includes(id)) {
            setBunchOfServiceIdSelected(bunchOfServiceIdSelected.concat([id]))
        } else {
            setBunchOfServiceIdSelected(bunchOfServiceIdSelected.filter(i => i != id))
        }
    }

    function handleClickProceedPayment() {
        setStepIndex(PayServiceStepIndex)
    }

    function handleCancel() {
      allServiceQuery.refetch().catch(e=>console.error(e))
      setStepIndex(SelectServiceStepIndex)
      setActiveTab('paypal')
    }

    async function handleFinishPayment(orderId: string, details: OrderResponseBody | undefined) {
      allServiceQuery.refetch().catch(e=>console.error(e))
      setStepIndex(SelectServiceStepIndex)
      setActiveTab('paypal')
      if (details && !!details.id && details.status === 'COMPLETED') {
        const payerID = details.payer?.payer_id
          || details.payment_source?.paypal?.account_id
          || details.payment_source?.card?.type + '_' + details.payment_source?.card?.last_digits
        callCaptureOrderPaypal({
          token: orderId,
          payerID: payerID || 'unknown'
        }).catch(e=> console.error(e))
        const ms = details.payer?.name ? `Transaction completed by ${details.payer?.name}` : 'Transaction completed'
        alert(ms);
      }
    }

    async function handleClickFinishPayment() {
      if (!user) return
      setErrorMessageConfirm('');
      setIsRequestingCreateOrder(true);
      const serviceSelected = bunchOfAvailableServices.filter((service) =>
        bunchOfServiceIdSelected.includes(service.id)
      );

      const body: ApiCreateOrderParam = {
        cashout: serviceSelected.map((service) => {
          return {
            serviceId: +service.id,
            cycleNumber: service.cycleNumber,
          };
        }),
      };

      try {
        await callCreateOrderBankToBank(body)
        allServiceQuery.refetch().then(() => {setStepIndex(SelectServiceStepIndex); setActiveTab('paypal')});
        myServiceQuery.refetch().catch(e => console.error(e))
      } catch (e: unknown) {
        setErrorMessageConfirm(e?.toString());
        console.error(e);
      }
      setIsRequestingCreateOrder(false);
    }

    function handleClickCancelPayment() {
      setActiveTab('paypal')
      setErrorMessageConfirm('');
      setStepIndex(SelectServiceStepIndex)
    }

    const hasSelected = bunchOfServiceIdSelected.length > 0
    const selectedService = bunchOfAvailableServices.filter(service => bunchOfServiceIdSelected.includes(service.id))
    let totalPrice = 0
    const nationName = NATION_INFOS.find(nation => nation.value === user?.llcInNation)?.label
    selectedService.forEach(service => totalPrice += service.price)

    return (
      <div className={'w-full grow flex flex-col'}>
        <div className={'flex bg-white border-t border-l border-solid grow overflow-hidden'}>
          {stepIndex === SelectServiceStepIndex && (
            <div className={'p-6 bg-white rounded grow overflow-y-scroll overflow-x-hidden space-y-8'}>
              {user?.companyType && (
                <div className={'text-cXl w-full text-start'}>
                  {translation.t('Since you launch your new in', { companyType: user.companyType })}
                  <span className={'text-cLg font-bold text-primary'}> {nationName}</span>{' '}
                  <span className={'text-h4'}>...</span>
                </div>
              )}
              <div className={'flex flex-col gap-3'}>
                {bunchOfAvailableServices.length === 0 && <p>{translation.t('No Available Service')}</p>}
                {bunchOfAvailableServices.map((service) => {

                  return (
                    <ServiceCard
                      key={service.id}
                      isSelected={bunchOfServiceIdSelected.includes(service.id)}
                      service={service}
                      onSelect={handleSelectService}
                      serviceType={service.serviceType}
                      serviceCycle={[service.cycleNumber]}
                    />
                  )
                })}
              </div>
            </div>
          )}
          {stepIndex === PayServiceStepIndex && (
            <div className={'flex flex-col sm:flex-row grow gap-3 overflow-y-scroll  overflow-x-hidden'}>
              <div
                className={
                  'sm:w-1/2 flex flex-col bg-white grow shrink-0 rounded-lg overflow-y-scroll overflow-x-hidden'
                }
              >
                <div className={'p-6 grow flex gap-8 flex-col'}>
                  <div className={'flex flex-col gap-y-2 w-fit'}>
                    <p className={'text-cXl font-bold'}>{translation.t('Order summary')}</p>
                    <div className={'h-[2px] bg-black w-1/2'}></div>
                  </div>
                  {selectedService.map((service, index) => (
                    <div key={service.id} className={'flex justify-between'}>
                      <span className={'space-x-2'}>
                        <span>{index + 1}.</span>
                        <span>{service.label}</span>
                      </span>
                      <span className={'text-orange text-cLg font-bold'}>
                        {service.currency}
                        {service.price}
                      </span>
                    </div>
                  ))}
                </div>
                <div className={'bg-primary_light p-6 font-bold flex justify-between items-center'}>
                  <p className={''}>{translation.t('Total in')}: </p>
                  <p className={'text-h4'}>{totalPrice}</p>
                </div>
              </div>
              <div className={'sm:w-1/2 bg-white grow shrink-0 rounded-lg flex'}>
                <div className={'p-6 grow flex flex-col'}>
                  <div className={'flex flex-col gap-y-2 w-fit'}>
                    <p className={'text-cXl font-bold'}>{translation.t('Please select a payment method')}</p>
                    <div className={'h-[2px] bg-black w-1/2'}></div>
                  </div>
                  <div className={'flex grow'}>
                    {/*<button*/}
                    {/*    disabled={!hasSelected || !!orderData}*/}
                    {/*    className={"flex justify-center items-center gap-2 text-white font-semibold rounded-lg px-6 py-4 bg-primary"}*/}
                    {/*    onClick={handleClickPaypalConfirm}*/}
                    {/*>*/}
                    {/*    <span>{translation.t('Confirm')}</span>*/}
                    {/*</button>*/}
                    <Tab.Group>
                      <div className="flex flex-col w-full mt-8">
                        <Tab.List className="grid grid-cols-2 gap-2 w-full p-1 border border-solid rounded-md mb-4">
                          {/*<Tab*/}
                          {/*  className={cn('flex justify-center flex-col items-center py-2 gap-1 rounded-md', {*/}
                          {/*    'bg-primary_25': activeTab === 'visa',*/}
                          {/*  })}*/}
                          {/*  onClick={() => setActiveTab('visa')}*/}
                          {/*>*/}
                          {/*  <div>Visa - MasterCard</div>*/}
                          {/*  <div className="flex gap-2">*/}
                          {/*    <IconVisa /> <IconMasterCard />*/}
                          {/*  </div>*/}
                          {/*</Tab>*/}

                          <Tab
                            className={cn('flex justify-center flex-col items-center py-2 gap-1 rounded-md', {
                              'bg-primary_25': activeTab === 'paypal',
                            })}
                            onClick={() => setActiveTab('paypal')}
                          >
                            <div>Paypal</div>
                            <IconPaypal />
                          </Tab>

                          <Tab
                            className={cn('flex justify-center flex-col items-center py-2 gap-1 rounded-md', {
                              'bg-primary_25': activeTab === 'bank',
                            })}
                            onClick={() => setActiveTab('bank')}
                          >
                            <div>Bank Transfer</div>
                            <IconQR />
                          </Tab>
                        </Tab.List>

                        <Tab.Panels className="flex grow">
                          <Tab.Panel className="w-full">
                            <CheckOutPayPal totalPrice={totalPrice} items={selectedService} onCancel={handleCancel} onFinishPayment={handleFinishPayment} />
                          </Tab.Panel>

                          <Tab.Panel className="flex w-full pt-4">
                            <div className='mx-auto w-3/4'>
                              <FormFieldSelect
                                id="bank-account"
                                onChange={(value) => setBankAccount(bankAccounts?.find(account => account.region === value))}
                                optionInfos={(bankAccounts ?? []).map((account) => ({
                                  label: account.region,
                                  value: account.region,
                                }))}
                                validateCaller={validateCaller}
                                value={bankAccount?.region}
                              />
                              <div className='flex gap-2 mt-4'>
                                <div className='font-semibold'>Bank Name:</div>
                                <div>{bankAccount?.bankName}</div>
                              </div>
                              <div className='flex gap-2 mt-4'>
                                <div className='font-semibold'>Bank Account:</div>
                                <div>{bankAccount?.bankAccount}</div>
                              </div>
                              <div className='flex gap-2 mt-4'>
                                <div className='font-semibold'>Account Name:</div>
                                <div>{bankAccount?.accountName}</div>
                              </div>
                              <div className='flex gap-2 mt-4'>
                                <div className='font-semibold'>Bank Code:</div>
                                <div>{bankAccount?.bankCode}</div>
                              </div>
                              <div className='flex gap-2 mt-4'>
                                <div className='font-semibold'>Swift Code:</div>
                                <div>{bankAccount?.swiftCode}</div>
                              </div>
                              <div className='flex gap-2 mt-4'>
                                <div className='font-semibold'>Rounting No.:</div>
                                <div>{bankAccount?.rountingNo}</div>
                              </div>
                              <div className='flex gap-2 mt-4'>
                                <div className='font-semibold'>ABA/Fedwire:</div>
                                <div>{bankAccount?.abaFedwire}</div>
                              </div>
                            </div>
                          </Tab.Panel>
                        </Tab.Panels>
                      </div>
                    </Tab.Group>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={'w-full flex justify-end items-center py-5 pr-8 bg-white gap-2'}>
          {stepIndex === SelectServiceStepIndex && (
            <button
              disabled={!hasSelected}
              className={
                'flex justify-center items-center gap-2 text-white font-semibold rounded-lg px-6 py-4 ' +
                (hasSelected ? 'bg-primary' : 'bg-gray-500')
              }
              onClick={handleClickProceedPayment}
            >
              <span>{translation.t('Proceed payment')}</span>
            </button>
          )}
          {stepIndex === PayServiceStepIndex && (
            <>
              {errorMessageConfirm && <p className={"text-danger"}>{errorMessageConfirm}</p>}
              <button
                disabled={!hasSelected}
                className={
                  'flex justify-center items-center gap-2 font-semibold rounded-lg px-6 py-4 border text-gray-600'
                }
                onClick={handleClickCancelPayment}
              >
                <span>{translation.t('Cancel')}</span>
              </button>
              {activeTab === "bank" && <button
                disabled={!hasSelected}
                className={
                  'flex justify-center items-center gap-2 text-white font-semibold rounded-lg px-6 py-4 bg-primary'
                }
                onClick={handleClickFinishPayment}
              >
                <span>{translation.t('Pay now')}</span>
                {isRequestingCreateOrder && <IconSpinner/>}
              </button>}
            </>
          )}
        </div>
      </div>
    );
}
