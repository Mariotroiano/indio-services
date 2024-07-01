import { AxiosInstance } from 'axios';
import { BaseService } from '../client/RestClient';
import { GuestPayload, SitePayload, SiteTypePayload } from 'services/payloads';
import { DiscountPayload } from 'services/payloads/DiscountPayload';
import { RatePayload } from 'services/payloads/RatePayload';

export class SiteTypeService extends BaseService<SiteTypePayload> {
  constructor(ax: AxiosInstance, parkCode: string) {
    super(SiteTypePayload, ax, 'site-types', `admin/park/${parkCode}`);
  }
};

export class SiteService extends BaseService<SitePayload> {
  constructor(ax: AxiosInstance, parkCode: string) {
    super(SitePayload, ax, 'sites', `admin/park/${parkCode}`);
  }

  fieldBulkUpdate = async (ids: string[], fields: Partial<SitePayload>) => {
    const promises = ids.map(async id => {
      const payload = SitePayload.new({ id, ...fields });
      await super.createOrUpdate(payload);
    });
    await Promise.all(promises);
  }
};

export class RateService extends BaseService<RatePayload> {
  constructor(ax: AxiosInstance, parkCode: string) {
    super(RatePayload, ax, 'rates', `admin/park/${parkCode}`);
  }
  async getBySiteTypeId(siteTypeId: string, active: boolean) {
    return super.find({ siteTypeId, active });
  }
}

export class DiscountService extends BaseService<DiscountPayload> {
  constructor(ax: AxiosInstance, parkCode: string) {
    super(DiscountPayload, ax, 'discounts', `admin/park/${parkCode}`);
  }
  async getByIds(ids: string[]) {
    return super.find({ ids });
  }
}

export class GuestService extends BaseService<GuestPayload> {
  constructor(ax: AxiosInstance, parkCode: string) {
    super(GuestPayload, ax, 'guests');
  }
}
