import { AxiosInstance } from 'axios';
import { ServiceBase } from 'services/client/ServiceBase';
import { GLAccountPayload } from 'services/payloads/GLAccountPayload';

export default class GlAccountService extends ServiceBase<GLAccountPayload> {
  constructor(ax: AxiosInstance) {
    super(GLAccountPayload, ax, 'gl_accounts');
  }

  getAll = (parkId: string) => super.getAllBy({ parkId }, undefined, undefined, 'code');
  
}
