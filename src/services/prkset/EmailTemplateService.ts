import { EmailTemplatePayload } from 'services/payloads/EmailTemplatePayload';
import { AxiosInstance } from 'axios';
import { ServiceBase } from 'services/client/ServiceBase';

export default class EmailTemplateService extends ServiceBase<EmailTemplatePayload> {

  constructor(ax: AxiosInstance) {
    super(EmailTemplatePayload, ax, 'email_templates');
  }

  getAll = async (parkId: string) => {
    const result = await this.find({ filter: {parkId}});
    return result;
  }

}
