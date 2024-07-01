import { PayloadBase } from './PayloadBase';

export class OrderItemPayload extends PayloadBase {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productDescription: string;
  price: number;
  quantity: number;
  totalPrice: number;
  discount: number;
  tax: number;
  subtotal: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export const OrderItemPayloadAttributes = Object.keys(OrderItemPayload.new());
