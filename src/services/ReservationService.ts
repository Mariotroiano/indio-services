import { AxiosInstance } from 'axios';
import { TableInstance } from 'services/TableInstance';
import { JsonApiClient } from './client/JsonApiClient';
import { ReservationEntryRequest, ReservationPayload } from './payloads/ReservationPayload';
import { ReservationChartPayload } from './payloads/ReservationChartPayload';
import { TransactionPayload } from './payloads/TransactionsPayload';
import { QuotePayload, QuoteResponse } from './payloads/QuotePayload';
import { DateRange, DateRangeFormat } from '../interfaces/DateRange';
import { buildUrl } from './client/helpers';
import { Filters } from 'models/reservation/ReservationFilterModel';

export default class ReservationService {
  private client: JsonApiClient<ReservationPayload>;
  private entryClient: JsonApiClient<ReservationEntryRequest>;
  private transactionClient: JsonApiClient<TransactionPayload>;
  private resourceName = 'reservations';
  private include = 'guest,site,rate,discount';
  public lastStats: Stats = null;

  constructor(ax: AxiosInstance) {
    this.client = new JsonApiClient(ReservationPayload, ax, 'reservations');
    this.entryClient = new JsonApiClient(ReservationEntryRequest, ax, 'reservations');
    this.transactionClient = new JsonApiClient(TransactionPayload, ax, 'transactions');
  }

  async getById(id: string) {
    const result = await this.client.getById(id, { include: this.include });
    return result;
  }

  async getByIdExtra(id: string) {
    const { resourceName, include } = this;
    const extra_fields = { [resourceName]: 'settings_info' };
    const result = await this.client.getById(id, { include, extra_fields });
    return result;
  }

  async getByField(field: 'site_id' | 'guest_id', value: string, pageNumber: number, pageSize: number) {
    const params = {
      filter: { [field]: value },
      page: { number: pageNumber, size: pageSize },
      sort: '-arrival_date',
    }
    const result = await this.client.find(params);
    return result;
  }

  async getQuote(quote: QuotePayload) {
    return this.client.post('quotes', quote, QuoteResponse);
  }

  async createOrUpdate(entry: ReservationEntryRequest) {
    let response: ReservationPayload;

    if (entry.id) {
      response = await this.entryClient.patch(`reservations/${entry.id}?include=${this.include}`, entry);
    } 
    else {
      response = await this.entryClient.post(`reservations?include=${this.include}`, entry);
    }

    const payload = ReservationPayload.new(response);
    return payload;
  }

  async updatePartial(id: string, entity: Partial<ReservationPayload>) {
    const response = await this.client.updatePartial(id, entity);
    if (response) {
      return response;
    }
  }

  async updatePartialExtra(id: string, entity: Partial<ReservationPayload>) {
    const { resourceName, include } = this;
    const extra_fields = { [resourceName]: 'settings_info' };
    const url = buildUrl(resourceName, '', { include, extra_fields }, id);
    const response = await this.client.patch<ReservationPayload>(url, entity);
    if (response) {
      return response;
    }
  }

  async applyAction(id: string, action: string) {
    await this.client.applyAction(id, action);
  }

  async sendConfirmationEmail(id: string) {
    await this.client.post(`reservations/${id}/send_confirmation_email`, null);
  }

  async findForChart(parkId: string, dateRange: DateRange, search: string) {
    const period = DateRangeFormat.toPeriod(dateRange);
    const params = {
      filter: { 
        park_id: parkId,
        status: { not_eq: 'cancelled,no_show' },
        in_daterange: { eq: period },
        q: { contains: search },
      },
      fields: {
        reservations: ReservationChartPayload.fields.join(','),
        parks: 'name',
        sites: 'name,site_number',
        guests: 'full_name',
      },
      include: this.include,
      stats: {
        metrics: metricList,
      }
    };
    const response = await this.client.find(params);
    this.lastStats = this.client.lastStats;
    this.lastStats.metrics['availability'] = 0;
    const payloads = response.map(item => ReservationChartPayload.fromReservation(item));
    return payloads;
  }

  async findAdvanced(table: TableInstance, parkId: string, dateRange: DateRange, filter: string, filters: Filters) {
    const { site, siteType, rateType } = filters;
    const dates = DateRangeFormat.toISOString(dateRange);
    const datesFilter = dates ? { start_date: dates[0], end_date: dates[1] } : {};
    const params = {
      filter: { 
        park_id: parkId,
        type: filters.reservationType,
        status: filters.statusType,
        source: filters.source,
        site_id: site,
        site_type_id: siteType,
        rate_type: rateType,
        [filter]: JSON.stringify(datesFilter),
      },
      include: this.include,
      stats: {
        metrics: metricList,
      }
    };
    if (!table.sorting) {
      table.setters.setSorting({ field: 'created_at', order: 'descend' });
    }
    const response = await this.client.findForTable(table, params);
    this.lastStats = this.client.lastStats;
    this.lastStats.metrics['availability'] = 0;
    const payloads = response.map(item => ReservationPayload.new(item));
    return payloads;
  }

  async getAllActive(parkId: string, search: string) {
    const params = {
      filter: {
        parkId,
        status: { not_eq: 'cancelled,no_show' }
      },
      sort: '-created_at',
      page: { size: 10 },
      include: this.include,
    }

    if (search) {
      params.filter['q'] = { contains: search };
    }

    const response = await this.client.getAll(params);
    return response;
  }

  async getTransactions(id: string) {
    const params = {
      filter: { reservationId: id, voided: false },
      page: { number: 1, size: 10 },
      sort: 'created_at',
    }
    const result = await this.transactionClient.find(params);
    return result;
  }
}

const status = [
  'arrived', 'departed', 'pending', 'quoted', 'on_hold',
  'confirmed', 'unconfirmed', 'cancelled', 'no_show', 'availability'
] as const;

type StatusType = typeof status[number];

type Stats = {
  metrics: Record<StatusType, number>
}

const metricList = status.filter(x => x !== 'availability').join(',');

export const StatusList = status.map(x => x.toString());
