import { AxiosInstance } from 'axios';
import { ReportClient } from '../client/ReportClient';
import { GuestPayload } from '../payloads';
import { JsonApiParams } from '../client/Types';

export class ImportExportService {
  protected client: ReportClient;

  initialize(ax: AxiosInstance) {
    this.client = new ReportClient(ax);
  }

  getGuestsData = async (parkId: string) => {
    const params = JsonApiParams.new({
      filter: { park_id: parkId }
    });
    const result = await this.client.fetchData<GuestReportPayload[]>('guests', params);
    return result;
  }
}

export class GuestReportPayload extends GuestPayload {
  created: string;
  totalSpend: string;
  balance: string;
}
