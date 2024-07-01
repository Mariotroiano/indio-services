import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { OrderPayload } from 'services/payloads/OrderPayload';
import { Factory } from 'utils/Factory';
import { Entity } from 'models/Entity';
import dayjs from 'dayjs';

export class Order extends Entity {
  parkId: string;
  locationId: string;
  locationName: string;
  reservationId?: string;
  creatorId?: string;
  creatorName?: string;
  number: number;
  subtotal: number;
  discountTotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  balance: number;
  payedAmount: number;
  actions: string[];
  createdAt?: dayjs.Dayjs;

  static new = this.getNew(Order);
  static toJSON = this.getToJSON(Order, ['number']);
  static parse = this.getParse(Order);
  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(Order, {
  parkId: { label: 'Name' },
  locationId: { label: 'Location ID' },
  locationName: { label: 'Location' },
  reservationId: { label: 'Reservation ID' },
  creatorId: { label: 'Created By ID' },
  creatorName: { label: 'Created By' },
  createdAt: { label: 'Created' },
  number: { label: 'Order #' },
  discountTotal: { label: 'Discount' },
  tax: { label: 'Sales Tax' },
  payedAmount: { label: 'Amount Payed' },
})
.build();

const buildPayload = (parkId: string, values: Order): OrderPayload => {
  const payload: Partial<OrderPayload> = {
    id: values.id,
    locationId: values.locationId,
    reservationId: values.reservationId,
    parkId: parkId
  };
  return payload as OrderPayload;
};

const mapModel = ModelBuilder.buildMapModel<Order, OrderPayload>((order) => {
  const model =  Factory.create(Order,{
    ...order,
    createdAt: dayjs(order.createdAt),
  });
  return model;
});

const values = ['pending', 'paid', 'billed', 'partially_refunded'] as const;
export type OrderStatus = typeof values[number];

class Model {
  static fields = fields;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
  static relation = [Order, OrderPayload] as const;
}
