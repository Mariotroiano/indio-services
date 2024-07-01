import axios, { AxiosError } from 'axios';
import { baseUrl } from 'config';
import { bindMethods, Static } from './helpers';
// import { ServicesV2 } from './nest/Services';
import { construct, mapProps, ServiceProps } from './Services.extra';

import AuthService from './AuthService';
import ClientService from './ClientService';
import VehicleLookupService from './prkset/VehicleLookupService';
import ReportService from './ReportService';
import SessionStorage from 'utils/SessionStorage';
import message from 'antd/lib/message';

class ServiceContainer {
  static Auth = AuthService;
  static Client: Static<ClientService>;
  static VehicleLookup: Static<VehicleLookupService>;
  static Report: Static<ReportService>;
  static isInitialized = false;

  static async initialize(token: string, hasClient?: boolean) {
    if (!token || this.isInitialized) return;
    const start = performance.now();
    const ax = createAxios(token);
    const client = new ClientService(ax);
    ServiceContainer.Client = bindMethods(client);

    if (!hasClient) return;
    //ServicesV2.initialize(token);

    const { collection } = await import('./ServiceImports');
    // Create each instance with Static type
    const instances = mapProps(collection, prop => construct(prop, ax));
    // Assign instances to ServiceContainer class
    Object.assign(ServiceContainer, instances);

    const { VehicleLookupService, ReportService } = await import('./ServiceImports');
    const vehicleLookup = new VehicleLookupService();
    vehicleLookup.initialize(ax);
    ServiceContainer.VehicleLookup = bindMethods(vehicleLookup);

    const report = new ReportService();
    report.initialize(ax);
    ServiceContainer.Report = bindMethods(report);

    const end = performance.now();
    console.log(`Services initialized in ${end - start}ms`);
    this.isInitialized = true;
  }
}

function createServices() {
  type Collection = typeof import('./ServiceImports').collection;
  type IServices = ServiceProps<Collection> & typeof ServiceContainer;
  const Services = ServiceContainer;
  return Services as IServices;
}

export const Services = createServices();

function createAxios(token: string) {
  const ax = axios.create({
    baseURL: baseUrl,
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
  const response = error?.response;
  let detail: string;
  if (response?.status === 401 || response?.status === 404) {
    SessionStorage.saveLastPath();
    AuthService.logout();
    return;
  }
  if (response?.data) {
    detail = response.data.errors[0].detail;
    message.error('An error occurred: ' + detail);
  }
  else {
    message.error(error.message);
  }

  throw Error(detail || error.message);
};
