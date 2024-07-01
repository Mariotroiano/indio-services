import { AxiosInstance } from 'axios';
import { ReportClient } from '../client/ReportClient';
import { ReservationPartialPayload, ReservationReportPayload } from '../payloads/ReportPayloads';
import { SiteInventoryPayload } from './payloads/SiteInventoryPayload';
import { HouseCountReportPayload } from './payloads/HouseCountReportPayload';
import { SitePayload } from '../payloads';
import { DateRangeFormat } from 'interfaces/DateRange';
import { JsonApiParams } from '../client/Types';
import { snakeCase, startCase } from 'lodash';
import dayjs from 'dayjs';

export class FrontDeskReportsService {
  protected client: ReportClient;

  initialize(ax: AxiosInstance) {
    this.client = new ReportClient(ax);
  }

  getReservationsData = async (...dataParams: DataParams) => {
    const { parkId, start, end, sortBy } = getParams(dataParams);
    const params = buildParams({ parkId, sortBy });
    params.filter.all = JSON.stringify({ start_date: start, end_date: end });

    const response = await this.client.fetchData<ReservationPartialPayload[]>('reservation_reports', params);
    let entities = response.map<Partial<ReservationReportPayload>>(item => ({
      ...item,
      guestFullName: item.guestName,
      siteName: item.siteName,
      rateName: item.rateName,
      rateType: startCase(item.rateType),
      nights: item.numberOfNights.toString(),
    }));
    return entities as ReservationReportPayload[];
  }

  private buildDepArrQuery(dateFieldName: string, statuses: string[], dataParams: DataParams) {
    const { parkId, start, sortBy } = getParams(dataParams);
    const date = start;
    const params = buildParams({ parkId, sortBy });
    params.filter[dateFieldName] = { gte: date, lte: date };
    params.filter.status = statuses.join(',');
    return params;
  }

  getArrivalsAndDeparturesData = async (...dataParams: DataParams) => {
    const response = await this.getArrivalsData(...dataParams);
    return response;
  }

  getDeparturesData = async (...dataParams: DataParams) => {
    const status = ['unconfirmed', 'confirmed', 'arrived', 'departed']
    const params = this.buildDepArrQuery('departure_date', status, dataParams);
    if (getParams(dataParams).includeOverdue) {
      const response = await this.client.fetchData<ReservationReportPayload[]>('overdue_departures', params);
      return response;
    }
    const response = await this.client.fetchData<ReservationReportPayload[]>('departure_lists', params);
    return response;
  }

  getArrivalsData = async (...dataParams: DataParams) => {
    const status = ['unconfirmed', 'confirmed', 'arrived'];
    const params = this.buildDepArrQuery('arrival_date', status, dataParams);
    if (getParams(dataParams).includeOverdue) {
      const response = await this.client.fetchData<ReservationReportPayload[]>('overdue_arrivals', params);
      return response;
    }
    const response = await this.client.fetchData<ReservationReportPayload[]>('arrival_lists', params);
    return response;
  }

  getSiteAvailability = async (...dataParams: DataParams) => {
    const { parkId, dateRange, siteTypeIds, sortBy } = getParams(dataParams);
    const availableBetween = JSON.stringify({
      date_range: DateRangeFormat.toPeriod(dateRange),
      ignored_reservation_ids: [],
    });
    const params = buildParams({ parkId, siteTypeIds, availableBetween, sortBy });
    console.log('SORT NOT WORKING', sortBy);

    const result = await this.client.fetchData<SitePayload[]>('sites', params);
    return result;
  }

  getSiteInventoryData = async (...dataParams: DataParams) => {
    const { parkId, start } = getParams(dataParams);
    const params = buildParams({ parkId, date: start });
    const result = await this.client.fetchData<SiteInventoryPayload[]>('reports?name=SiteInventory', params);
    return result;
  }

  getHouseCountData = async (...dataParams: DataParams) => {
    const { parkId, start } = getParams(dataParams);
    const params = buildParams({ parkId, date: start });
    const result = await this.client.fetchData<HouseCountReportPayload[]>('reports?name=HouseCount', params);
    return result;
  }
}

type DataParams = [
  parkId: string, dateRange: dayjs.Dayjs[], status: string,
  siteTypeIds: string[], sortBy: string, includeOverdue: boolean
];

function getParams(dataParams: DataParams) {
  const [parkId, dateRange, status, siteTypeIdList, sortBy, includeOverdue] = dataParams;
  const [start, end] = dateRange ? dateRange.map(d => d?.format('YYYY-MM-DD')) : [];
  const siteTypeIds = siteTypeIdList?.join(',');

  return { parkId, dateRange, start, end, status, siteTypeIds, sortBy, includeOverdue };
}

function buildParams({ sortBy, ...rest }: Record<string,string>) {
  const filter = buildFilter(rest);
  const params = JsonApiParams.new({
    filter: filter,
    page: { size: 500 },
    sort: sortBy,
  });
  return params;
}

function buildFilter(obj: any) {
  const result = {};
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined) {
      const snakeKey = snakeCase(key);
      result[snakeKey] = obj[key];
    }
  }
  return result;
}

export type GetData<T> = (...params: DataParams) => Promise<T[]>;
