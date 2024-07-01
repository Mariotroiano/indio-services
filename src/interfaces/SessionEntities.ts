import { Factory } from 'utils/Factory';
import { Client } from 'models/admin/Client';
import { Park } from 'models'
import { AuthPayload } from 'services/AuthService';

export class MiniClient {
  public id: string;
  public name: string;

  static new(order: Partial<Client>) {
    return Factory.create(this, order, true);
  }
}

export class MiniPark {
  public id: string;
  public name: string;
  public code: string;
  public clientId: string;

  static new(park: Partial<Park>) {
    return Factory.create(this, park, true);
  }
}

export class MiniUser {
  public id: string;
  public email: string;
  public token: string;

  static new(auth: AuthPayload) {
    return Factory.create(this, auth, true);
  }

  static toJSON(order: MiniUser) {
    const { id, email } = order;
    return JSON.stringify({ id, email });
  }
}
