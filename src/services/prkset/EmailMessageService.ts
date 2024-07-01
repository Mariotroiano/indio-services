import { AxiosInstance } from 'axios';
import { EmailAttachment } from 'models/guest/EmailAttachment';
import { EMAIL_MOCK_MESSAGES } from 'models/guest/EmailMessage';
import { JsonApiClient } from 'services/client/JsonApiClient';
import { EmailMessagePayload } from 'services/payloads/EmailMessagePayload';

export default class EmailMessageService {
  private client: JsonApiClient<EmailMessagePayload>;
  private inboundEmailClient: JsonApiClient<EmailMessagePayload>;
  private outboundEmailClient: JsonApiClient<EmailMessagePayload>;
  private ax: AxiosInstance;

  constructor(ax: AxiosInstance) {
    this.client = new JsonApiClient(EmailMessagePayload, ax, 'email_messages');
    this.inboundEmailClient = new JsonApiClient(EmailMessagePayload, ax, 'inbound_email_messages');
    this.outboundEmailClient = new JsonApiClient(EmailMessagePayload, ax, 'outbound_email_messages');
    this.ax = ax;
  }

  getAll = async (parkId: string, search?: string, size?: number) => {
    const params = {
      filter: { parkId },
      sort: '-created_at',
      search,
      size,
    };
    const result = await this.client.getAll(params);
    return result;
  }

  createOrUpdate = async (entity: EmailMessagePayload) => {
    const result = await this.outboundEmailClient.createOrUpdate(entity);
    return result;
  }

  getAllInbound = async (parkId: string, search?: string, size?: number) => {
    const params = {
      filter: { parkId },
      sort: '-created_at',
      search,
      size,
    };
    const result = await this.inboundEmailClient.getAll(params);
    return result;
  }

  async attachFile(file: File, emailMessageId: string): Promise<EmailAttachment> {
    const url = `email_attachments`;
    const formData = new FormData();

    formData.append('data[type]', 'email_attachments');
    formData.append('data[attributes][email_message_id]', emailMessageId);
    formData.append('uploaded_file', file);

    try {
      const result = await this.ax.post(url, formData);
      return result?.data;
    } catch (error) {
      console.error('Attach Error :', error);
      throw error;
    }
  }

  getById = async (id: string) => {
    const result = EMAIL_MOCK_MESSAGES.find(m => m.id === id);
    return result;
  }

}
