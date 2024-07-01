import axios, { AxiosError } from 'axios';
import { baseUrlV2 } from 'config';
import { ClientService, FontService, UniversalTypeService } from './AdminScopedServices';
import { Static, staticWrapper } from 'services/helpers';
import { SiteTypeService } from './ParkServices';
import SessionStorage from 'utils/SessionStorage';
import AuthService from 'services/AuthService';

class Services {
  static Client: ClientService;
  static Font: FontService;
  static UniversalTypeService: Static<UniversalTypeService>;
  static SiteType: Static<SiteTypeService>;

  static initialize(token: string) {
    const ax = createAxios(token);
    const parkCode = SessionStorage.getItem('lastParkCode'); // This is a workaround

    Services.Client = new ClientService(ax);
    Services.Font = new FontService(ax);
    Services.UniversalTypeService = staticWrapper(new UniversalTypeService(ax));
    Services.SiteType = staticWrapper(new SiteTypeService(ax, parkCode));
  }
};

function createAxios(token: string) {
  const ax = axios.create({
    baseURL: `${baseUrlV2}/api/v2`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  ax.interceptors.response.use(
    response => response,
    error => handleErrors(error)
  );

  return ax;
}

function handleErrors(error: AxiosError) {
  if (error.response?.status === 401) {
    AuthService.logout();    
  }
}

export const ServicesV2 = Services;
