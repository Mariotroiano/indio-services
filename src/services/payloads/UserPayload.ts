import { FilePayload } from './FilePayload';
import { UserRolePayload } from './UserRolePayload';

export class UserPayload {
  id: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  userRoles: UserRolePayload[];
  avatarUrl: string;
  password: string;
  passwordConfirmation: string;
  avatarData: FilePayload;
}

type Keys = keyof UserPayload;
export const UserPayloadAttributes: Keys[] = [
  'id','email', 'firstName', 'middleName', 'lastName', 'userRoles'
];
