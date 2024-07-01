import { Role } from "interfaces/Role";
import { PayloadBase } from "./PayloadBase";

export type ResourceType = 'Client' | 'Park'

export class UserRolePayload extends PayloadBase {
  id: string;
  userId: string;
  roleType?: Role;
  resourceType: ResourceType;
  resourceId: string;

  userName?: string;
  roleId?: string;
  roleName?: Role;
  resourceName?: string;
  resource?: any;
}


export class UserClientRolePayload extends UserRolePayload {
  clientId: string;
  clientName: string;
}

export class UserParkRolePayload extends UserRolePayload {
  parkId: string;
  parkName: string;
}
