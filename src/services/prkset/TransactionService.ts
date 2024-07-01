import { TransactionPayload } from 'services/payloads/TransactionsPayload';
import { ServiceBase } from 'services/client/ServiceBase';
import { AxiosInstance } from 'axios';
import { DateRange } from 'interfaces/Types';

export default class TransactionService extends ServiceBase<TransactionPayload> {
  constructor(ax: AxiosInstance) {
    super(TransactionPayload, ax, 'transactions');
  }

  getByReservationId = async (reservationId: string, dateRange?: DateRange) => {
    const params = { filter: { reservationId, type: 'Charge,Credit' }};
    
    if(dateRange?.length) {
      const [start, end] = dateRange.map(d => d.format('YYYY-MM-DD'));
      const date = { gte: start, lte: end };
      params.filter['date'] = date;
    }
    
    const result = await this.client.find(params);
    return result;
  };

  getByOrderId = async (orderId: string) => {
    const params = { filter: { orderId, type: 'Refund,Payment' } };
    const result = await this.client.find(params);
    return result;
  };

  applyAction = async (id: string, action: string) => {
    const result = await this.client.applyAction( id, action );
    return result;
  }
  
}
