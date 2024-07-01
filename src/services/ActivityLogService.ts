import { ServiceBase } from './client/ServiceBase';
import { ActivityLogPayload } from './payloads';
import { AxiosInstance } from 'axios';

export default class ActivityLogService extends ServiceBase<ActivityLogPayload> {
  constructor(ax: AxiosInstance) {
    super(ActivityLogPayload, ax, 'activity_log_items');
  }

  getAll = async (activityLoggableId: string) => {
    const params = {
      filter: { activity_loggable_id: activityLoggableId },
      sort: '-created_at',
    };
    const result = await this.client.find(params);
    return result;
  }
}

