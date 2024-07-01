import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { OrderItemPayload } from 'services/payloads/OrderItemPayload';
import { Factory } from 'utils/Factory';

export class OrderItem {
  id: string;
  orderId: string;
  product: {
    id: string;
    name: string;
    description: string;
  };
  price: number;
  quantity: number;
  totalPrice: number;
  discount: number;
  subtotal: number;
  tax: number;
  total: number;
  name: string;

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(OrderItem, {
  name: { label: 'Item' },
  price: { label: 'Item Price' },
  quantity: { label: 'Quantity' },
  totalPrice: { label: 'Price' },
})
.build();

const mapModel = ModelBuilder.buildMapModel<OrderItem, OrderItemPayload>(payload => {
  const model = Factory.create(OrderItem, {
    ...payload,
    name: payload.productName,
    product: {
      id: payload.productId,
      name: payload.productName,
      description: payload.productDescription,
    }
  });
  return model;
});

const buildPayload = (model: OrderItem): OrderItemPayload => {
  const payload = OrderItemPayload.new(model, true);
  payload.productId = model.product.id;
  return payload;
};

const mergeDuplicateItems = (orderItems: OrderItem[]): OrderItem[] => {
  const mergedItems: OrderItem[] = [];
  orderItems.forEach((item) => {
    const existingItem = mergedItems.find((mergedItem) => mergedItem.product.id === item.product.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
      existingItem.totalPrice += item.totalPrice;
    } else {
      mergedItems.push(item);
    }
  })

  return mergedItems;
}

class Model {
  static mapModel = mapModel;
  static buildPayload = buildPayload;
  static fields = fields;
  static mergeItems = mergeDuplicateItems;
}
