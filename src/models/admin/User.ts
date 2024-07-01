import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { Factory } from 'utils/Factory';
import { Role } from 'interfaces/Role';
import { UserPayload } from 'services/payloads/UserPayload';
import { UserRolePayload } from 'services/payloads/UserRolePayload';
import { FilePayload } from 'services/payloads/FilePayload';

export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  active: boolean;
  roles: string[];
  avatarUrl: string;
  role: Role;
  selectedParks: string[];
  password: string;
  passwordConfirmation: string;
  userClientRoles: UserRolePayload[];
  userParkRoles: UserRolePayload[];
  avatarData: FilePayload;

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(User, {
  firstName: { label: 'First Name' },
  lastName: { label: 'Last Name' },
  email: { label: 'Email', type: 'email' },
  phone: { label: 'Phone', type: 'tel' },
  active: { label: 'Active', type: 'switch' },
  avatarUrl: { label: '', type: 'image' },
  role: { label: 'Role' },
  selectedParks: { label: '', placeholder: 'Assign Park', type: 'multiple'},
  password: { label: 'Password', type: 'text'},
  passwordConfirmation: { label: 'Confirm Password', type: 'text'},
  userClientRoles: { label: 'Client Roles'},
  userParkRoles: { label: 'Park Roles'},
  avatarData: { label: 'AvatarData'}
})
.setRules({
  firstName: [{ required: true }],
  lastName: [{ required: true }],
  email: [{ type: 'email' }],
  phone: [{ max: 25, message: 'Phone number should not exceed 25 characters' }],
})
.build()

const mapModel = ModelBuilder.buildMapModel<User, UserPayload>((user) => {
  const { avatarData, userRoles, password, passwordConfirmation, ...props } = user;
  const userClientRoles = userRoles?.filter(role => role.resourceType === 'Client');
  const userParkRoles = userRoles?.filter(role => role.resourceType === 'Park');

  const model = Factory.create(User, {
    ...props,
    userClientRoles,
    userParkRoles
  });
  return model;
});

const buildPayload = (values: User): UserPayload => {
  const { id, firstName, lastName, phone, active, email, password, passwordConfirmation, avatarData } = values;
  const payload: Partial<UserPayload> = {
    id,
    firstName,
    lastName,
    active,
    email,
    password,
    passwordConfirmation,
    // phone,
    avatarData
  }

  return payload as UserPayload;
};


export const roleOps = [
  {label: 'Park Admin', value: 'admin'},
  {label: 'Park Staff', value: 'staff'},
  {label: 'Park Viewer', value: 'viewer'},
]

class Model {
  static fields = fields;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
};
