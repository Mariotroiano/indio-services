import { AxiosInstance } from 'axios';
import { BaseService } from '../client/RestClient';
import { ClientPayload } from 'services/payloads/ClientPayload';
import { UniversalSiteTypesPayload } from 'services/payloads/UniversalSiteTypesPayload';

export class ClientService extends BaseService<ClientPayload> {
  constructor(ax: AxiosInstance) {
    super(ClientPayload, ax, 'client', 'admin');
  }
};

export class UniversalTypeService extends BaseService<UniversalSiteTypesPayload> {
  constructor(ax: AxiosInstance) {
    super(UniversalSiteTypesPayload, ax, 'universal/site-types', 'admin');
  }
};

export class FontService extends BaseService<UniversalSiteTypesPayload> {
  constructor(ax: AxiosInstance) {
    super(UniversalSiteTypesPayload, ax, 'font', 'admin');
  }
};
