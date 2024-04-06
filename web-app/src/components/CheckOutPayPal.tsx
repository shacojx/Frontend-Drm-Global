import { PurchaseUnitItem } from "@paypal/paypal-js/types/apis/orders";
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData
} from "@paypal/paypal-js/types/components/buttons";
import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { callCaptureOrderPaypal, callCreateOrderPaypal } from "../api/payment";
import { ApiCreateOrderParam } from "../api/types";
import { Service } from "../pages/ServicesContent/ServicesContent";

type Props = {
  items: Pick<Service, 'label' | 'price' | 'id' | 'cycleNumber'>[],
  totalPrice: number,
  onCreatedOrder: () => void,
}
export function CheckOutPayPal(props: Props) {
  const [{ isPending }] = usePayPalScriptReducer();

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
    await callCreateOrderPaypal(body)
    return orderId
  }

  async function onApproveOrder(data: OnApproveData, actions: OnApproveActions){
    props.onCreatedOrder();
    return actions.order?.capture().then((details) => {
      if (!!details.id && details.status === 'COMPLETED') {
        const payerID = details.payer?.payer_id
          || details.payment_source?.paypal?.account_id
          || details.payment_source?.card?.type + '_' + details.payment_source?.card?.last_digits
        callCaptureOrderPaypal({
          token: details.id,
          payerID: payerID
        })
      }
      const ms = details.payer?.name ? `Transaction completed by ${details.payer?.name}` : 'Transaction completed'
      alert(ms);
    });
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
            onCancel={props.onCreatedOrder}
            onError={props.onCreatedOrder}
          />
        </>
      )}
    </div>
  );
}
