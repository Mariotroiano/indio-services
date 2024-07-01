import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { ActivityLogPayload, ActivityLogType } from 'services/payloads';
import format from 'utils/format';
import dayjs from 'dayjs';
import { Factory } from 'utils/Factory';

export class ActivityLogItem {
  id: string;
  name: string;
  date: string;
  activity: string;
  summary: string[];
  comment: string;
  entityId: string;
  entityType: 'Guest' | 'Reservation' | 'Site';
  creatorId: string;

  static Model = setModel(this, () => Model);
}

const mapModel = ModelBuilder.buildMapModel<ActivityLogItem, ActivityLogPayload>((activityLog) => {
  const staffEmail = activityLog.creatorEmail ? `(${activityLog.creatorEmail})` : ''
  const staffLabel = [activityLog.creatorFullName, staffEmail].join(' ')
  const activity = activityLog.activity

  const model = Factory.create(ActivityLogItem, {
    name: activityLog.creatorId == null ? 'System' : staffLabel,
    date: format.shortNamedDateAndTime(dayjs(activityLog.occurredAt)),
    activity: activity,
    summary: activityLog.summary,
    comment: activityLog.comment,
    entityId: activityLog.activityLoggableId,
    entityType: activityLog.activityLoggableType,
    creatorId: activityLog.creatorId,
  })
  return model
})

const buildPayload = (values: ActivityLogItem): ActivityLogPayload => {
  const payload = ActivityLogPayload.new({
    ...values,
    activityLoggableId: values.entityId,
    activityLoggableType: values.entityType,
    type: ActivityLogType.Comment,
  });
  return payload as ActivityLogPayload;
}

class Model {
  static mapModel = mapModel;
  static buildPayload = buildPayload;
}
