import { UtilityMeterPayload } from './UtilityMeterPayload';
import { SitePayload } from 'services/payloads';
import { TableInstance } from 'services/TableInstance';
import { ServiceBase } from 'services/client/ServiceBase';
import { AxiosInstance } from 'axios';
import { JsonApiClient } from 'services/client/JsonApiClient';
import { UtilitiesFilters } from 'models/prkset/UtilitiesFilters';


export default class UtilityMeterService extends ServiceBase<UtilityMeterPayload> {
  private siteClient: JsonApiClient<SitePayload>

  constructor(ax: AxiosInstance) {
    super(UtilityMeterPayload, ax, 'utility_meters');
    this.siteClient = new JsonApiClient(SitePayload, ax, 'sites');
  }

  getAll = async (siteId: string, filters?: UtilitiesFilters) => {
    const params = { filter: { siteId, active: true }, include: 'last_reading' };

    if (filters) {

      if (filters?.search) params.filter['q'] = { contains: filters.search };

      if (filters?.status !== 'default') {
        params.filter.active = (filters?.status === 'enabled');
      }

      if (filters?.siteTypesIds && filters?.siteTypesIds.length) {
        const siteTypes = filters.siteTypesIds.filter(type => type !== 'default');
        params.filter['site_type_id'] = `${siteTypes}`;
      }
    }

    const result = await this.client.find(params);
    return result;
  }

  toggleBulkMeterStatus = async (meterIds: string[], active: boolean) => {
    if (meterIds.length) {
      meterIds.map(async (meterId) => {
        const payload: Partial<UtilityMeterPayload> = { id: meterId, active };
        await this.client.updatePartial(meterId, payload);
      });
    }
  }

  findSites = async (parkId: string, filters: UtilitiesFilters, table: TableInstance) => {
    const params = { filter: { parkId, active: true }, include: 'current_reservation' };
    if (filters) {

      if (filters?.search) params.filter['q'] = { contains: filters.search };

      if (filters?.status !== 'default') {
        params.filter.active = (filters?.status === 'enabled');
      }

      if (filters?.siteTypesIds && filters?.siteTypesIds.length) {
        const siteTypes = filters.siteTypesIds.filter(type => type !== 'default');
        params.filter['site_type_id'] = `${siteTypes}`;
      }
    }

    const result = await this.siteClient.findForTable(table, params);
    return result;
  }
}
