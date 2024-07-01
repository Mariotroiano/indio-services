import { AxiosInstance } from 'axios';
import { ReportClient } from './client/ReportClient';
import { DailyCashPayload, DebtorsPayload, InHouseGuestBalancePayload, OccupancyPayload, RevenuePayload } from './payloads/ReportPayloads';
import { FrontDeskReportsService } from './reports/FrontDeskReportsService';
import { ImportExportService } from './reports/ImportExportService';
import { EODReportPayload } from './reports-payloads';
import { MaintenancePayload } from './payloads/MaintenancePayload';
import { JsonApiParams } from './client/Types';
import dayjs from 'dayjs';

export default class ReportService {
  protected client: ReportClient;
  protected frontDesk = new FrontDeskReportsService;
  protected importExport = new ImportExportService;

  initialize(ax: AxiosInstance) {
    this.client = new ReportClient(ax);
    this.frontDesk.initialize(ax);
    this.importExport.initialize(ax);
  }

  getArrivalsAndDeparturesData = this.frontDesk.getArrivalsAndDeparturesData;
  getReservationsData = this.frontDesk.getReservationsData;
  getSiteAvailability = this.frontDesk.getSiteAvailability;
  getGuestsData = this.importExport.getGuestsData;
  getSiteInventoryData = this.frontDesk.getSiteInventoryData;
  getHouseCountData = this.frontDesk.getHouseCountData;

  getDailyCashData = async (parkId: string, week: dayjs.Dayjs) => {
    const entity = {
      parkId: parkId,
      startDate: week.startOf('week').format('YYYY-MM-DD'),
    };
    const response = await this.client.fetchDataViaPost<DailyCashPayload>('daily_cash_reports', entity);
    return response;
  }

  getEndDayData = async (parkId: string, dateRange: dayjs.Dayjs[]) => {
    const [start, end] = dateRange.map(d => d.format('YYYY-MM-DD'));
    const entity = {
      parkId: parkId,
      startDate: start,
      endDate: end,
    };
    const response = await this.client.fetchDataViaPost<EODReportPayload>('eod_reports', entity);
    return response;
  }

  getDebtorsLedgerData = async (parkId: string, dateRange: dayjs.Dayjs[], status: string) => {
    let arrivesBetween = null;
    if (dateRange) {
      const [start, end] = dateRange.map(d => d.format('YYYY-MM-DD'));
      arrivesBetween = JSON.stringify({ 'start_date': start, 'end_date': end });
    }
    const params = JsonApiParams.new({
      filter: {
        // park_id: parkId,
        status: status,
        arrives_between: arrivesBetween,
        zero_balances: false,
      },
      page: { size: 500 },
    });

    const result = await this.client.fetchData<DebtorsPayload[]>('debtors_ledgers', params);
    return result;
  }

  getInHouseGuestBalanceData = async (...dataParams: DataParams) => {
    const { start, end, siteTypeIds } = getParams(dataParams);
    const arrivesBetween = (start && end) ? JSON.stringify({ 'start_date': start, 'end_date': end }) : null;
    const params = JsonApiParams.new({
      filter: {
        site_type_id: siteTypeIds,
        arrives_between: arrivesBetween,
      },
      page: { size: 500 },
    });

    const result = await this.client.fetchData<InHouseGuestBalancePayload[]>('in_house_guest_balances', params);
    return result;
  }

  getOccupancyData = async (parkId: string, dateRange: string[], siteTypeIds: string[]) => {
    const entity = {
      parkId: parkId,
      datePeriod: dateRange,
      siteTypeIds: siteTypeIds,
    };
    const result = await this.client.fetchDataViaPost<OccupancyPayload>('occupancy_reports', entity);
    return result;
  }

  getRevenueData = async (parkId: string, dateRange: string[], siteTypeIds: string[]) => {
    const entity = {
      parkId: parkId,
      datePeriod: dateRange,
      siteTypeIds: siteTypeIds,
    };
    const result = await this.client.fetchDataViaPost<RevenuePayload>('revenue_reports', entity);
    return result;
  }

  getMaintenanceData = async (...dataParams: DataParams) => {
    const { parkId, siteTypeIds, sortBy } = getParams(dataParams);
    const params = this.buildSiteParams({ parkId, siteTypeIds, sortBy });

    const result = await this.client.fetchData<MaintenancePayload[]>('maintenances', params);
    return result;
  }

  private buildSiteParams({ parkId, siteTypeIds, availableBetween, sortBy }: Record<string,string>) {
    const params = JsonApiParams.new({
      filter: {
        park_id: parkId,
        site_type_id: siteTypeIds,
        available_between: availableBetween,
      },
      page: { size: 500 },
      sort: sortBy,
    });
    return params;
  }
}

type DataParams = [parkId: string, dateRange: dayjs.Dayjs[], status: string, siteTypeIds: string[], sortBy: string];

function getParams(dataParams: DataParams) {
  const [parkId, dateRange, status, siteTypeIdList, sortBy] = dataParams;
  const [start, end] = dateRange ? dateRange.map(d => d?.format('YYYY-MM-DD')) : [];
  const siteTypeIds = siteTypeIdList?.join(',');

  return { parkId, dateRange, start, end, status, siteTypeIds, sortBy };
}

export type GetData<T> = (...params: DataParams) => Promise<T[]>;
