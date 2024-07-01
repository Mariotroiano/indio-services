import { PayloadBase } from './PayloadBase';

export class ActivityLogPayload extends PayloadBase {
  id: string;
  activityLoggableId: string;
  activityLoggableType: 'Guest' | 'Reservation' | 'Site';
  creatorId: string;
  comment: string;
  activity: string;
  summary: string[];
  occurredAt: string;
  createdAt: string;
  updatedAt: string;
  creatorEmail: string;
  creatorFullName: string;
  type: ActivityLogType;
}

export enum ActivityLogType {
  Comment = 'Comment',
  SystemEvent = 'SystemEvent',
  LifeCycleEvent = 'LifeCycleEvent'
}

// Remove this enum
export enum ActivityLoggableType {
  Guest = 'Guest',
  Reservation = 'Reservation',
  Site = 'Site'
}

export const ActivityLogPayloadAttributes = Object.keys(ActivityLogPayload.new());
