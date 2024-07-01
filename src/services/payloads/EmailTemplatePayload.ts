import { PayloadBase } from './PayloadBase';

export class EmailTemplatePayload extends PayloadBase {
  id: string
  parkId: string
  emailType: EmailType
  template: string
  from: string
  senderEmailName: string
  cc: string[]
  bcc: string[]
  content: string
  replyTo: string[]
  subject: string
  important: boolean
  active: boolean
  tagList: string[]
}


type EmailType = 'cancellation' | 'confirmation' | 'receipt';

export const EmailTemplatePayloadPayloadAttributes = Object.keys(EmailTemplatePayload.new());
