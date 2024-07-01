import { AxiosInstance } from 'axios';
import { ClientPayload } from './payloads/ClientPayload';
import { ServiceBase } from './client/ServiceBase';
import { MiniPark } from 'interfaces/SessionEntities';
import { UserRolePayload } from './payloads/UserRolePayload';

export default class ClientService extends ServiceBase<ClientPayload> {
  private userRolesClient: ServiceBase<UserRolePayload>;
  private parkClient: ServiceBase<MiniPark>;

  constructor(ax: AxiosInstance) {
    super(ClientPayload, ax, 'clients');
    this.parkClient = new ServiceBase(MiniPark, ax, 'parks');
    this.userRolesClient = new ServiceBase(UserRolePayload, ax, 'user_roles');
  }

  getAll = async () => {
    const result = await this.find();
    return result;
  }

  getAllParks = async (clientIds: string) => {
    const params = { fields: { park: 'id,name,code,clientId' }, filter: { client_id: clientIds } };
    const result = await this.parkClient.find(params);
    return result;
  }

  getUserRolesByEmail = async (email: string) => {
    const params = { filter: { email }, include: 'resource' };
    const result = await this.userRolesClient.find(params);

    return result;
  }

  getUserClientRolesByEmail = async (email: string) => {
    const params = { filter: { email, resourceType: 'Client' }, fields: { client: 'id,name' }, include: 'client' };
    const result = await this.userRolesClient.find(params);

    return result;
  }

  getUserParkRolesByEmail = async (email: string) => {
    const params = { filter: { email, resourceType: 'Park' }, fields: { park: 'id,name,code,clientId' }, include: 'resource' };
    const result = await this.userRolesClient.find(params);
    return result;
  }

  getUserClientsByEmail = async (email: string) => {
    const roles = await this.getUserRolesByEmail(email);
    const result = roles.map(x => x.resource);

    return result;
  }

  getUserParksByEmail = async (email: string) => {
    const roles = await this.getUserParkRolesByEmail(email);
    const result = roles.map(x => x.resource);

    return result;
  }

  createOrUpdateRole = async (userRole: UserRolePayload) => {
    const result = await this.userRolesClient.createOrUpdate(userRole);
    return result;
  }

  deleteRole = async (id: string) => {
    const result = await this.userRolesClient.delete(id);
    return result;
  }

}
