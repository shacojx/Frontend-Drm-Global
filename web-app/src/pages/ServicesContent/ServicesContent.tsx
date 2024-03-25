import { Tab } from '@headlessui/react';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { callCreateOrderPaypal } from 'src/api/payment';
import { ApiCreateOrderParam, BankAccount, Currency } from 'src/api/types';
import { NATION_INFOS } from 'src/constants/SelectionOptions';
import { AuthContext } from 'src/contexts/AuthContextProvider';
import { cn } from 'src/utils/cn.util';
import { IconMasterCard, IconPaypal, IconQR, IconSpinner, IconVisa } from "../../components/icons";
import { useApiGetAvailableServices } from "../../hooks-api/useServices";
import ServiceCard from './components/ServiceCard';
import IMAGE from 'src/assets/images';
import { FormFieldText } from 'src/components/FormFieldText';
import { useValidateCaller } from 'src/hooks-ui/useValidateCaller';
import { FormFieldNumber } from 'src/components/FormFieldNumber';
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

    const [activeTab, setActiveTab] = useState<'visa'|'paypal'|'bank'>('visa')

    const { data: bankAccounts } = useApiGetBanks()
    const [bankAccount, setBankAccount] = useState<BankAccount>()
    console.log(bankAccount?.region)

    const SelectServiceStepIndex = 1
    const PayServiceStepIndex = 2

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

    async function handleClickPaypalConfirm() {

    }

    async function handleClickFinishPayment() {
      if (!user) return

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
        const rawResult = await callCreateOrderPaypal(body);
        allServiceQuery.refetch().then(() => setStepIndex(SelectServiceStepIndex));
        const paypalLink = rawResult.data.links.find((link) => link.rel === 'approve')?.href;
        window.open(paypalLink, '_blank', 'noopener,noreferrer');
      } catch (e: unknown) {
        setErrorMessageConfirm(e?.toString());
        console.error(e);
      }
      setIsRequestingCreateOrder(false);
    }

    function handleClickCancelPayment() {
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
                {bunchOfAvailableServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    isSelected={bunchOfServiceIdSelected.includes(service.id)}
                    service={service}
                    onSelect={handleSelectService}
                  />
                ))}
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
                        <Tab.List className="grid grid-cols-3 gap-2 w-full p-1 border border-solid rounded-md mb-4">
                          <Tab
                            className={cn('flex justify-center flex-col items-center py-2 gap-1 rounded-md', {
                              'bg-primary_25': activeTab === 'visa',
                            })}
                            onClick={() => setActiveTab('visa')}
                          >
                            <div>Visa - MasterCard</div>
                            <div className="flex gap-2">
                              <IconVisa /> <IconMasterCard />
                            </div>
                          </Tab>

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
                            <div className="flex justify-center items-center flex-col border border-solid rounded-xl px-3 py-4">
                              <div>Continue payment with Paypal ?</div>
                              <img src={IMAGE.paypal}/>
                            </div>
                          </Tab.Panel>

                          <Tab.Panel className="w-full">
                            <div
                              className="flex justify-center items-center flex-col border border-solid rounded-xl px-3 py-4">
                              <div>Continue payment with Paypal ?</div>
                              <img src={IMAGE.paypal} />
                            </div>
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
                                value={bankAccount?.region ?? bankAccounts?.[0].region}
                              />
                              <div className='flex gap-2 mt-4'>
                                <div className='font-semibold'>Account Name: </div> <div>{bankAccount?.accountName}</div>
                              </div>
                              <div className='flex gap-2 mt-4'>
                                <div className='font-semibold'>Bank Account: </div> <div>{bankAccount?.bankAccount}</div>
                              </div>
                              <div className='flex gap-2 mt-4'>
                                <div className='font-semibold'>Bank Code: </div> <div>{bankAccount?.bankCode}</div>
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
        <div className={'w-full flex justify-end py-5 pr-8 bg-white gap-2'}>
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
              <button
                disabled={!hasSelected}
                className={
                  'flex justify-center items-center gap-2 font-semibold rounded-lg px-6 py-4 border text-gray-600'
                }
                onClick={handleClickCancelPayment}
              >
                <span>{translation.t('Cancel')}</span>
              </button>
              <button
                disabled={!hasSelected}
                className={
                  'flex justify-center items-center gap-2 text-white font-semibold rounded-lg px-6 py-4 bg-primary'
                }
                onClick={handleClickFinishPayment}
              >
                <span>{translation.t('Pay now')}</span>
                {isRequestingCreateOrder && <IconSpinner />}
              </button>
            </>
          )}
        </div>
      </div>
    );
}
