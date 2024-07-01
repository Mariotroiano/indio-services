import { PayloadBase } from './PayloadBase';
import { EmailAttachment } from 'models/guest/EmailAttachment';

export class EmailMessagePayload extends PayloadBase {
  id: string;
  parkId?: string;
  type: string;
  messageId: string;
  date?: string;
  from: string;
  to: string[];
  body?: string;
  cc: string[];
  bcc: string[];
  inReplyTo: string[];
  subject: string;
  htmlBody?: string;
  textBody: string;
  status: string;
  references?: string[];
  emailAttachments?: EmailAttachment[];
  uploadedFile?:  EmailAttachment;
};


type EmailMessageType = 'InboundEmailMessage' | 'OutboundEmailMessage';
