import { AxiosInstance } from 'axios';
import { ServiceBase } from 'services/client/ServiceBase';
import { SiteMiniPayload, SitePayload } from '../payloads/SitePayload';
import { snakeCase } from 'lodash';
import dayjs from 'dayjs';
import { DateRange, DateRangeFormat } from 'interfaces/DateRange';

export default class SiteService extends ServiceBase<SitePayload> {
  constructor(ax: AxiosInstance) {
    super(SitePayload, { axios: ax, resourceName: 'sites', defaultSort: '-site_number' });
  }

  getBySiteType = async (parkId: string, siteTypeId: string) => {
    const params = {
      filter: { parkId, siteTypeId, active: true },
      fields: { sites: 'id,name'},
      sort: 'site_number',
    };
    const result = await this.client.find(params);
    return result;
  }

  getMaxSiteNumber = async (parkId: string, siteTypeId?: string) => {
    const params = {
      filter: { parkId, siteTypeId },
      sort: '-site_number',
      page: { size: 5 },
      fields: { sites: 'name,site_number,site_type_id' }
    }
    const result = await this.find(params);
    const lastNumbers = result.map(x => x.siteNumber).filter(x => x.match(/^\d+$/));
    const max = Math.max(0, ...lastNumbers.map(x => +x));
    return max;
  }

  getAllLookup = async (parkId: string, siteTypeId?: string) => {
    const fields = SiteMiniPayload.fields().map(snakeCase);
    const params = {
      filter: { parkId, siteTypeId, active: true },
      sort: 'site_number',
      page: { size: 200 },
      fields: { sites: fields.join(',') }
    };
    const result = await this.find(params);
    // const result = await super.getAllBy({ parkId, siteTypeId }, null, 200, 'site_number');
    return result;
  }

  getAvailableStays = async (parkId: string, dateRange: DateRange) => {
    const fields = SiteMiniPayload.fields().map(snakeCase);
    const availableBetween = DateRangeFormat.toPeriod(dateRange);
    const params = {
      available_between: availableBetween,
      filter: { parkId, active: true },
      extra_fields: { sites: 'availability' },
      fields: { sites: `${fields.join(',')}`},
      sort: 'site_number',
    };
    const result = await this.client.find(params);
    return result;
  }

  getDrawerInfo = async (siteId: string) => {
    const params = { include: 'utility_meters,most_recent_stay'};
    const result = await this.client.getById(siteId, params);
    return result;
  }

  getAvailabilities = async (start: dayjs.Dayjs, end: dayjs.Dayjs, siteTypeId?: string, ignoredReservationIds?: string[]) => {
    const dateRange = `${start.format('YYYY-MM-DD')}...${end.format('YYYY-MM-DD')}`;
    const filterValue = { date_range: dateRange, ignored_reservation_ids: ignoredReservationIds };
    const params = {
      filter: {
        siteTypeId,
        availableBetween: JSON.stringify(filterValue)
      },
      sort: 'site_number',
      page: { size: 200 },
    };
    const result = await this.find(params);
    return result;
  }
}
