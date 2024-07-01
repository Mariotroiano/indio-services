import { PayloadBase } from './PayloadBase';

export class GLAccountPayload extends PayloadBase {
  id: string;
  parkId: string;
  sequentialId: number;
  subType: any;
  name: string;
  description: string;
  classification: string;
  code: string;
  active: boolean;
  contra: boolean;
  metadata: any;
  ancestry: any;
  createdAt: string;
  updatedAt: string;
};
