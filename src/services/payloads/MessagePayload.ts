import { MessageType } from 'models/guest';
import { PayloadBase } from './PayloadBase';

export class MessagePayload extends PayloadBase {
  id: string;
  parkId?: string;
  creatorId?: string;
  resourceId: string;
  resourceType: 'Guest' | 'Reservation'; // Polymorphic:  'Guest' or 'Reservation' for now.
  resourceName: string; // depends on resource type:  guestName or reservationNumber
  emails?: string[];
  subject: string;
  body: string;
  date: string;
  status: 'sent' | 'received' | 'viewed' | 'bounced' | 'rejected';
  phones?: string[];
  opens: number;
  clicks: number;
  tags: string[];
  phone?: string;
  email?: string;
  actions: string[]; // resend, new
  messageType: MessageType;
};
