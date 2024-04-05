import { PurchaseUnitItem } from "@paypal/paypal-js/types/apis/orders";
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData
} from "@paypal/paypal-js/types/components/buttons";
import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Service } from "../pages/ServicesContent/ServicesContent";

type Props = {
  items: Pick<Service, 'label' | 'price'>[],
  totalPrice: number,
  onApproved: () => void,
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
    return actions.order.create({
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
  }

  async function onApproveOrder(data: OnApproveData, actions: OnApproveActions){
    return actions.order?.capture().then((details: any) => {
      const name = details.payer.name.given_name;
      alert(`Transaction completed by ${name}`);
      props.onApproved();
    });
  }

  return (
    <div className="checkout">
      {isPending ? <p>LOADING...</p> : (
        <>
          <PayPalButtons
            style={{ layout: "vertical", shape: "rect", }}
            createOrder={(data, actions) => onCreateOrder(data, actions)}
            onApprove={(data, actions) => onApproveOrder(data, actions)}
          />
        </>
      )}
    </div>
  );
}
