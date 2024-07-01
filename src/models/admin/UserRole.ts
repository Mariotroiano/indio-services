import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { Park } from 'models/park';
import { Role } from 'interfaces/Role';
import { ResourceType, UserRolePayload } from 'services/payloads/UserRolePayload';
import { Factory } from 'utils/Factory';

export class UserRole {
  id: string;
  resourceId: string;
  resourceName: string;
  roleType: Role;
  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(UserRole, {
  id: { label: 'Id'},
  resourceId: { label: 'Resource Id' },
  resourceName: { label: 'Resource Name' },
  roleType: { label: 'Role Type' },
})
.build();

const buildParkRole = (park: Park, roleType: Role, id?: string): UserRole => {
  const userRole: UserRole = {
    id,
    resourceId: park.id,
    resourceName: park.name,
    roleType
  };

  return userRole;
}

const mapModel = ModelBuilder.buildMapModel<UserRole, UserRolePayload>((payload) => {
  const model = Factory.create(UserRole, {
    id: payload.id,
    resourceId: payload.resourceId,
    resourceName: payload.resourceName,
    roleType: payload.roleName,
  });
  return model;
})

const buildPayload = (userRole: UserRole, userId: string, resourceType: ResourceType): UserRolePayload => {
  return {
    id: userRole.id,
    userId,
    roleType: userRole.roleType,
    resourceId: userRole.resourceId,
    resourceType: resourceType,
  };
};

class Model {
  static fields = fields;
  static buildParkRole = buildParkRole;
  static buildPayload = buildPayload;
  static mapModel = mapModel;
};

