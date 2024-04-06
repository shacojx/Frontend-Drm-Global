import { type OrderResponseBody, PurchaseUnitItem } from "@paypal/paypal-js/types/apis/orders";
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData
} from "@paypal/paypal-js/types/components/buttons";
import React, { useRef } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { callCreateOrderCard, callCreateOrderPaypal } from "../api/payment";
import { ApiCreateOrderParam } from "../api/types";
import { Service } from "../pages/ServicesContent/ServicesContent";

type Props = {
  items: Pick<Service, 'label' | 'price' | 'id' | 'cycleNumber'>[],
  totalPrice: number,
  onCancel: () => void,
  onFinishPayment: (orderId: string, details: OrderResponseBody | undefined) => void,
}
export function CheckOutPayPal(props: Props) {
  const [{ isPending }] = usePayPalScriptReducer();
  const orderIdRef = useRef<string>('')

  async function onCreateOrder(data: CreateOrderData, actions: CreateOrderActions) {
    const purchaseItems: PurchaseUnitItem[] = props.items.map(item => {
      return {
        name: item.label,
        unit_amount: {
          currency_code: 'USD',
          value: item.price.toString(),
        },
        quantity: '1',
      }
    })
    const orderId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: props.totalPrice.toString(),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: props.totalPrice.toString(),
              },
            }
          },
          items: purchaseItems
        },
      ],
    });
    const body: ApiCreateOrderParam = {
      transId: orderId,
      cashout: props.items.map((service) => {
        return {
          serviceId: +service.id,
          cycleNumber: service.cycleNumber,
        };
      }),
    };
    switch (data.paymentSource) {
      case "card":
        callCreateOrderCard(body).catch(e=>console.error(e))
        break
      default:
        callCreateOrderPaypal(body).catch(e=>console.error(e))
        break
    }
    orderIdRef.current = orderId
    return orderId
  }

  async function onApproveOrder(data: OnApproveData, actions: OnApproveActions){
    const details = await actions.order?.capture().catch(e=>console.error(e))
    props.onFinishPayment(orderIdRef.current, details || undefined);
  }

  return (
    <div className="checkout">
      {isPending ? <p>LOADING...</p> : (
        <>
          <PayPalButtons
            style={{ layout: "vertical", shape: "rect", }}
            onClick={() => console.log('onClick PayPalButtons')}
            createOrder={(data, actions) => onCreateOrder(data, actions)}
            onApprove={(data, actions) => onApproveOrder(data, actions)}
            onCancel={props.onCancel}
            onError={props.onCancel}
          />
        </>
      )}
    </div>
  );
}
