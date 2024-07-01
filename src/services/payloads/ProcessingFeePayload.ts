import { PayloadBase } from './PayloadBase';

export class ProcessingFeePayload extends PayloadBase {
  id: string
  parkId: string
  active: boolean
  percent: number
  amount: number
  paymentType: string
  cardType: string
  inputMethod: string
}
