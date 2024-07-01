import { ServiceBase } from './client/ServiceBase';
import { AxiosInstance } from 'axios';

class FontPayload {
  id: string;
  name: string;
  code: string;
}

export default class LookupService extends ServiceBase<FontPayload> {
  constructor(ax: AxiosInstance) {
    super(FontPayload, ax, 'fonts');
  }

  getAll = async () => {
    const result = await this.client.find();
    return result;
  }
}
