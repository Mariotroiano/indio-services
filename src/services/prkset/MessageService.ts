import { AxiosInstance } from 'axios';
import { ServiceBase } from 'services/client/ServiceBase';
import { MessagePayload } from 'services/payloads/MessagePayload';

export default class MessageService extends ServiceBase<MessagePayload> {
  constructor(ax: AxiosInstance) {
    super(MessagePayload, ax, 'messages');
  }

  getById = async (id: string) => {
    const result = await this.getByReservationId(id);
    return result[0];
  };

  getByReservationId = async (reservationId: string) => {
    const params = { filter: { resourceId: reservationId }};
    const result = await this.client.find(params);
    return result
  };

  getByGuestId = async (guestId: string) => {
    const params = { filter: { resourceId: guestId }};
    const result = await this.client.find(params);
    return result;
  };
}
